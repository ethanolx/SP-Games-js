import query from '../utils/query.js';
import '../utils/callback.js';

/**
 * @typedef {Object} Category
 * @property {string} catname
 * @property {string} description
 */

export default {
    /**
     * @param {Category} category
     * @param {Callback} callback
     */
    insert: (category, callback) => {
        const CREATE_NEW_CATEGORY_SQL = 'INSERT INTO categories (catname, description) VALUES (?, ?);';
        const { catname, description } = category;
        query(CREATE_NEW_CATEGORY_SQL, callback, [catname, description]);
    },

    /**
     * @param {Category} category
     * @param {number} catid
     * @param {Callback} callback
     */
    update: (category, catid, callback) => {
        const UPDATE_EXISTING_CATEGORY_SQL = 'UPDATE categories SET ? WHERE id = ?;';
        query(UPDATE_EXISTING_CATEGORY_SQL, callback, [category, catid]);
    }
}