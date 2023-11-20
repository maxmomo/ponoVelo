import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import RaceInformation from '../components/RaceInformation';
import TitleRace from '../components/Title/TitleRace';
import BasicSubtitle from '../components/Basic/BasicSubtitle';
import BasicButton from '../components/Basic/BasicButton';

import { getStagesRace, getStartListRace } from '../api/race/api';

import { commonStyles } from '../styles/GlobalStyles';
import StagesList from '../components/List/StagesList';
import StartlistList from '../components/List/StartlistList';

export default function RacePage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [stages, setStages] = useState([]);
    const [startlist, setStartlist] = useState([]);

    const [visibility, setVisibility] = useState({
        isInformationVisible: true,
        isStagesVisible: true,
        isStartlistVisible: true,
        isPerformancesVisible: true
    });

    const VISIBILITY_KEYS = {
        INFORMATION: 'isInformationVisible',
        STAGES: 'isStagesVisible',
        STARTLIST: 'isStartListVisible',
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
            const stagesData = await getStagesRace(state['ip_adress'], race.race_id);
            setStages(stagesData);

            const startlistData = await getStartListRace(state['ip_adress'], race.race_id);
            setStartlist(startlistData);

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

    const goRaceBet = () => {
        navigation.navigate('RaceBet');
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} />
            <View style={commonStyles.margin2Top}>
                <TitleRace nationality={race['nationality']} name={race['race_name'] + ' - ' + race['season']} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
            <FlatList
                    ListHeaderComponent={
                        <>
                            <BasicSubtitle text={'INFORMATIONS'} onPress={() => toggleVisibility(VISIBILITY_KEYS.INFORMATION)} />
                            {visibility.isInformationVisible && <View style={commonStyles.row}>
                                <RaceInformation race={race} />
                                <BasicButton text='Parier' onPress={goRaceBet} />
                            </View>
                            }
                            <BasicSubtitle text={'ETAPES'} onPress={() => toggleVisibility(VISIBILITY_KEYS.STAGES)} />
                            {visibility.isStagesVisible && <StagesList stages={stages}  />}
                            <BasicSubtitle text={'STARTLIST'} onPress={() => toggleVisibility(VISIBILITY_KEYS.STARTLIST)} />
                            {visibility.isStartlistVisible && <StartlistList startlist={startlist} />}
                        </>
                    }
                />
            </View>
        </SafeAreaView>
    );
}