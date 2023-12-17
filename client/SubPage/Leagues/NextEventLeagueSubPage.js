import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import NextEvent from '../../components/NextEvent';

import { commonStyles } from '../../styles/GlobalStyles';

export default function NextEventLeagueSubPage() {
    
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const next_race = state['next_race'][0]

    const goRace = () => {
        dispatch({ type: 'SET_RACE', payload: next_race });
        navigation.navigate('Race');
    };
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={commonStyles.margin2Top}>
                <NextEvent race_name={next_race['race_name']} stage_name={next_race['stage_name']} onPress={goRace} />
            </View>
        </SafeAreaView>
    );
}