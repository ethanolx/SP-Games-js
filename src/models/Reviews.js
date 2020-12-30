// Imports
import query from '../utils/query.js';
import { logError } from '../utils/logs.js';

/**
 * Object representing a user's review for a game
 * @typedef {Object} Review
 * @property {string} content   - Feedback on the game
 * @property {number} rating    - Rating of the game (out of 10)
 */

export default {
    /**
     * Find all reviews for a game
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByGame: (gameid, callback) => {
        const GET_REVIEWS_BY_GAME_SQL = 'SELECT games.id as gameid, content, rating, username, reviews.created_at FROM ((reviews INNER JOIN games ON reviews.gameid = games.id) INNER JOIN users ON reviews.userid = users.userid) WHERE gameid = ?;';
        query(GET_REVIEWS_BY_GAME_SQL, callback, gameid, (err, result) => {
            if (err) {
                logError(err);
                return callback(err, null);
            }
            else {
                //@ts-ignore
                if (result.length === 0) {
                    return callback(null, null);
                }
                else {
                    //@ts-ignore
                    const REVIEWS = result.map(review => {
                        const { rating, ...rest } = review;
                        return {
                            rating: parseFloat(rating),
                            ...rest
                        };
                    });
                    return callback(null, REVIEWS);
                }
            }
        });
    },

    /**
     * Create a new review
     * @param {number} userid
     * @param {number} gameid
     * @param {Review} review
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insert: (userid, gameid, review, callback) => {
        const { content: CONTENT, rating: RATING } = review;
        const CREATE_NEW_REVIEW_SQL = 'INSERT INTO reviews (userid, gameid, content, rating) VALUES (?);';
        query(CREATE_NEW_REVIEW_SQL, callback, [[userid, gameid, CONTENT, RATING]]);
    }
};