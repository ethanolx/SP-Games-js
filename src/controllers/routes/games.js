// Dependencies
import express, { json, urlencoded } from 'express';
import fetch from 'node-fetch';
import multer from 'multer';
import { extname } from 'path';
import { findImagesOfGame, removeImages } from '../../utils/imageMgmtUtils.js';
import { logError } from '../../utils/log.js';

// Model
import Games from '../../models/Games.js';

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

router.route('/game/:gid/image')
    .get((req, res) => {
        (async () => {
            const FILE = (await findImagesOfGame(parseInt(req.params.gid)))[0];
            res.sendFile(FILE, { root: './assets/game-images' }, (err) => { if (err) logError(err); });
        })();
    })
    .post(IMAGE_STORAGE.single('gameImage'))
    .post((req, res) => {
        removeImages(parseInt(req.params.gid));
        res.sendStatus(204);
    });

router.route('/game/:gid/image/info')
    .get((req, res) => {
        const GAMEID = req.params.gid;
        (async () => {
            fetch(`http://localhost:3000/game/${ GAMEID }/image`, { method: 'GET' }).then(r => r.headers).then(headers => `
            <h1>Game ${ GAMEID }</h1>
            <img src=\"http://localhost:3000/game/${ GAMEID }/image\" width=100vw/>
            <table>
                <tr>
                    <th>File Name</th>
                    <td>h</td>
                </tr>
                <tr>
                    <th>Hello</th>
                    <td>Noe</td>
                </tr>
            </table>
        `).then(res.status(200).type('html').send).catch(console.log);
        })();
    });

export default router;