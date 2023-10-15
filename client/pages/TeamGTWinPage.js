import React, {useState, useEffect} from 'react';
import { View, SafeAreaView } from 'react-native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import BasicSubtitle from '../components/Basic/BasicSubtitle';
import TitleTeam from '../components/Title/TitleTeam';
import SelectRace from '../components/SelectRace';
import TeamResultList from '../components/TeamResultList';

import { commonStyles } from '../styles/GlobalStyles';

export default function TeamGTWinPage({route, navigation}) {
    
    const { state, dispatch } = useMyContext();

    const [selectedRace, setSelectedRace] = useState('Giro');
    const [statistics, setStatistics] = useState([]);

    const team = state['team']
    const statistics_data = state['statistics'][0]

    useEffect(() => {
        if (selectedRace === 'Giro') {
            setStatistics(statistics_data.filter(item => item.race_name === 'Giro d\'Italia'))
        } else if (selectedRace === 'TDF') {
            setStatistics(statistics_data.filter(item => item.race_name === 'Tour de France'))
        } else if (selectedRace === 'Vuelta') {
            setStatistics(statistics_data.filter(item => item.race_name === 'La Vuelta ciclista a España'))
        }
    }, [selectedRace]);

    const setGiro = () => {
        setSelectedRace('Giro')
    }

    const setTDF = () => {
        setSelectedRace('TDF')
    }

    const setVuelta = () => {
        setSelectedRace('Vuelta')
    }

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header navigation={navigation} />
            <View style={commonStyles.margin2Top}>
                <TitleTeam nationality={team['nationality']} name={team['name']}/>
            </View>
            <BasicSubtitle text={'VICTOIRES SUR GT'} />
            <View style={commonStyles.margin2Top}>
                <SelectRace selectedRace={selectedRace} setGiro={setGiro} setTDF={setTDF} setVuelta={setVuelta} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <TeamResultList statistics={statistics} />
            </View>
        </SafeAreaView>
    );
}