// Dependencies
import express, { json, urlencoded } from 'express';
import fetch from 'node-fetch';
import multer from 'multer';
import { extname } from 'path';
import { promisify } from 'util';
import { readFile } from 'fs';
import { findImagesOfGame, removePrevImage } from '../../utils/imageMgmtUtils.js';
import { logError } from '../../utils/logs.js';

// Model
import Games from '../../models/Games.js';

// Configurations
import { HOST, PORT } from '../../config/server.js';

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
        Games.insert(GAME, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json(result);
            }
        });
    });

router.route('/games/:platform')
    .get((req, res) => {
        const { platform } = req.params;
        const { version } = req.query;
        //@ts-ignore
        Games.findByPlatform(platform, version, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

router.route('/game/:id')
    .put((req, res) => {
        /**@type {import('../../models/Games.js').Game} */
        const GAME = req.body;
        const { id } = req.params;
        const gameid = parseInt(id);
        if (isNaN(gameid)) {
            res.sendStatus(400);
            return;
        }
        Games.update(GAME, gameid, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({ 'Affected Rows': result.affectedRows });
            }
        });
    })
    .delete((req, res) => {
        const { id } = req.params;
        const gameid = parseInt(id);
        if (isNaN(gameid)) {
            res.sendStatus(400);
            return;
        }
        Games.delete(gameid, (err, result) => {
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
    }), limits: { fileSize: 1000000 },
    fileFilter: (req, file, fn) => {
        fn(null, ['.jpg', '.png', '.jpeg', '.gif'].includes(extname(file.originalname)));
    }
});

// Image Uploads
router.route('/game/:gid/image')
    .get((req, res) => {
        (async () => {
            const FILES = (await findImagesOfGame(parseInt(req.params.gid)).catch(_ => { }));
            if (FILES) {
                res.status(200).sendFile(FILES[0], { root: './assets/game-images' }, (err) => { if (err) logError(err); });
            }
            else {
                res.sendStatus(404);
            }
        })();
    })
    .post((req, res, next) => {
        (async () => {
            const { gid } = req.params;
            const GAME_ID = parseInt(gid);
            if (isNaN(GAME_ID)) {
                res.status(400).json({ message: 'Invalid game id' });
                return;
            }
            const FILES = (await findImagesOfGame(parseInt(req.params.gid)).catch(_ => { }));
            if (FILES) {
                removePrevImage(GAME_ID);
            }
            next();
        })();
    })
    .post(IMAGE_STORAGE.single('gameImage'))
    .post((req, res) => {
        res.sendStatus(204);
    });

router.route('/game/:gid/image/info')
    .get((req, res) => {
        const GAMEID = req.params.gid;
        fetch(`http://${ HOST }:${ PORT }/game/${ GAMEID }/image`, { method: 'GET' })
            .then(resp => {
                switch (resp.status) {
                    case 200:
                        resp.blob().then(async IMAGE_FILE => {
                            const TEMPLATE_OR_VOID = (await promisify(readFile)('./assets/game-image-info.html').catch(logError));
                            const TEMPLATE = (TEMPLATE_OR_VOID ? TEMPLATE_OR_VOID.toString()
                                .replace(/\$gid\$/g, GAMEID)
                                .replace(/\$size\$/, IMAGE_FILE.size.toString())
                                .replace(/\$type\$/, IMAGE_FILE.type) : '');
                            res.status(200).type('html').send(TEMPLATE);
                            return;
                        }).catch(logError);
                    case 404:
                        res.status(404).type('html').send(
                            `<h1 color="red">Image for game with id ${ GAMEID } does not exist</h1>`
                        );
                        return;
                    case 400:
                        res.status(400).type('html').send(
                            `<h1 color="red">${ GAMEID } is not a valid game id</h1>`
                        );
                    default:
                        res.status(204).type('html').send(
                            `<h1>Nothing to send</h1>`
                        );
                }
            })
            .catch(logError);
    });

export default router;