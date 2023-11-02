import axios from 'axios';

/**
 * Fonction pour récupérer la prochaine course ou étape
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @returns {Promise<Object|boolean>} - Renvoie les données de la course ou étape (ou les 2)
 */
const getNextRace = async (ip_address) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/next'
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les étapes de la course.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} race_id - id de la course.
 * @returns {Promise<Object|boolean>} - Renvoie les données des étapes
 */
const getStagesRace = async (ip_address, race_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/stages',
            params: { race_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer la startlist de la course.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} race_id - id de la course.
 * @returns {Promise<Object|boolean>} - Renvoie les données de la startlist
 */
const getStartListRace = async (ip_address, race_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/startlist',
            params: { race_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { getNextRace, getStagesRace, getStartListRace };