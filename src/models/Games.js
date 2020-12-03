import query from '../utils/query.js';
import '../utils/callback.js';

/**
 * @typedef {Object} Game
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} platform
 * @property {number} categoryid
 * @property {Date} year
 */

export default {
    /**
     * @param {string} platform
     * @param {Callback} callback
     */
    findByPlatform: (platform, callback) => {
        const GET_ALL_GAMES_BY_PLATFORM_SQL = 'SELECT * FROM games WHERE platform = ?;';
        query(GET_ALL_GAMES_BY_PLATFORM_SQL, callback, platform);
    },

    /**
     * @param {Game} game
     * @param {Callback} callback
     */
    insert: (game, callback) => {
        const CREATE_NEW_GAME_SQL = 'INSERT INTO games (title, description, price, platform, categoryid) VALUES (?, ?, ?, ?);';
        const { title, description, price, platform, categoryid } = game;
        query(CREATE_NEW_GAME_SQL, callback, [title, description, price, platform, categoryid]);
    },

    /**
     * @param {Game} game
     * @param {number} gameid
     * @param {Callback} callback
     */
    update: (game, gameid, callback) => {
        const UPDATE_EXISTING_GAME_SQL = 'UPDATE games SET title = ?, description = ?, price = ?, platform = ?, categoryid = ? WHERE id = ?;';
        const { title, description, price, platform, categoryid } = game;
        query(UPDATE_EXISTING_GAME_SQL, callback, [title, description, price, platform, categoryid, gameid]);
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