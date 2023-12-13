import React, { useEffect , useState, useCallback } from 'react';
import { View, SafeAreaView, Text, FlatList, Alert, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import BasicSubtitleWhiteView from '../components/Basic/BasicSubtitleWhiteView';
import BasicLogoButton from '../components/Basic/BasicLogoButton';
import TitleLeague from '../components/Title/TitleLeague';
import RidersOfferList from '../components/List/RidersOfferList';
import RidersOfferHeaderList from '../components/RidersOfferHeaderList';
import NextEvent from '../components/NextEvent';
import CountDown from '../components/Basic/Countdown';

import { getRidersOffer } from '../api/mercato/api';
import { getRidersUserLeague, getUsersLeague, getTotalUserLeague } from '../api/league/api';

import { commonStyles } from '../styles/GlobalStyles';
import UsersList from '../components/List/UsersList';
import MyTeam from '../components/MyTeam';

export default function LeaguePage() {
    
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const [ridersOffer, setRidersOffer] = useState([]);
    const [userRiders, setUserRiders] = useState([]);
    const [users, setUsers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
    const [refreshing, setRefreshing] = useState(false);
    const [total, setTotal] = useState(false);

    const league = state['league']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const next_race = state['next_race'][0]

    const onRefresh = () => {
        setRefreshing(true);
        getLeagueDataEffect();
        setRefreshing(false);
    };

    useFocusEffect(
        useCallback(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft)
            getLeagueDataEffect();
            
        }, [getLeagueDataEffect])
    );

    useEffect(() => {
        if (!league) return;
    
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft)
    
            if (newTimeLeft === 0) {
                clearInterval(timer);
            }
        }, 100);
    
        return () => clearInterval(timer);
    }, [league, timeLeft]);

    function calculateTimeLeft() {
        if (!league) return 0

        const now = new Date();
        let mercatoEndDate = new Date();

        if (league['mercato_turns'] === 2) {
            mercatoEndDate = new Date(league['mercato_endDate1']);
        } else if (league['mercato_turns'] === 1) {
            mercatoEndDate = new Date(league['mercato_endDate2']);
        }
        const difference = mercatoEndDate - now;

        return difference > 0 ? difference : 0;
    }

    const isBeforeSpecifiedDate = () => {
        let mercatoEndDate = new Date();
        if (league['mercato_turns'] === 2) {
            mercatoEndDate = new Date(league['mercato_endDate1']);
        } else if (league['mercato_turns'] === 1) {
            mercatoEndDate = new Date(league['mercato_endDate2']);
        }
        const currentDate = new Date();
        return currentDate < mercatoEndDate;
    };

    const getLeagueDataEffect = useCallback(async () => {
        try {
            const offersData = await getRidersOffer(state['ip_adress'], user_id, league_id);
            setRidersOffer(offersData);

            const usersData = await getUsersLeague(state['ip_adress'], league_id, user_id);
            setUsers(usersData);

            const userRidersData = await getRidersUserLeague(state['ip_adress'], league_id, user_id);
            setUserRiders(userRidersData)
            dispatch({ type: 'SET_USER_TEAM', payload: userRidersData });

            const totalData = await getTotalUserLeague(state['ip_adress'], league_id, user_id);
            setTotal(totalData)

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [user_id, league_id, navigation]);

    const goLeagueRidersOffer = () => {
        navigation.navigate('RidersOffer');
    };

    const goRace = () => {
        dispatch({ type: 'SET_RACE', payload: next_race });
        navigation.navigate('Race');
    };

    const data = [
        { type: 'subtitle', data: 'Mes offres' },
        { type: 'headerOffers', data: ridersOffer },
        { type: 'offers', data: ridersOffer },
        { type: 'buttonMercato', data: null },
        { type: 'buttonHistory', data: null },
        { type: 'subtitle', data: 'Mon équipe' },
        { type: 'riders', data: null },
        { type: 'subtitle', data: 'Prochain evenement' },
        { type: 'event', data: next_race },
        { type: 'buttonBet', data: null },
        { type: 'subtitle', data: 'Utilisateurs de la ligue' },
        { type: 'users', data: users },
    ];
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} />
            <View style={commonStyles.margin2Top}>
                <TitleLeague name={league['name'].toUpperCase()} />
            </View>
            <View style={commonStyles.margin2Top}> 
                <CountDown timeLeft={timeLeft} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.margin2Left]}>
                <Text style={commonStyles.text18}>Budget restant : {total} M</Text>
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <FlatList
                    data={data}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                    }
                    keyExtractor={(item, index) => item.type + '-' + index}
                    renderItem={({ item }) => {
                        const shouldDisplayOffers = isBeforeSpecifiedDate();
                        switch (item.type) {
                            case 'headerOffers':
                                if (shouldDisplayOffers && ridersOffer.length != 0) {
                                    return (
                                        <RidersOfferHeaderList title={'Mes offres'} state={true} />
                                    )
                                }
                                break;
                            case 'offers':
                                if (shouldDisplayOffers) {
                                    return item.data.map((offer, idx) => (
                                        <RidersOfferList key={idx} rider={offer} state={true}/>
                                    ));
                                }
                                break;
                            case 'buttonMercato':
                                if (shouldDisplayOffers) {
                                    return (
                                        <View style={commonStyles.margin5Top}>
                                            <BasicLogoButton text={'Accès au mercato'} onPress={goLeagueRidersOffer} logo={'swap-horizontal'} />
                                        </View>
                                    );
                                }
                                break;
                            case 'buttonHistory':
                                if (shouldDisplayOffers) {
                                    return (
                                        <View style={commonStyles.margin2Top}>
                                            <BasicLogoButton text={'Historique du mercato'} onPress={goLeagueRidersOffer} logo={'history'} />
                                        </View>
                                    );
                                }
                                break;
                            case 'subtitle':
                                if (shouldDisplayOffers || item.data !== 'Mes offres') {
                                    return (
                                        <View style={commonStyles.margin2Top}>
                                            <BasicSubtitleWhiteView text={item.data} />
                                        </View>
                                    );
                                }
                                break;
                            case 'event':
                                return (
                                    <View style={commonStyles.margin2Top}>
                                        <NextEvent race_name={item.data['race_name']} stage_name={item.data['stage_name']} onPress={goRace} />
                                    </View>
                                );
                            case 'users': 
                                return (
                                    <View style={commonStyles.margin2Top}>
                                        <UsersList users={users} />
                                    </View>
                                );
                            case 'riders': 
                                return (
                                    <View style={commonStyles.margin2Top}>
                                        <MyTeam riders={userRiders} />
                                    </View>
                                );
                            default:
                                return null;
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
}