import { promisify } from 'util';
import { readdir } from 'fs';

/**
 * @param {number} gid
 */
export const findImagesOfGame = async (gid) => {
    let fileName = await promisify(readdir)('./assets/game-images').catch();
    let files = fileName.filter(file => parseInt(file.split('_')[0]) === gid);
    return files;
};

/**
 * @param {number} gameid
 */
export async function removeImages(gameid) {
    if (await checkIfImageExists(gameid)) {
        //@ts-ignore
        const [_, ...OLD_IMAGES] = (await findImagesOfGame(gameid).catch()).map(file => './assets/game-images' + file).sort((a, b) => -1);
        OLD_IMAGES.forEach(oldFile => { promisify(unlink)(oldFile).catch(); });
    }
}

/**
 * @param {number} gameid
 * @returns {Promise<boolean>}
 */
export async function checkIfImageForGameExists(gameid) {
    const EXISTING_IMAGES = (await promisify(readdir)('./assets/game-images').catch()).map(fileName => parseInt(fileName.split('_')[0]));
    return EXISTING_IMAGES.includes(gameid);
}