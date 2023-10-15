import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import RidersList from '../components/RidersList';
import HistoryList from '../components/List/HistoryList';
import GtDiagram from '../components/Diagram/GtDiagram';
import TeamInformation from '../components/TeamInformation';
import TeamPerformance from '../components/TeamPerformance';
import TitleTeam from '../components/TitleTeam';
import BasicSubtitle from '../components/Basic/BasicSubtitle';
import Jersey from '../components/Basic/Jersey';

import { getRiders, getHistory, getStatistics } from '../api/team/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function TeamPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [statistics, setStatistics] = useState([]);
    const [history, setHistory] = useState([]);
    const [riders, setRiders] = useState([]);

    const [visibility, setVisibility] = useState({
        isInformationVisible: true,
        isHistoryVisible: true,
        isRidersVisible: true,
        isPerformancesVisible: true
    });

    const VISIBILITY_KEYS = {
        INFORMATION: 'isInformationVisible',
        HISTORY: 'isHistoryVisible',
        RIDERS: 'isRidersVisible',
        PERFORMANCES: 'isPerformancesVisible'
    };

    const [refreshKey, setRefreshKey] = React.useState(0);

    const team = state['team']
    const year = state['year']

    useEffect(() => {
        getTeamDataEffect();
    }, [refreshKey, getTeamDataEffect]);

    const getTeamDataEffect = useCallback(async () => {
        try {
            const ridersData = await getRiders(state['ip_adress'], team.id);
            setRiders(ridersData);

            const historyData = await getHistory(state['ip_adress'], team.related_team_id, year, team.year);
            setHistory(historyData);

            const statisticsData = await getStatistics(state['ip_adress'], team.related_team_id);
            setStatistics(statisticsData);
            dispatch({ type: 'SET_STATISTICS', payload: statisticsData });
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
                <TitleTeam nationality={team['nationality']} name={team['name']} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[commonStyles.margin2Top, commonStyles.row]}>
                        <Jersey jersey={team['jersey']} height={150} width={150} />
                        <GtDiagram statistics={statistics}></GtDiagram>
                    </View>
                    <BasicSubtitle text={'INFORMATIONS'} onPress={() => toggleVisibility(VISIBILITY_KEYS.INFORMATION)} />
                    {visibility.isInformationVisible && <TeamInformation team={team} />}
                    <BasicSubtitle text={'HISTORIQUE'} onPress={() => toggleVisibility(VISIBILITY_KEYS.HISTORY)} />
                    {visibility.isHistoryVisible && <HistoryList history={history} onItemPress={handleRefresh} />}
                    <BasicSubtitle text={'COUREURS'} onPress={() => toggleVisibility(VISIBILITY_KEYS.RIDERS)} />
                    {visibility.isRidersVisible && <RidersList riders={riders} />}
                    <BasicSubtitle text={'PERFORMANCES'} onPress={() => toggleVisibility(VISIBILITY_KEYS.PERFORMANCES)} />
                    {visibility.isPerformancesVisible && <TeamPerformance/>}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}