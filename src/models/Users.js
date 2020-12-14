import query from '../utils/query.js';
import '../utils/callback.js';
import '../utils/usertype.js';

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} email
 * @property {UserType} type
 * @property {string} [profile_pic_url]
 */

export default {

    /**
     * @param {Callback} callback
     */
    findAll: (callback) => {
        const GET_ALL_USERS_SQL = 'SELECT * FROM users;';
        query(GET_ALL_USERS_SQL, callback);
    },

    /**
     * @param {number} userID
     * @param {Callback} callback
     */
    findOne: (userID, callback) => {
        const GET_ONE_USER_BY_ID_SQL = 'SELECT * FROM users WHERE userid = ?;';
        query(GET_ONE_USER_BY_ID_SQL, callback, userID);
    },

    /**
     * @param {User} user
     * @param {Callback} callback
     */
    insert: (user, callback) => {
        const CREATE_NEW_USER_SQL = 'INSERT INTO users (username, email, type, profile_pic_url) VALUES (?, ?, ?, ?);';
        const {username, email, type, profile_pic_url} = user;
        query(CREATE_NEW_USER_SQL, callback, [username, email, type, profile_pic_url]);
    }
}