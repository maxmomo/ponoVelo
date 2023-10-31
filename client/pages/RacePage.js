import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import RidersList from '../components/List/RidersList';
import HistoryList from '../components/List/HistoryList';
import TeamInformation from '../components/TeamInformation';
import RaceInformation from '../components/RaceInformation';
import TeamPerformance from '../components/TeamPerformance';
import TitleRace from '../components/Title/TitleRace';
import BasicSubtitle from '../components/Basic/BasicSubtitle';
import Jersey from '../components/Basic/Jersey';

import { getStages } from '../api/race/api';

import { commonStyles } from '../styles/GlobalStyles';
import StagesList from '../components/List/StagesList';

export default function RacePage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [statistics, setStatistics] = useState([]);
    const [history, setHistory] = useState([]);
    const [stages, setStages] = useState([]);

    const [visibility, setVisibility] = useState({
        isInformationVisible: true,
        isStagesVisible: true,
        isRidersVisible: true,
        isPerformancesVisible: true
    });

    const VISIBILITY_KEYS = {
        INFORMATION: 'isInformationVisible',
        STAGES: 'isStagesVisible',
        RIDERS: 'isRidersVisible',
        PERFORMANCES: 'isPerformancesVisible'
    };

    const [refreshKey, setRefreshKey] = React.useState(0);

    const team = state['team']
    const race = state['race']
    const year = state['year']

    useEffect(() => {
        getRaceDataEffect();
    }, [refreshKey, getRaceDataEffect]);

    const getRaceDataEffect = useCallback(async () => {
        try {
            const stagesData = await getStages(state['ip_adress'], race.race_id);
            console.log(stagesData)
            setStages(stagesData);

            // const historyData = await getHistory(state['ip_adress'], team.related_team_id, year, team.year);
            // setHistory(historyData);

            // const statisticsData = await getStatistics(state['ip_adress'], team.related_team_id);
            // setStatistics(statisticsData);
            // dispatch({ type: 'SET_STATISTICS', payload: statisticsData });
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

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header navigation={navigation} />
            <View style={commonStyles.margin2Top}>
                <TitleRace nationality={race['nationality']} name={race['race_name']} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
            <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={[commonStyles.margin2Top, commonStyles.row]}>
                                <Jersey jersey={team['jersey']} height={150} width={150} />
                            </View>
                            <BasicSubtitle text={'INFORMATIONS'} onPress={() => toggleVisibility(VISIBILITY_KEYS.INFORMATION)} />
                            {visibility.isInformationVisible && <RaceInformation race={race} />}
                            <BasicSubtitle text={'ETAPES'} onPress={() => toggleVisibility(VISIBILITY_KEYS.STAGES)} />
                            {visibility.isStagesVisible && <StagesList stages={stages}  />}
                            {/* <BasicSubtitle text={'COUREURS'} onPress={() => toggleVisibility(VISIBILITY_KEYS.RIDERS)} />
                            {visibility.isRidersVisible && <RidersList riders={riders} />}
                            <BasicSubtitle text={'PERFORMANCES'} onPress={() => toggleVisibility(VISIBILITY_KEYS.PERFORMANCES)} />
                            {visibility.isPerformancesVisible && <TeamPerformance />} */}
                        </>
                    }
                />
            </View>
        </SafeAreaView>
    );
}