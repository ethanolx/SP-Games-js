// Imports
import query from '../../utils/query.js';
import { simpleCallbackErrorHandler } from '../../utils/callbacks.js';

export default {
    removeDuplicateRows: () => {
        const DELETE_DUPLICATES_SQL = 'DELETE t1 FROM game_platform_asc AS t1 INNER JOIN game_platform_asc AS t2 WHERE t1.id > t2.id AND t1.gameid = t2.gameid AND t1.platformid = t2.platformid;';
        query(DELETE_DUPLICATES_SQL, simpleCallbackErrorHandler);
    }
};