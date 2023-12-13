import axios from 'axios';

/**
 * Fonction pour récupérer les prédiction des 3 premiers coureurs de l'étape
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} stage_id - id de l'etape.
 * @param {integer} race_id - id de la course.
 * @returns {Promise<Object|boolean>} - Renvoie les données des trois coureurs
 */
const getPrediction = async (ip_address, stage_id, race_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/stage/prediction',
            params: { stage_id, race_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getPrediction };