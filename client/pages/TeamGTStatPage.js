import React, {useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';
import Flag from 'react-native-flags';
import { useMyContext } from '../context/MyContext';
import Header from '../components/Basic/Header';
import axios from 'axios';
import BestRidersList from '../components/List/BestRidersList';
import BestRidersChart from '../components/Chart/BestRidersChart';
import SplashScreenWait from '../screens/SplashScreenWait';

export default function TeamGTStatPage({ route, navigation }) {
    
    const { state, dispatch } = useMyContext();

    const [statistics, setStatistics] = React.useState({
        statistics_best_result: [],
        statistics_best_result_evolution: [],
        statistics_best_point: [],
        statistics_best_point_evolution: [],
        statistics_best_montain: [],
        statistics_best_montain_evolution: [],
        statistics_best_young: [],
        statistics_best_young_evolution: []
    })

    const [isGCVisible, setIsGCVisible] = React.useState(true);
    const [isPointVisible, setIsPointVisible] = React.useState(true);
    const [isYoungVisible, setIsYoungVisible] = React.useState(true);
    const [isMontainVisible, setIsMontainVisible] = React.useState(true);
    
    const team = state['team']
    const selectedRace = state['raceStatistic']
    
    useEffect(() => {
        if (selectedRace === 'Giro') {
            getStatisticsTdf(1039);
        } else if (selectedRace === 'Tour de France') {
            getStatisticsTdf(1049);
        } else if (selectedRace === 'Vuelta') {
            getStatisticsTdf(1051);
        }
    }, []);

    const getStatisticsTdf = async (pcs_id) => {
        await axios({
            method: "get",
            url: "http://192.168.1.125:3000/team/statistics/tdf",
            params: {
                related_team_id: team.related_team_id,
                pcs_race_id: pcs_id
            }
        })
        .then(response => {
            setStatistics(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };
    

    const toggleGCVisibility = () => {
        setIsGCVisible(!isGCVisible);
    };

    const togglePointVisibility = () => {
        setIsPointVisible(!isPointVisible);
    };

    const toggleYoungVisibility = () => {
        setIsYoungVisible(!isYoungVisible);
    };

    const toggleMontainVisibility = () => {
        setIsMontainVisible(!isMontainVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.titleView}>
                <Flag code={team['nationality']} size={32} style={styles.flag} type={'flat'}/>
                <Text style={styles.titleText}>{team['name'].toUpperCase()}</Text>
            </View>
            <View style={styles.subtitleView}>
                <Text style={styles.subtitleText}>STATISTIQUES SUR {selectedRace.toUpperCase()}</Text>
            </View>
            <ScrollView>
                <TouchableOpacity style={styles.subtitleView2} onPress={toggleGCVisibility}>
                    <Text style={styles.subtitleText2}>Meilleur classement général</Text>
                </TouchableOpacity>
                {isGCVisible &&
                <View>
                    <View style={styles.elements}>
                        <BestRidersList statistics={statistics['statistics_best_result']} />
                    </View>
                    <View style={styles.elements}>
                        <BestRidersChart statistics={statistics['statistics_best_result_evolution']} />
                    </View>
                </View>
                }
                <TouchableOpacity style={styles.subtitleView2} onPress={togglePointVisibility}>
                    <Text style={styles.subtitleText2}>Meilleur classement par point</Text>
                </TouchableOpacity>
                {isPointVisible &&
                <View>
                    <View style={styles.elements}>
                        <BestRidersList statistics={statistics['statistics_best_point']} />
                    </View>
                    <View style={styles.elements}>
                        <BestRidersChart statistics={statistics['statistics_best_point_evolution']} />
                    </View>
                </View>
                }
                <TouchableOpacity style={styles.subtitleView2} onPress={toggleMontainVisibility}>
                    <Text style={styles.subtitleText2}>Meilleur classement montagne</Text>
                </TouchableOpacity>
                {isMontainVisible &&
                <View>
                    <View style={styles.elements}>
                        <BestRidersList statistics={statistics['statistics_best_montain']} />
                    </View>
                    <View style={styles.elements}>
                        <BestRidersChart statistics={statistics['statistics_best_montain_evolution']} />
                    </View>
                </View>
                }
                <TouchableOpacity style={styles.subtitleView2} onPress={toggleYoungVisibility}>
                    <Text style={styles.subtitleText2}>Meilleur classement jeune</Text>
                </TouchableOpacity>
                {isYoungVisible &&
                <View>
                    <View style={styles.elements}>
                        <BestRidersList statistics={statistics['statistics_best_young']} />
                    </View>
                    <View style={styles.elements}>
                        <BestRidersChart statistics={statistics['statistics_best_young_evolution']} />
                    </View>
                </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21222D', 
    },
    scrollView: {
        flex: 1
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        marginLeft: '3%',
    },
    titleText: {
        marginLeft: '3%',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E4E9F2'
    },
    subtitleView: {
        borderBottomWidth: 2,
        borderBottomColor: '#F2C238',
        padding: '3%',
        width: '90%',
        marginBottom: '3%'
    },
    subtitleView2: {
        borderBottomWidth: 1,
        borderBottomColor: '#F2C238',
        padding: '3%',
        width: '60%',
        marginBottom: '3%'
    },
    subtitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F2C238',
    },
    subtitleText2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F2C238',
    },
    elements: {
        marginTop: '2%'
    }
});
