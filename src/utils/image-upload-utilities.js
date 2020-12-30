// Dependencies
import { promisify } from 'util';
import { readdir, unlink } from 'fs';

// Utilities
import { logError } from './logs.js';
import { emptyCallback } from './callbacks.js';

/**
 * Finds image files for a game (id)
 * @param {number} gid
 * @returns {Promise<string[] | null>}
 */
async function findImagesOfGame(gid) {
    let fileName = await promisify(readdir)('./assets/game-images').catch(emptyCallback);
    /** @type {string[]} */
    // @ts-ignore
    let files = fileName.filter(file => parseInt(file.split('.')[0]) === gid);
    return (files.length === 0) ? null : files;
};

/**
 * Removes the prev image file for a game
 * @param {number} gameid
 */
async function removePrevImage(gameid) {
    // @ts-ignore
    const OLD_IMAGE = (await findImagesOfGame(gameid).catch(emptyCallback)).map(file => './assets/game-images/' + file)[0];
    promisify(unlink)(OLD_IMAGE).catch(logError);
}

/**
 * Checks if the image for a game has been uploaded
 * @param {number} gameid
 * @returns {Promise<boolean>}
 */
async function checkIfImageForGameExists(gameid) {
    // @ts-ignore
    const EXISTING_IMAGES = (await promisify(readdir)('./assets/game-images').catch(emptyCallback)).map(fileName => parseInt(fileName.split('_')[0]));
    return EXISTING_IMAGES.includes(gameid);
}

export { findImagesOfGame, removePrevImage, checkIfImageForGameExists };