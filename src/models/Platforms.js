// Imports
import query from '../utils/query.js';

/**
 * Object representing a gaming platform
 * @typedef {Object} Platform
 * @property {string} platform          - Generic platform (i.e. Xbox, PC, Mobile)
 * @property {string | null} version    - More specific platform type (i.e. Xbox One, Mobile iOS)
 */

export default {
    /**
     * Find the id(s) of the selected platform(s)
     * @param {Platform} platform
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findIds: (platform, callback) => {
        const GET_PLATFORM_ID_SQL = 'SELECT id FROM platforms WHERE platform = ? AND (ISNULL(?) OR version = ?);';
        query(GET_PLATFORM_ID_SQL, callback, [platform.platform, platform.version, platform.version]);
    },

    /**
     * Find the platforms supported for a selected game
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByGame: (gameid, callback) => {
        const GET_ALL_PLATFORMS_BY_GAME = 'SELECT platforms.id AS pid, platform, version FROM game_platform_asc INNER JOIN platforms ON game_platform_asc.platformid = platforms.id WHERE game_platform_asc.gameid = ?;';
        query(GET_ALL_PLATFORMS_BY_GAME, callback, gameid);
    },
};