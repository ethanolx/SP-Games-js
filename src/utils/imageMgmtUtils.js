import { promisify } from 'util';
import { readdir, unlink } from 'fs';
import { logError } from './logs.js';

/**
 * @param {number} gid
 * @returns {Promise<string[] | null>}
 */
export const findImagesOfGame = async (gid) => {
    let fileName = await promisify(readdir)('./assets/game-images').catch(_ => []);
    /** @type {string[]} */
    let files = fileName.filter(file => parseInt(file.split('.')[0]) === gid);
    return (files.length === 0) ? null : files;
};

/**
 * @param {number} gameid
 */
export async function removePrevImage(gameid) {
    //@ts-ignore
    const OLD_IMAGE = (await findImagesOfGame(gameid).catch(_ => { })).map(file => './assets/game-images/' + file)[0];
    promisify(unlink)(OLD_IMAGE).catch(logError);
}

/**
 * @param {number} gameid
 * @returns {Promise<boolean>}
 */
export async function checkIfImageForGameExists(gameid) {
    const EXISTING_IMAGES = (await promisify(readdir)('./assets/game-images').catch()).map(fileName => parseInt(fileName.split('_')[0]));
    return EXISTING_IMAGES.includes(gameid);
}