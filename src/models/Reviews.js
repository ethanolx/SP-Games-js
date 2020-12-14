import query from '../utils/query.js';
import '../utils/callback.js';

/**
 * @typedef {Object} Review
 * @property {string} content
 * @property {number} rating
 */

export default {
    /**
     * @param {number} gameid
     * @param {Callback} callback
     */
    findByGame: (gameid, callback) => {
        const GET_REVIEWS_BY_GAME_SQL = 'SELECT games.id as gameid, content, rating, username, reviews.created_at FROM ((reviews INNER JOIN games ON reviews.gameid = games.id) INNER JOIN users ON reviews.userid = users.userid) WHERE gameid = ?;';
        query(GET_REVIEWS_BY_GAME_SQL, callback, gameid);
    },

    /**
     * @param {number} userid
     * @param {number} gameid
     * @param {Review} review
     * @param {Callback} callback
     */
    insert: (userid, gameid, review, callback) => {
        const CREATE_NEW_REVIEW_SQL = 'INSERT INTO reviews (userid, gameid, content, rating) VALUES (?, ?, ?, ?);';
        query(CREATE_NEW_REVIEW_SQL, callback, [userid, gameid, review.content, review.rating]);
    }
}