// Imports
import query from '../utils/query.js';

/**
 * Object representing each user
 * @typedef {Object} User
 * @property {string} username              - Username of a user
 * @property {string} email                 - User's email
 * @property {'Admin' | 'Customer'} type    - Type of a user (either Admin or Customer)
 * @property {string} [profile_pic_url]     - URL to a user's profile pic (optional)
 */

export default {

    /**
     * Find all users
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findAll: (callback) => {
        const GET_ALL_USERS_SQL = 'SELECT * FROM users;';
        query(GET_ALL_USERS_SQL, callback);
    },

    /**
     * Find one user by id
     * @param {number} userID
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findOne: (userID, callback) => {
        const GET_ONE_USER_BY_ID_SQL = 'SELECT * FROM users WHERE userid = ?;';
        query(GET_ONE_USER_BY_ID_SQL, callback, userID);
    },

    /**
     * Create a new user
     * @param {User} user
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insert: (user, callback) => {
        const CREATE_NEW_USER_SQL = 'INSERT INTO users (username, email, type, profile_pic_url) VALUES (?);';
        const { username, email, type, profile_pic_url } = user;
        query(CREATE_NEW_USER_SQL, callback, [[username, email, type, profile_pic_url]]);
    }
};