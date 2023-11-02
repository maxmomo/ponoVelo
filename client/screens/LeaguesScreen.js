import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Basic/Header';
import BasicLogoButton from '../components/Basic/BasicLogoButton';
import CardLeagues from '../components/Cards/CardLeagues';
import CreateLeagueModal from '../modals/CreateLeagueModal';
import JoinLeagueModal from '../modals/JoinLeagueModal';

import { createLeague, joinLeague } from '../api/league/api';
import { getNextRace } from '../api/race/api';
import { getLeaguesUser } from '../api/user/api';

import { commonStyles } from '../styles/GlobalStyles';

function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
}

export default function LeaguesScreen() {

    const navigation = useNavigation();

    const { state, dispatch } = useMyContext();

    const [leagues, setLeagues] = useState([]);
    const [refreshKey, setRefreshKey] = React.useState(0);
    const [name, setName] = useState('');
    const [isModalJoinVisible, setIsModalJoinVisible] = useState(false);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [password, setPassword] = useState('');

    user_id = state['user']['id']

    useEffect(() => {
       getLeaguesEffect();
    }, [refreshKey, getLeaguesEffect]);

    const getLeaguesEffect = useCallback(async () => {
        try {
            const leaguesData = await getLeaguesUser(state['ip_adress'], user_id);
            setLeagues(leaguesData)

            const nextRace = await getNextRace(state['ip_adress'])
            dispatch({ type: 'SET_NEXT_RACE', payload: nextRace });

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [name, user_id, navigation]);

    
    const onPressCreate = async () => {
        try {
            const createdPassword = generatePassword();
            const leagueData = await createLeague(state['ip_adress'], name, createdPassword, user_id);
            
            if (leagueData === false) {
                Alert.alert('Erreur', 'Le nom de ligue existe déjà.');
            } else {
                setRefreshKey(prevKey => prevKey + 1);
                toggleCreateModal();
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    };
    
    const onPressJoin = async () => {
        try {
            const leagueData = await joinLeague(state['ip_adress'], name, password, user_id);
            
            if (leagueData === 0) {
                Alert.alert('Erreur', 'Identifiants incorrects.');
            } else if (leagueData === 1) {
                Alert.alert('Erreur', 'Vous appartenez déjà à cette ligue.');
            } else {
                setRefreshKey(prevKey => prevKey + 1);
                toggleJoinModal();
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    };

    const toggleCreateModal = () => {
        setIsModalCreateVisible(!isModalCreateVisible);
    };

    const toggleJoinModal = () => {
        setIsModalJoinVisible(!isModalJoinVisible);
    };
    
    const onPressLeague = (item) => {
        dispatch({ type: 'SET_LEAGUE', payload: item });
        navigation.navigate('League')
    }
        
    return (
        <SafeAreaView style={commonStyles.container}>
            <Header/>
            <View style={[commonStyles.margin2Top]}>
                <BasicLogoButton text={'Nouvelle ligue'} onPress={toggleCreateModal} logo={'plus'} />
                <BasicLogoButton text={'Rejoindre ligue'} onPress={toggleJoinModal} logo={'arrow-right-circle'} />
            </View>
            <View style={[commonStyles.margin2Top]}>  
                <CardLeagues leagues={leagues} onPress={onPressLeague}/> 
            </View> 
            <CreateLeagueModal visible={isModalCreateVisible} toggleModal={toggleCreateModal} onPressCreate={onPressCreate} name={name} setName={setName} />
            <JoinLeagueModal visible={isModalJoinVisible} toggleModal={toggleJoinModal} onPressCreate={onPressJoin} name={name} setName={setName} password={password} setPassword={setPassword} />
        </SafeAreaView>
    );
}