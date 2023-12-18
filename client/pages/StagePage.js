import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import StageInformation from '../components/StageInformation';
import TitleRace from '../components/Title/TitleRace';
import TitleStage from '../components/Title/TitleStage';
import BasicSubtitle from '../components/Basic/BasicSubtitle';
import BasicButton from '../components/Basic/BasicButton';

import { getPrediction } from '../api/stage/api'; 

import { commonStyles } from '../styles/GlobalStyles';
import StagesList from '../components/List/StagesList';
import StartlistList from '../components/List/StartlistList';
import Prediction from '../components/Prediction';
import Profile from '../components/Basic/Profile';
import colors from '../constants/colors';
import ProfileStageSubPage from '../SubPage/Stages/ProfileStageSubPage';
import PredictionStageSubPage from '../SubPage/Stages/PredictionStageSubPage';
import BetStageSubPage from '../SubPage/Stages/BetStageSubPage';

const StageStack  = createMaterialTopTabNavigator();

export default function StagePage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [stages, setStages] = useState([]);
    const [startlist, setStartlist] = useState([]);
    const [userTeam, setUserTeam] = useState([]);
    const [prediction, setPrediction] = useState([]);

    const [visibility, setVisibility] = useState({
        isInformationVisible: true,
        isProfilVisible: true,
        isPredictorVisible: true,
        isTeamVisible: true
    });

    const VISIBILITY_KEYS = {
        INFORMATION: 'isInformationVisible',
        PROFIL: 'isProfilVisible',
        PREDICTOR: 'isPredictorVisible',
        TEAM: 'isTeamVisible'
    };

    const [refreshKey, setRefreshKey] = React.useState(0);

    const team = state['team']
    const race = state['race']
    const year = state['year']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const stage = state['stage']

    useEffect(() => {
        getStageDataEffect();
    }, [refreshKey, getStageDataEffect]);

    const getStageDataEffect = useCallback(async () => {
        try {
            const predictionData = await getPrediction(state['ip_adress'], stage.id, race.race_id);
            setPrediction(predictionData);
            
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team, year, navigation]);

    const toggleVisibility = (key) => {
        setVisibility(prevVisibility => ({
            ...prevVisibility,
            [key]: !prevVisibility[key]
        }));
    };

    const goStageBet = () => {
        navigation.navigate('StageBet');
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} />
            <View style={commonStyles.margin2Top}>
                <TitleRace nationality={race['nationality']} name={race['race_name'] + ' - ' + race['season']} />
                <TitleStage name={stage['name']} />
            </View>
            <View style={commonStyles.margin2Top}>
                <StageInformation stage={stage} />
            </View>
            <StageStack.Navigator
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
                <StageStack.Screen 
                    name="Paris" 
                    component={BetStageSubPage}
                />
                <StageStack.Screen 
                    name="Profil" 
                    component={ProfileStageSubPage}
                />
                <StageStack.Screen 
                    name="Predictor" 
                    component={PredictionStageSubPage}
                />
            </StageStack.Navigator>
            {/* <View style={commonStyles.margin2Top}>
               <BasicButton text='Parier' onPress={goStageBet} />
            </View>
            <View style={[commonStyles.flex1]}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <BasicSubtitle text={'INFORMATIONS'} onPress={() => toggleVisibility(VISIBILITY_KEYS.INFORMATION)} />
                            {visibility.isInformationVisible && <StageInformation stage={stage} />}
                            <BasicSubtitle text={'PROFIL'} onPress={() => toggleVisibility(VISIBILITY_KEYS.PROFIL)} />
                            {visibility.isProfilVisible && <Profile profile={stage.profile} />}
                            <BasicSubtitle text={'PREDICTOR'} onPress={() => toggleVisibility(VISIBILITY_KEYS.PREDICTOR)} />
                            {visibility.isPredictorVisible && <Prediction riders={prediction} />}
                        </>
                    }
                />
            </View> */}
        </SafeAreaView>
    );
}