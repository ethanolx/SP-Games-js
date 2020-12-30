// Imports
import query from '../utils/query.js';

/**
 * Object representing a category
 * @typedef {Object} Category
 * @property {string} catname       - Title of the category (i.e. Action)
 * @property {string} description   - Short summary of the category
 */

export default {
    /**
     * Find the categories of a selected game
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByGame: (gameid, callback) => {
        const GET_ALL_CATEGORIES_BY_GAME_ID = 'SELECT categories.id AS catid, catname FROM game_category_asc INNER JOIN categories ON game_category_asc.categoryid = categories.id WHERE game_category_asc.gameid = ?;';
        query(GET_ALL_CATEGORIES_BY_GAME_ID, callback, gameid);
    },

    /**
     * Create a new category
     * @param {Category} category
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insert: (category, callback) => {
        const CREATE_NEW_CATEGORY_SQL = 'INSERT INTO categories (catname, description) VALUES (?);';
        const { catname, description } = category;
        query(CREATE_NEW_CATEGORY_SQL, callback, [[catname, description]]);
    },

    /**
     * Edit an existing category
     * @param {Category} category
     * @param {number} catid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    update: (category, catid, callback) => {
        const UPDATE_EXISTING_CATEGORY_SQL = 'UPDATE categories SET ? WHERE id = ?;';
        query(UPDATE_EXISTING_CATEGORY_SQL, callback, [category, catid]);
    }
};