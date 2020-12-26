import query from '../utils/query.js';

/**
 * @typedef {Object} Platform
 * @property {string} platform
 * @property {string} version
 */

export default {
    /**
     * @param {Platform} platform
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findId: (platform, callback) => {
        const GET_PLATFORM_ID_SQL = 'SELECT id FROM platforms WHERE platform = ? AND (ISNULL(?) OR version = ?);';
        query(GET_PLATFORM_ID_SQL, callback, [platform.platform, platform.version, platform.version]);
    },

    /**
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByGame: (gameid, callback) => {
        const GET_ALL_PLATFORMS_BY_GAME = 'SELECT platforms.id AS pid, platform, version FROM game_platform_asc INNER JOIN platforms ON game_platform_asc.platformid = platforms.id WHERE game_platform_asc.gameid = ?;';
        query(GET_ALL_PLATFORMS_BY_GAME, callback, gameid);
    },
};