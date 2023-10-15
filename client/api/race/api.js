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


export { getNextRace };