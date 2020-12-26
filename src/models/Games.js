import query from '../utils/query.js';
import Categories from './Categories.js';
import { emptyCallback } from '../utils/callbacks.js';
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
        Platforms.findId({ platform: platform, version: version }, (err, wrapper) => {
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
                Games.insertGamePlatforms(GAME_ID, game.platformids, (er, _) => {
                    if (er) {
                        Games.delete(GAME_ID, emptyCallback);
                        return callback(er, null);
                    }
                    else {
                        Games.insertGameCategories(GAME_ID, game.categoryids, (e, __) => {
                            if (e) {
                                Games.delete(GAME_ID, emptyCallback);
                                return callback(e, null);
                            }
                            else {
                                return callback(null, result);
                            }
                        });
                    }
                });
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
                return callback(err, null);
            }
            else {
                Games.updateGamePlatforms(gameid, platformids, (er, _) => {
                    if (er) {
                        return callback(er, null);
                    }
                    else {
                        Games.updateGameCategories(gameid, categoryids, (e, __) => {
                            if (e) {
                                return callback(e, null);
                            }
                            else {
                                return callback(null, result);
                            }
                        });
                    }
                });
            }
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
        query(GET_ALL_GAMES_SQL, emptyCallback, [gameids], (err, result) => {
            if (err) {
                logError(err);
                return callback(err, null);
            }
            else {
                //@ts-ignore
                return callback(null, result.map(game => {
                    const { price, ...rest } = game;
                    return {
                        price: parseFloat(price),
                        ...rest
                    };
                }));
            }
        });
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
                                const PLATFORMS = await promisify(Platforms.findByGame)(game.gameid).catch(logError);
                                g.push({ ...game, categories: CATEGORIES, platforms: PLATFORMS });
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
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insertGameCategories: (gameid, catids, callback) => {
        const INSERT_GAME_CATEGORY_SQL = 'INSERT INTO game_category_asc (gameid, categoryid) VALUES ?;';
        query(INSERT_GAME_CATEGORY_SQL, emptyCallback, [catids.map(cid => [gameid, cid])], (err, result) => {
            if (err) {
                logError(err);
                return callback(err, null);
            }
            else {
                G_C.removeDuplicateRows();
                return callback(null, result);
            }
        });
    },

    /**
     * @param {number} gameid
     * @param {number[]} platformids
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insertGamePlatforms: (gameid, platformids, callback) => {
        const INSERT_GAME_PLATFORM_SQL = 'INSERT INTO game_platform_asc (gameid, platformid) VALUES ?;';
        query(INSERT_GAME_PLATFORM_SQL, emptyCallback, [platformids.map(pid => [gameid, pid])], (err, result) => {
            if (err) {
                logError(err);
                return callback(err, null);
            }
            else {
                G_P.removeDuplicateRows();
                return callback(null, result);
            }
        });
    },

    /**
     * @param {number} gameid
     * @param {number[]} catids
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    updateGameCategories: (gameid, catids, callback) => {
        Games.deleteGameCategories(gameid, (err, _) => {
            if (err) {
                return callback(err, null);
            }
            else {
                Games.insertGameCategories(gameid, catids, (er, __) => {
                    if (er) {
                        return callback(er, null);
                    }
                    else {
                        return callback(null, null);
                    }
                });
            }
        });
    },

    /**
     * @param {number} gameid
     * @param {number[]} platformids
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    updateGamePlatforms: (gameid, platformids, callback) => {
        Games.deleteGamePlatforms(gameid, (err, _) => {
            if (err) {
                return callback(err, null);
            }
            else {
                Games.insertGamePlatforms(gameid, platformids, (er, __) => {
                    if (er) {
                        return callback(err, null);
                    }
                    else {
                        return callback(null, null);
                    }
                });
            }
        });
    }
};

export default Games;