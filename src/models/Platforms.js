import query from '../utils/query.js';

/**
 * @typedef {Object} Platform
 * @property {string} generic_type
 * @property {string} version
 */

export default {
    /**
     * @param {Platform} platform
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findId: (platform, callback) => {
        const GET_PLATFORM_ID_SQL = 'SELECT id FROM platforms WHERE generic_type = ? AND (ISNULL(?) OR version = ?);';
        query(GET_PLATFORM_ID_SQL, callback, [platform.generic_type, platform.version, platform.version]);
    },

    /**
     * @param {Platform} platform
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insert: (platform, callback) => {
        const CREATE_NEW_PLATFORM_SQL = 'INSERT INTO platforms (generic_type, variant) VALUES (?, ?);';
        const { generic_type, version } = platform;
        query(CREATE_NEW_PLATFORM_SQL, callback, [generic_type, version]);
    },

    /**
     * @param {Platform} platform
     * @param {number} pltfid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    update: (platform, pltfid, callback) => {
        const UPDATE_EXISTING_PLATFORM_SQL = 'UPDATE platforms ?;';
        query(UPDATE_EXISTING_PLATFORM_SQL, callback, platform);
    }
};