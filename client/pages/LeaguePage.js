import React, { useEffect , useState, useCallback } from 'react';
import { View, SafeAreaView, Text, FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import BasicSubtitleView from '../components/Basic/BasicSubtitleView';
import BasicLogoButton from '../components/Basic/BasicLogoButton';
import TitleLeague from '../components/Title/TitleLeague';
import RidersOfferList from '../components/RidersOfferList';
import RidersOfferHeaderList from '../components/RidersOfferHeaderList';
import NextEvent from '../components/NextEvent';
import CountDown from '../components/Basic/Countdown';

import { getRidersOffer } from '../api/mercato/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function LeaguePage() {
    
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const [ridersOffer, setRidersOffer] = useState([]);
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

    const league = state['league']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const next_race = state['next_race'][0]

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
        const mercatoEndDate = new Date(league['mercato_endDate']);
        const difference = mercatoEndDate - now;

        return difference > 0 ? difference : 0;
    }

    const getLeagueDataEffect = useCallback(async () => {
        try {
            const offersData = await getRidersOffer(state['ip_adress'], user_id, league_id);
            setRidersOffer(offersData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [user_id, league_id, navigation]);

    const goLeagueRidersOffer = () => {
        navigation.navigate('RidersOffer');
    };

    const data = [
        { type: 'subtitle', data: 'Mes offres' },
        { type: 'headerOffers', data: ridersOffer },
        { type: 'offers', data: ridersOffer },
        { type: 'buttonMercato', data: null },
        { type: 'subtitle', data: 'Prochain evenement' },
        { type: 'event', data: next_race },
        { type: 'buttonBet', data: null },
    ];
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header navigation={navigation} />
            <View style={commonStyles.margin2Top}>
                <TitleLeague name={league['name'].toUpperCase()} />
                <CountDown timeLeft={timeLeft} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item.type + '-' + index}
                    renderItem={({ item }) => {
                        switch (item.type) {
                            case 'headerOffers':
                                return (
                                    <RidersOfferHeaderList title={'Mes offres'} />
                                )
                            case 'offers':
                                return item.data.map((offer, idx) => (
                                    <RidersOfferList key={idx} rider={offer} />
                                ));
                            case 'buttonMercato':
                                return (
                                    <View style={commonStyles.margin5Top}>
                                        <BasicLogoButton text={'Accès au mercato'} onPress={goLeagueRidersOffer} logo={'swap-horizontal'} />
                                    </View>
                                );
                            case 'buttonBet':
                                return (
                                    <View style={commonStyles.margin5Top}>
                                        <BasicLogoButton text={'Parier sur l\'évènement'} onPress={goLeagueRidersOffer} logo={'flag-checkered'} />
                                    </View>
                                );
                            case 'subtitle':
                                return (
                                    <View style={commonStyles.margin2Top}>
                                        <BasicSubtitleView text={item.data} />
                                    </View>
                                );
                            case 'event':
                                return (
                                    <View style={commonStyles.margin2Top}>
                                        <NextEvent race_name={item.data['race_name']} stage_name={item.data['stage_name']} />
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