import query from '../utils/query.js';
import Categories from './Categories.js';
import { emptyCallback, throwErr } from '../utils/callbacks.js';
import { promisify } from 'util';
import { logError } from '../utils/logs.js';
import Platforms from './Platforms.js';
import G_P from './associative/G_P.js';
import G_C from './associative/G_C.js';

/**
 * @typedef {Object} Game
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {number[]} platformids
 * @property {number[]} categoryids
 * @property {number} year
 */

const Games = {
    /**
     * @param {string} platform
     * @param {string} version
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByPlatform: (platform, version, callback) => {
        Platforms.findId({ generic_type: platform, version: version }, (err, wrapper) => {
            Games.findByPlatformId(wrapper[0]['id'], callback);
        });
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
                Games.insertGameCategories(GAME_ID, game.categoryids);
                Games.insertGamePlatforms(GAME_ID, game.platformids);
                return callback(null, result);
            }
        });
    },

    /**
     * @param {Game} game
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    update: (game, gameid, callback) => {
        const UPDATE_EXISTING_GAME_SQL = 'UPDATE games SET ? WHERE id = ?;';
        const { platformids, categoryids, ...REST } = game;
        query(UPDATE_EXISTING_GAME_SQL, emptyCallback, [REST, gameid], (err, result) => {
            if (err) {
                logError(err);
                callback(err, null);
            }
            else {
                callback(null, result);
            }
            Games.updateGameCategories(gameid, categoryids);
            Games.updateGamePlatforms(gameid, platformids);
        });
    },

    /**
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    delete: (gameid, callback) => {
        const DELETE_GAME_SQL = 'DELETE FROM games WHERE id = ?;';
        query(DELETE_GAME_SQL, callback, gameid);
    },

    /**
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    deleteGameCategories: (gameid, callback) => {
        const DELETE_GAME_CATEGORIES_SQL = 'DELETE FROM game_category_asc WHERE gameid = ?;';
        query(DELETE_GAME_CATEGORIES_SQL, callback, gameid);
    },

    /**
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    deleteGamePlatforms: (gameid, callback) => {
        const DELETE_GAME_PLATFORMS_SQL = 'DELETE FROM game_platform_asc WHERE gameid = ?;';
        query(DELETE_GAME_PLATFORMS_SQL, callback, gameid);
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
                if (gameids instanceof Array) {
                    if (gameids.length === 0) {
                        return callback(null, null);
                    }
                    else {
                        (async () => {
                            const GAMES = await promisify(Games.findByGameIds)(gameids.map(wrapper => wrapper.gameid)).catch(logError);
                            let g = [];
                            // @ts-ignore
                            for (let game of GAMES) {
                                const CATEGORIES = await promisify(Categories.findByGame)(game.gameid).catch(logError);
                                g.push({ ...game, categories: CATEGORIES });
                            }
                            return g;
                        })().then(g => callback(null, g)).catch(logError);
                    }
                }
            }
        });
    },

    /**
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findOne: (gameid, callback) => {
        const GET_ONE_GAME_SQL = 'SELECT * FROM games WHERE id = ?;';
        query(GET_ONE_GAME_SQL, callback, gameid);
    },

    /**
     * @param {number} gameid
     * @param {number[]} catids
     */
    insertGameCategories: (gameid, catids) => {
        const INSERT_GAME_CATEGORY_SQL = 'INSERT INTO game_category_asc (gameid, catid) VALUES ?;';
        query(INSERT_GAME_CATEGORY_SQL, emptyCallback, [catids.map(cid => [gameid, cid])], (err, result) => {
            if (err) {
                logError(err);
            }
            else {
                G_C.removeDuplicateRows();
            }
        });
    },

    /**
     * @param {number} gameid
     * @param {number[]} platformids
     */
    insertGamePlatforms: (gameid, platformids) => {
        const INSERT_GAME_PLATFORM_SQL = 'INSERT INTO game_platform_asc (gameid, platformid) VALUES ?;';
        query(INSERT_GAME_PLATFORM_SQL, emptyCallback, [platformids.map(pid => [gameid, pid])], (err, result) => {
            if (err) {
                logError(err);
            }
            else {
                G_P.removeDuplicateRows();
            }
        });
    },

    /**
     * @param {number} gameid
     * @param {number[]} catids
     */
    updateGameCategories: (gameid, catids) => {
        promisify(Games.deleteGameCategories)(gameid).catch(logError);
        promisify(Games.insertGameCategories)(gameid, catids).catch(logError);
    },

    /**
     * @param {number} gameid
     * @param {number[]} platformids
     */
    updateGamePlatforms: (gameid, platformids) => {
        promisify(Games.deleteGamePlatforms)(gameid).catch(logError);
        promisify(Games.insertGamePlatforms)(gameid, platformids).catch(logError);
    }
};

export default Games;