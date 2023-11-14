import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import RaceInformation from '../components/RaceInformation';
import TitleRace from '../components/Title/TitleRace';
import BasicSubtitle from '../components/Basic/BasicSubtitle';
import BasicButton from '../components/Basic/BasicButton';

import { getBetsUserRace } from '../api/race/api';

import { commonStyles } from '../styles/GlobalStyles';
import StagesList from '../components/List/StagesList';
import StartlistList from '../components/List/StartlistList';
import Bets10List from '../components/List/Bets10List';

export default function RaceBetPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [bets, setBets] = useState([]);
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
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const race_id = state['race']['race_id']

    useEffect(() => {
        getBetDataEffect();
    }, [refreshKey, getBetDataEffect]);

    const getBetDataEffect = useCallback(async () => {
        try {
            const betsData = await getBetsUserRace(state['ip_adress'], race_id, user_id, league_id);
            setBets(betsData);
            console.log(betsData)

            // const startlistData = await getStartList(state['ip_adress'], race.race_id);
            // setStartlist(startlistData);

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
                <TitleRace nationality={race['nationality']} name={race['race_name'] + ' - ' + race['season']} />
            </View>
            <View style={[{backgroundColor: 'red'}, commonStyles.flex3]}>
                <Bets10List bets={bets} />
            </View>
            <View style={[commonStyles.flex2, commonStyles.row]}>
                <View style={[{backgroundColor: 'pink'}, commonStyles.flex1]}>
                </View>
                <View style={[{backgroundColor: 'yellow'}, commonStyles.flex1]}>
                </View>
            </View>
            <View style={[commonStyles.flex2, commonStyles.row]}>
                <View style={[{backgroundColor: 'purple'}, commonStyles.flex1]}>
                </View>
                <View style={[{backgroundColor: 'brown'}, commonStyles.flex1]}>
                    <View style={[{backgroundColor: 'blue'}, commonStyles.flex1]}>
                    </View>
                    <View style={[{backgroundColor: 'brown'}, commonStyles.flex1]}>
                    </View>
                    <View style={[{backgroundColor: 'green'}, commonStyles.flex1]}>
                    </View>
                </View>
            </View>
            {/* <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <BasicSubtitle text={'INFORMATIONS'} onPress={() => toggleVisibility(VISIBILITY_KEYS.INFORMATION)} />
                            {visibility.isInformationVisible && <View style={commonStyles.row}>
                                <RaceInformation race={race} />
                                <BasicButton text='Parier' />
                            </View>
                            }
                            <BasicSubtitle text={'ETAPES'} onPress={() => toggleVisibility(VISIBILITY_KEYS.STAGES)} />
                            {visibility.isStagesVisible && <StagesList stages={stages}  />}
                            <BasicSubtitle text={'STARTLIST'} onPress={() => toggleVisibility(VISIBILITY_KEYS.STARTLIST)} />
                            {visibility.isStartlistVisible && <StartlistList startlist={startlist} />}
                        </>
                    }
                />
            </View> */}
        </SafeAreaView>
    );
}