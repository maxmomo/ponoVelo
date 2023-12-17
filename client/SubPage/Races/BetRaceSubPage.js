import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import Header from '../../components/Basic/Header';
import TitleRace from '../../components/Title/TitleRace';

import { getBetsUserRace, setBetsUserRace } from '../../api/race/api';

import { commonStyles } from '../../styles/GlobalStyles';
import Bets10List from '../../components/List/Bets10List';
import Podium from '../../components/Podium';
import BetModal from '../../modals/BetModal';
import Bets3List from '../../components/List/Bets3List';

export default function BetRaceSubPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [bets, setBets] = useState([]);
    const [startlist, setStartlist] = useState([]);
    const [position, setPosition] = useState(0)
    const [riderId, setRiderId] = useState(0)
    const [betTypeId, setBetTypeId] = useState(0)
    const [isModalBetVisible, setIsModalBetVisible] = useState(false);

    const team = state['team']
    const race = state['race']
    const year = state['year']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const race_id = state['race']['race_id']

    useEffect(() => {
        if (isModalBetVisible === false) {
            getBetDataEffect();
            setStartlist(state['startlist'])
        }
    }, [getBetDataEffect, riderId, isModalBetVisible]);

    const getBetDataEffect = useCallback(async () => {
        try {
            const betsData = await getBetsUserRace(state['ip_adress'], race_id, user_id, league_id);
            setBets(betsData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team, year, navigation]);

    const onPressCreateBet = async () => {
        try {
            await setBetsUserRace(state['ip_adress'], race_id, user_id, league_id, position, riderId, betTypeId);
            setIsModalBetVisible(false)
            
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    };

    const toggleBetModal = () => {
        setIsModalBetVisible(!isModalBetVisible);
    };

    const onPressItem = (typeId) => {
        setIsModalBetVisible(!isModalBetVisible);
        setBetTypeId(typeId)
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <ScrollView>

                <View style={[commonStyles.flex3]}>
                    <Bets10List bets={bets} onPress={() => onPressItem(1)} betTypeId={1} />
                </View>
                <View style={[commonStyles.flex2, commonStyles.row]}>
                    <View style={[commonStyles.flex1]}>
                        <Bets3List type={'Classement par point'} bets={bets} onPress={() => onPressItem(2)} betTypeId={2} />
                    </View>
                    <View style={[commonStyles.flex1]}>
                        <Bets3List type={'Classement par point'} bets={bets} onPress={() => onPressItem(2)} betTypeId={3} />
                    </View>
                </View>
                <View style={[commonStyles.flex2, commonStyles.row]}>
                    <View style={[commonStyles.flex1]}>
                        <Bets3List type={'Classement par point'} bets={bets} onPress={() => onPressItem(2)} betTypeId={4} />
                    </View>
                    <View style={[commonStyles.flex1]}>
                    </View>
                </View>
            </ScrollView>
            <BetModal visible={isModalBetVisible} toggleModal={toggleBetModal} startlist={startlist} setPosition={setPosition} riderId={riderId} setRiderId={setRiderId} onPress={onPressCreateBet} betTypeId={betTypeId} />
        </SafeAreaView>
    );
}