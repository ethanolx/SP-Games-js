import query from '../utils/query.js';
import Categories from './Categories.js';
import { emptyCallback, simpleCallbackErrorHandler } from '../utils/callbacks.js';
import { promisify } from 'util';
import { logError } from '../utils/log.js';
import Platforms from './Platforms.js';
import G_P from './associative/G_P.js';
import G_C from './associative/G_C.js';

/**
 * @typedef {Object} Game
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {number[]} platformids
 * @property {number[]} catids
 * @property {number} year
 */

const Games = {
    /**
     * @param {number} platformid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByPlatformId: (platformid, callback) => {
        const GET_ALL_GAMES_BY_PLATFORM_SQL = 'SELECT gameid FROM game_platform_asc WHERE platformid = ?;';
        query(GET_ALL_GAMES_BY_PLATFORM_SQL, emptyCallback, platformid, (err, gameids) => {
            if (err) {
                logError(err);
                return callback(err, null);
            }
            else {
                //@ts-ignore
                if (gameids.length === 0) {
                    return callback(null, null);
                }
                else {
                    (async () => {
                        // @ts-ignore
                        const GAMES = await promisify(Games.findByGameIds)(gameids.map(wrapper => wrapper.gameid)).catch(console.log);
                        let g = [];
                        // @ts-ignore
                        for (let game of GAMES) {
                            const CATEGORIES = await promisify(Categories.findByGame)(game.gameid).catch(console.log);
                            g.push({ ...game, categories: CATEGORIES });
                        }
                        return g;
                        // @ts-ignore
                    })().catch(console.log).then(g => callback(null, g));
                }
            }
        });
    },

    /**
     * @param {string} platform
     * @param {string} version
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByPlatform: (platform, version, callback) => {
        Platforms.findId({ generic_type: platform, version: version }, (err, wrapper) => {
            //@ts-ignore
            Games.findByPlatformId(wrapper[0]['id'], callback);
        });
    },

    /**
     * @param {number[]} gameids
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByGameIds: (gameids, callback) => {
        const GET_ALL_GAMES_SQL = 'SELECT id AS gameid, title, description, price, year, created_at FROM games WHERE games.id IN (?);';
        query(GET_ALL_GAMES_SQL, callback, [gameids]);
    },

    /**
     * @param {Game} game
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insert: (game, callback) => {
        const CREATE_NEW_GAME_SQL = 'INSERT INTO games (title, description, price, year) VALUES (?);';
        const { title, description, price, year } = game;
        query(CREATE_NEW_GAME_SQL, emptyCallback, [[title, description, price, year]], (err, result) => {
            if (err) {
                logError(err);
                return callback(err, null);
            }
            else {
                //@ts-ignore
                const GAME_ID = result.insertId;
                Games.insertGameCategories(GAME_ID, game.catids);
                Games.insertGamePlatforms(GAME_ID, game.platformids);
                // @ts-ignore
                return callback(null, { gameid: GAME_ID });
            }
        });
    },

    /**
     * @param {number} gameid
     * @param {number[]} platformids
     */
    insertGamePlatforms: (gameid, platformids) => {
        const INSERT_GAME_PLATFORM_SQL = 'INSERT INTO game_platform_asc (gameid, platformid) VALUES ?;';
        query(INSERT_GAME_PLATFORM_SQL, emptyCallback, [platformids.map(pid => [gameid, pid])], (err, _) => {
            if (err) {
                console.log(err);
                logError(err);
            }
            else {
                G_P.removeDuplicateRows();
            }
            return;
        });
    },

    /**
     * @param {number} gameid
     * @param {number[]} catids
     */
    insertGameCategories: (gameid, catids) => {
        const INSERT_GAME_CATEGORY_SQL = 'INSERT INTO game_category_asc (gameid, catid) VALUES ?;';
        query(INSERT_GAME_CATEGORY_SQL, emptyCallback, [catids.map(cid => [gameid, cid])], (err, _) => {
            if (err) {
                console.log(err);
                logError(err);
            }
            else {
                G_C.removeDuplicateRows();
            }
            return;
        });
    },

    /**
     * @param {number} gameid
     * @param {number[]} platformids
     */
    updateGamePlatforms: (gameid, platformids) => {
        Games.deleteGamePlatforms(gameid);
        Games.insertGamePlatforms(gameid, platformids);
    },

    /**
     * @param {number} gameid
     * @param {number[]} catids
     */
    updateGameCategories: (gameid, catids) => {
        Games.deleteGameCategories(gameid);
        Games.insertGameCategories(gameid, catids);
    },

    /**
     * @param {number} gameid
     */
    deleteGameCategories: (gameid) => {
        const DELETE_GAME_CATEGORIES_SQL = 'DELETE FROM game_category_asc WHERE gameid = ?;';
        query(DELETE_GAME_CATEGORIES_SQL, simpleCallbackErrorHandler, gameid);
        return gameid;
    },

    /**
     * @param {number} gameid
     */
    deleteGamePlatforms: (gameid) => {
        const DELETE_GAME_PLATFORMS_SQL = 'DELETE FROM game_platform_asc WHERE gameid = ?;';
        query(DELETE_GAME_PLATFORMS_SQL, simpleCallbackErrorHandler, gameid);
        return gameid;
    },

    /**
     * @param {Game} game
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    update: (game, gameid, callback) => {
        const UPDATE_EXISTING_GAME_SQL = 'UPDATE games SET ? WHERE id = ?;';
        const { platformids, catids, ...REST } = game;
        query(UPDATE_EXISTING_GAME_SQL, callback, [REST, gameid]);
        Games.updateGameCategories(gameid, catids);
        Games.updateGamePlatforms(gameid, platformids);
    },

    /**
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    delete: (gameid, callback) => {
        const DELETE_GAME_SQL = 'DELETE FROM games WHERE id = ?;';
        query(DELETE_GAME_SQL, callback, gameid);
    }
};

export default Games;