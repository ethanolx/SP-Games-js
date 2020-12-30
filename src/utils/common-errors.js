// Imports
import compareObjectToSignature from "./compare-object-to-signature.js";

/**
 * Validates an id in string form
 *
 * Criteria:
 *  - Integer
 *  - No non-numeric characters
 * @param {string} id
 * @param {import("express").Response} res
 * @returns {boolean}
 */
function invalidId(id, res) {
    const PARSED_ID = parseInt(id);
    if (`${ PARSED_ID }` !== id) {
        res.status(400).json({ message: 'Invalid id provided' });
        return true;
    }
    return false;
};

/**
 * Validates an object's signature
 *
 * Criterion:
 *  - Signature of object matches specification
 * @param {{}} body
 * @param {{}} signature
 * @param {import("express").Response} res
 * @returns {boolean}
 */
function invalidBody(body, signature, res) {
    if (!compareObjectToSignature(body, signature)) {
        res.status(400).json({ message: 'Request body has missing attributes' });
        return true;
    }
    return false;
};

export { invalidId, invalidBody };