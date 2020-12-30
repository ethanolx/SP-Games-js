/**
 * Compares an Object to a predefined signature.
 *
 * The checks performed are for:
 * - Attribute Names
 * - Property types (may be designated optional by appending '?')
 * @param {{}} obj
 * @param {{}} signature
 * @returns {boolean}
 */
export default function compareObjectToSignature(obj, signature) {
    const ATTRS = Object.keys(obj);
    const SIG_ATTRS = Object.keys(signature);
    if (ATTRS.length !== SIG_ATTRS.length || !(SIG_ATTRS.map(attr => ATTRS.includes(attr)).reduce((a, b) => a && b))) {
        return false;
    }
    return SIG_ATTRS.map(attr => {
        if (signature[attr] instanceof Array) {
            return obj[attr].map(ob => compareObjectToSignature(ob, signature[attr][0])).reduce((a, b) => a && b);
        }
        else if (signature[attr] instanceof Object) {
            return compareObjectToSignature(obj[attr], signature[attr]);
        }
        else {
            return (signature[attr].includes('?') ? obj[attr] === null || typeof obj[attr] === signature[attr].substr(0, signature[attr].length - 1) : typeof obj[attr] === signature[attr]);
        }
    }).reduce((a, b) => a && b);
};
