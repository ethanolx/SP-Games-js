// Imports
import query from '../../utils/query.js';
import { simpleCallbackErrorHandler } from '../../utils/callbacks.js';

export default {
    removeDuplicateRows: () => {
        const DELETE_DUPLICATES_SQL = 'DELETE t1 FROM game_category_asc AS t1 INNER JOIN game_category_asc AS t2 WHERE t1.id > t2.id AND t1.gameid = t2.gameid AND t1.categoryid = t2.categoryid;';
        query(DELETE_DUPLICATES_SQL, simpleCallbackErrorHandler);
    }
};