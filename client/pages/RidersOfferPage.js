import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, SafeAreaView, SectionList, Alert, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import RidersOfferList from '../components/RidersOfferList';
import MakeOfferModal from '../modals/MakeOfferModal';
import BasicSubtitleView from '../components/Basic/BasicSubtitleView';
import BasicSubtitleWhiteView from '../components/Basic/BasicSubtitleWhiteView';
import BasicSearchBar from '../components/Basic/BasicSearchBar';
import SelectTeamStatus from '../components/SelectTeamStatus';
import RidersOfferHeaderList from '../components/RidersOfferHeaderList';

import { createOffer, deleteOffer, getRidersOffer, getRidersOfferMercato } from '../api/mercato/api';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function RidersOfferPage() {

    const navigation = useNavigation();

    const { state, dispatch } = useMyContext();
    
    const [ridersOffer, setRidersOffer] = useState([]);
    const [ridersOfferMercato, setRidersOfferMercato] = useState([]);
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery3, setSearchQuery3] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [offer, setOffer] = useState('');
    const [rider, setRider] = useState({});
    const [triggerRefresh, setTriggerRefresh] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [displayedTotal, setDisplayedTotal] = useState(state['league']['total']);

    const filteredRidersOffer = ridersOffer.filter(rider => (searchQuery1 === '' || rider.team_status === searchQuery1) && (rider.team_name.toLowerCase().includes(searchQuery2.toLowerCase()) || rider.team_abbreviation.toLowerCase().includes(searchQuery2.toLowerCase())) &&  rider.rider_name.toLowerCase().includes(searchQuery3.toLowerCase()));
    const filteredRidersOfferMercato = ridersOfferMercato.filter(rider => (searchQuery1 === '' || rider.team_status === searchQuery1) && (rider.team_name.toLowerCase().includes(searchQuery2.toLowerCase()) || rider.team_abbreviation.toLowerCase().includes(searchQuery2.toLowerCase())) && rider.rider_name.toLowerCase().includes(searchQuery3.toLowerCase()));

    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const status = state['team_status']
    const totalAnim = useRef(new Animated.Value(state['league']['total'])).current;
    const league = state['league']

    let last_offer = 0
    let last_offer_string = '0'

    useEffect(() => {
        getMercatoDataEffect();
    
        if (typeof state['league']['total'] !== 'undefined') { 
            Animated.timing(totalAnim, {
                toValue: state['league']['total'],
                duration: 150,
                useNativeDriver: false,
            }).start();
    
            const listener = totalAnim.addListener(({ value }) => {
                setDisplayedTotal(Math.round(value));
            });

            return () => {
                totalAnim.removeListener(listener);
            };
        }
    }, [triggerRefresh, getMercatoDataEffect, state['league']['total']]);
    

    const getMercatoDataEffect = useCallback(async () => {
        setIsLoading(true);
        try {
            const offersData = await getRidersOffer(state['ip_adress'], user_id, league_id);
            setRidersOffer(offersData);

            const mercatoData = await getRidersOfferMercato(state['ip_adress'], user_id, league_id);
            setRidersOfferMercato(mercatoData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }

    }, [user_id, league_id, navigation]);

    const onPressValidate = async () => {
        setIsLoading(true);
        last_offer = rider['offer'] ? rider['offer'] : 0;
        last_offer_string = last_offer.toString();

        try {
            if (offer > displayedTotal + last_offer) {
                Alert.alert('Erreur', 'Vous n\'avez plus le budget pour une telle offre.');
            } else if (offer < rider['cost']) {
                Alert.alert('Erreur', 'Vous ne pouvez pas faire une offre inférieure au coût du coureur.')
                setOffer(rider['cost'])
            } else if (offer !== last_offer_string) {
                toggleModal();
                await createOffer(state['ip_adress'], user_id, league_id, offer, rider['rider_id']);
                league['total'] = displayedTotal - offer + last_offer
                dispatch({ type: 'SET_LEAGUE', payload: league });
                setTriggerRefresh(prev => prev + 1);
            } else {
                toggleModal();
            }

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const onPressDelete = async (item) => {
        setIsLoading(true);
        try {
            await deleteOffer(state['ip_adress'], user_id, league_id, item['rider_id']);
            league['total'] = displayedTotal + item['offer']
            dispatch({ type: 'SET_LEAGUE', payload: league });
            setTriggerRefresh(prev => prev + 1);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View style={commonStyles.margin2Top}>
                <BasicSearchBar placeholder={'Rechercher un coureur...'} value={searchQuery3} onChangeText={setSearchQuery3} />
            </View>
            <View style={commonStyles.margin2Top}>
                <SelectTeamStatus data={status} selectedStatus={searchQuery1} />
            </View>
            <View style={commonStyles.margin2Top}>
                <BasicSearchBar placeholder={'Rechercher une équipe...'} value={searchQuery2} onChangeText={setSearchQuery2} />
            </View>
            <View style={commonStyles.margin2Top}>
                <BasicSubtitleWhiteView text={'Mon budget : ' + displayedTotal + 'M'}/>
            </View>
            {isLoading && <ActivityIndicator size="large" color={colors.theme} /> || 
            <SectionList
                sections={[
                    { title: 'Mes offres', data: filteredRidersOffer },
                    { title: 'Mercato', data: filteredRidersOfferMercato }
                ]}
                stickySectionHeadersEnabled={false}
                keyExtractor={(item, index) => `${item.rider_id || index}`}
                renderItem={({ item }) => <RidersOfferList rider={item} toggleModal={toggleModal} offer={offer} setOffer={setOffer} setRider={setRider} isLoading={isLoading} onPressDelete={() => onPressDelete(item)} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={commonStyles.margin2Top}>
                        <BasicSubtitleView text={title}/>
                        {ridersOffer.length != 0 && <RidersOfferHeaderList title={title} modify={true} />}
                    </View>
                )}
            />}
            <MakeOfferModal visible={isModalVisible} rider={rider} toggleModal={toggleModal} onPressValidate={onPressValidate} offer={offer} setOffer={setOffer} />
        </SafeAreaView>
    );
}