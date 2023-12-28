import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import TitleRace from '../components/Title/TitleRace';
import StagesRaceSubPage from '../SubPage/Races/StagesRaceSubPage';
import StartlistRaceSubPage from '../SubPage/Races/StartlistRaceSubPage';
import MyTeamRaceSubPage from '../SubPage/Races/MyTeamRaceSubPage';
import RaceInformation from '../components/RaceInformation';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';
import BetRaceSubPage from '../SubPage/Races/BetRaceSubPage';
import ResultRaceSubPage from '../SubPage/Races/ResultRaceSubPage';
import RankingRaceSubPage from '../SubPage/Races/RankingRaceSubPage';

const RaceStack  = createMaterialTopTabNavigator();

export default function RacePage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const race = state['race']

    const goRaceBet = () => {
        navigation.navigate('RaceBet');
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} />
            <View style={commonStyles.margin2Top}>
                <TitleRace nationality={race['nationality']} name={race['race_name'] + ' - ' + race['season']} />
            </View>
            <View style={commonStyles.margin2Top}>
                <RaceInformation race={race} />
            </View>
            <RaceStack.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: colors.backgroundLight
                    },
                    tabBarActiveTintColor: colors.theme,
                    tabBarInactiveTintColor: colors.whiteText,
                    tabBarLabelStyle: {
                        flexShrink: 1,
                        width: '100%',
                    },
                    tabBarScrollEnabled: true,
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.theme
                    },
                }}
            >
                <RaceStack.Screen 
                    name="Paris" 
                    component={BetRaceSubPage}
                />
                <RaceStack.Screen 
                    name="Résultats" 
                    component={ResultRaceSubPage}
                />
                <RaceStack.Screen 
                    name="Etapes" 
                    component={StagesRaceSubPage}
                />
                <RaceStack.Screen 
                    name="StartList" 
                    component={StartlistRaceSubPage}
                />
                <RaceStack.Screen 
                    name="Equipe" 
                    component={MyTeamRaceSubPage}
                />
                <RaceStack.Screen 
                    name="Classement" 
                    component={RankingRaceSubPage}
                />
            </RaceStack.Navigator>
        </SafeAreaView>
    );
}