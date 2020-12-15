import query from '../utils/query.js';
import '../utils/callback.js';

/**
 * @typedef {Object} Game
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} platforms
 * @property {number} categoryid
 * @property {number} year
 */

export default {
    /**
     * @param {string} platform
     * @param {Callback} callback
     */
    findByPlatform: (platform, callback) => {
        const GET_ALL_GAMES_BY_PLATFORM_SQL = 'SELECT games.id as gameid, title, games.description as description, price, platforms, games.categoryid as catid, categories.catname as catname, year, games.created_at as created_at FROM games INNER JOIN categories ON games.categoryid = categories.id WHERE FIND_IN_SET(?, platforms) > 0;';
        query(GET_ALL_GAMES_BY_PLATFORM_SQL, callback, platform);
    },

    /**
     * @param {Game} game
     * @param {Callback} callback
     */
    insert: (game, callback) => {
        const CREATE_NEW_GAME_SQL = 'INSERT INTO games (title, description, price, platforms, categoryid, year) VALUES (?, ?, ?, ?, ?, ?);';
        const { title, description, price, platforms, categoryid, year } = game;
        query(CREATE_NEW_GAME_SQL, callback, [title, description, price, platforms, categoryid, year]);
    },

    /**
     * @param {Game} game
     * @param {number} gameid
     * @param {Callback} callback
     */
    update: (game, gameid, callback) => {
        const UPDATE_EXISTING_GAME_SQL = 'UPDATE games SET ? WHERE id = ?;';
        query(UPDATE_EXISTING_GAME_SQL, callback, [game, gameid]);
    },

    /**
     * @param {number} gameid
     * @param {Callback} callback
     */
    delete: (gameid, callback) => {
        const DELETE_GAME_SQL = 'DELETE FROM games WHERE id = ?;';
        query(DELETE_GAME_SQL, callback, gameid);
    }
}