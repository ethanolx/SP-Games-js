// Dependencies
import express, { json, urlencoded } from 'express';
import fetch from 'node-fetch';
import multer from 'multer';
import { extname } from 'path';
import { promisify } from 'util';
import { readFile } from 'fs';

// Utilities
import { findImagesOfGame, removePrevImage } from '../../utils/imageMgmtUtils.js';
import { logError } from '../../utils/logs.js';
import { invalidBody, invalidId } from '../../utils/common-errors.js';

// Model
import Games from '../../models/Games.js';

// Configurations
import { HOST, PORT, MAX_FILE_SIZE, MEDIA_TYPES_SUPPORTED } from '../../config/server.js';

/**@type {express.Router} */
const router = express.Router();

// Parsing Middleware
router.use(json());
router.use(urlencoded({ extended: false }));

// Route Handlers
router.route('/game')
    .post((req, res) => {
        /** @type {import('../../models/Games.js').Game} */
        const GAME = req.body;
        if (invalidBody(GAME, {
            title: 'string',
            description: 'string',
            price: 'number',
            year: 'number?',
            platformids: 'object',
            categoryids: 'object'
        }, res)) {
            return;
        }
        Games.insert(GAME, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({ gameid: result.insertId });
            }
        });
    });

router.route('/games/:platform')
    .get((req, res) => {
        const { platform } = req.params;
        const { version } = req.query;
        //@ts-ignore
        Games.findByPlatform(platform, version, (err, results) => {
            if (err) {
                res.sendStatus(500);
            }
            else if (results === null) {
                res.sendStatus(404);
            }
            else {
                res.status(200).json(results);
            }
        });
    });

router.route('/game/:id')
    .all((req, res, next) => {
        if (invalidId(req.params.id, res)) {
            return;
        }
        next();
    })
    .put((req, res) => {
        /**@type {import('../../models/Games.js').Game} */
        const GAME = req.body;
        const GAME_ID = parseInt(req.params.id);
        if (invalidBody(GAME, {
            title: 'string',
            description: 'string',
            price: 'number',
            year: 'number?',
            platformids: 'object',
            categoryids: 'object'
        }, res)) {
            return;
        }
        Games.update(GAME, GAME_ID, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        });
    })
    .delete((req, res) => {
        const GAME_ID = parseInt(req.params.id);
        Games.delete(GAME_ID, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        });
    });

// Multipart Handling Middleware
const IMAGE_STORAGE = multer({
    storage: multer.diskStorage({
        destination: (req, file, fn) => {
            fn(null, './assets/game-images');
        },
        filename: (req, file, fn) => {
            fn(null, `${ req.params.gid }${ extname(file.originalname) }`);
        }
    }), limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, fn) => {
        fn(null, MEDIA_TYPES_SUPPORTED.includes(extname(file.originalname)));
    }
});

// Image Uploads
router.route('/game/:gid/image')
    .all((req, res, next) => {
        if (invalidId(req.params.gid, res)) {
            return;
        }
        next();
    })
    .get((req, res) => {
        (async () => {
            const GAME_ID = parseInt(req.params.gid);
            const FILES = await findImagesOfGame(GAME_ID).catch(logError);
            const GAMES = await promisify(Games.findOne)(GAME_ID).catch(logError);
            if (GAMES instanceof Array && GAMES.length === 0) {
                res.status(422).json({ message: 'Game does not exist' });
            }
            else if (FILES) {
                res.status(200).sendFile(FILES[0], { root: './assets/game-images' }, (err) => { if (err) logError(err); });
            }
            else {
                res.sendStatus(404);
            }
            return;
        })();
    })
    .post((req, res, next) => {
        (async () => {
            const GAME_ID = parseInt(req.params.gid);
            Games.findOne(GAME_ID, (err, result) => {
                if (err) {
                    res.sendStatus(500);
                }
                else if (result instanceof Array && result.length === 0) {
                    res.status(422).json({ message: 'Game does not exist' });
                }
                else {
                    (async () => {
                        const FILES = await findImagesOfGame(parseInt(req.params.gid)).catch(logError);
                        if (FILES) {
                            await removePrevImage(GAME_ID).catch(logError);
                        }
                        next();
                        return;
                    })();
                }
            });
        })();
    })
    .post(IMAGE_STORAGE.single('gameImage'))
    .post((req, res) => {
        if (!req.file) {
            res.status(415).json({ media_types_supported: MEDIA_TYPES_SUPPORTED, max_file_size_bytes: MAX_FILE_SIZE });
        }
        else {
            res.sendStatus(204);
        }
    });

router.route('/game/:gid/image/info')
    .get((req, res) => {
        const GAMEID = req.params.gid;
        if (invalidId(req.params.gid, res)) {
            return;
        }
        fetch(`http://${ HOST }:${ PORT }/game/${ GAMEID }/image`, { method: 'GET' })
            .then(resp => {
                switch (resp.status) {
                    case 200:
                        resp.blob().then(async IMAGE_FILE => {
                            const TEMPLATE_OR_VOID = (await promisify(readFile)('./assets/game-image-info.html').catch(logError));
                            const TEMPLATE = (TEMPLATE_OR_VOID ? TEMPLATE_OR_VOID.toString()
                                .replace(/\$host\$/, HOST)
                                .replace(/\$port\$/, PORT.toString())
                                .replace(/\$gid\$/g, GAMEID)
                                .replace(/\$size\$/, IMAGE_FILE.size.toString())
                                .replace(/\$type\$/, IMAGE_FILE.type) : '');
                            res.status(200).type('html').send(TEMPLATE);
                            return;
                        }).catch(logError);
                        return;
                    case 422:
                        res.status(422).json({ message: `Game with id ${ GAMEID } does not exist` });
                        return;
                    case 404:
                        res.status(404).json({ message: `Image for game with id ${ GAMEID } does not exist` });
                        return;
                    case 400:
                        res.status(400).json({ message: `${ GAMEID } is not a valid game id` });
                        return;
                    default:
                        res.sendStatus(204);
                }
            })
            .catch(logError);
    });

export default router;