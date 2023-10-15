import axios from 'axios';

/**
 * Fonction pour récupérer les ligues de l'utilisateur.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des ligues de l'utilisateur
 */
const getUserLeagues = async (ip_address, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/leagues/user',
            params: { user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour créer une ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} name - Nom de la ligue.
 * @param {string} password - Mot de passe de la ligue.
 * @param {integer} user_id - ID de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données de la ligue ou false si la nom de ligue existe déjà
 */
const createLeague = async (ip_address, name, password, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/league/create',
            params: { name, password, user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour rejoindre une ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} name - Nom de la ligue.
 * @param {string} password - Mot de passe de la ligue.
 * @param {integer} user_id - ID de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données de la ligue ou 0 si identifiants incorrects ou 1 si déjà dans la ligue
 */
const joinLeague = async (ip_address, name, password, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/league/join',
            params: { name, password, user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { getUserLeagues, createLeague, joinLeague};