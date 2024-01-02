import React, {useEffect, useState, useCallback} from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Bets10List from '../components/List/Bets10List';
import Bets3List from '../components/List/Bets3List';

import { getBetsUserRace } from '../api/race/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function RaceBet(props) {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [bets, setBets] = useState([]);

    const team = state['team']
    const year = state['year']
    const league_id = state['league']['id']
    const race_id = state['race']['race_id']

    useEffect(() => {
        getBetDataEffect();
    }, [getBetDataEffect, props.isModalBetVisible]);

    const getBetDataEffect = useCallback(async () => {
        try {
            const betsData = await getBetsUserRace(state['ip_adress'], race_id, props.user_id, league_id);
            setBets(betsData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team, year, navigation]);

    return (
        <ScrollView style={commonStyles.margin2Top}>
            <View style={[commonStyles.flex3]}>
                <Bets10List bets={bets} onPress={() => props.onPress(1)} betTypeId={1} readonly={props.readonly} />
            </View>
            <View style={[commonStyles.flex2, commonStyles.row]}>
                <View style={[commonStyles.flex1]}>
                    <Bets3List type={'Points'} bets={bets} onPress={() => props.onPress(2)} betTypeId={2} readonly={props.readonly} />
                </View>
                <View style={[commonStyles.flex1]}>
                    <Bets3List type={'Montagne'} bets={bets} onPress={() => props.onPress(3)} betTypeId={3} readonly={props.readonly} />
                </View>
            </View>
            <View style={[commonStyles.flex2, commonStyles.row]}>
                <View style={[commonStyles.flex1]}>
                    <Bets3List type={'Jeune'} bets={bets} onPress={() => props.onPress(4)} betTypeId={4} readonly={props.readonly} />
                </View>
                <View style={[commonStyles.flex1]}>
                    <Bets3List type={'Equipe'} bets={bets} onPress={() => props.onPress(18)} betTypeId={18} readonly={props.readonly} />
                </View>
            </View>
        </ScrollView>
    );
}