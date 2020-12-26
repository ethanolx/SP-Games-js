import compareObjectToSignature from "./checkSignature.js";

/**
 * @param {string} id
 * @param {import("express").Response} res
 * @returns {boolean}
 */
export function invalidId(id, res) {
    const PARSED_ID = parseInt(id);
    if (`${ PARSED_ID }` !== id) {
        res.status(400).json({ message: 'Invalid id provided' });
        return true;
    }
    return false;
};

/**
 * @param {{}} body
 * @param {{}} signature
 * @param {import("express").Response} res
 * @returns {boolean}
 */
export function invalidBody(body, signature, res) {
    if (!compareObjectToSignature(body, signature)) {
        res.status(400).json({ message: 'Request body has missing attributes' });
        return true;
    }
    return false;
};