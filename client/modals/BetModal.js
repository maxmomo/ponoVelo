import React, { useState, useEffect } from 'react';
import { View, Text, Modal, FlatList, StyleSheet, TouchableOpacity, Dimensions   } from 'react-native';

import BasicButton from '../components/Basic/BasicButton';
import Jersey from '../components/Basic/Jersey';
import Portrait from '../components/Basic/Portrait';

import { commonStyles, modalStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';


const screenWidth = Dimensions.get('window').width;
const ITEM_COUNT = 11;
const ITEM_COUNT_3 = 3;
const JERSEY_COUNT = 4;

export default function BetModal(props) {

    const [selected, setSelected] = useState(1)
    const [selectedTeam, setSelectedTeam] = useState({})
    const [selectedRider, setSelectedRider] = useState({})
    const [itemWidth, setItemWidth] = useState(0)
    const [jerseyWidth, setJerseyWidth] = useState(0)
    const [riders, setRiders] = useState([])
    const [teams, setTeams] = useState([])
    const [numbers, setNumbers] = useState([])
    
    useEffect(() => {
        if (props.betTypeId === 1) {
            setItemWidth(screenWidth / ITEM_COUNT);
            setNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        } else {
            setItemWidth(screenWidth / ITEM_COUNT_3);
            setNumbers([1, 2, 3])
        }
        
        setJerseyWidth(screenWidth / JERSEY_COUNT);
        const teamsData = props.startlist.map(team => {
            return { title: team.title, team_nationality: team.team_nationality, team_jersey: team.team_jersey, team_id: team.team_id };
        });
        setTeams(teamsData)
        const ridersData = props.startlist.reduce((acc, team) => {
            return acc.concat(team.data);
        }, []);
        setRiders(ridersData)
    }, [props.startlist, props.betTypeId]);

    const handleSelect = (item, index) => {
        setSelected(item);
    };

    const handleSelectTeam = (item, index) => {
        setSelectedTeam(item);
        ridersData = props.startlist.reduce((acc, team) => {
            if (team.team_id === item.team_id) {
                return acc.concat(team.data);
            }
            return acc
        }, []);
        setRiders(ridersData)
        setSelectedRider({})
    };

    const handleSelectRider = (item, index) => {
        setSelectedRider(item);
        props.setRiderId(item.rider_id)
        props.setPosition(selected)
    };

    const onPressValidate = () => {
        setSelectedRider({})
        setSelected(1)
        setSelectedTeam({})
        props.onPress()
    };

    const renderPositions = ({ item, index }) => (
        <TouchableOpacity
            style={[commonStyles.flex1, { width: itemWidth }, commonStyles.center]}
            onPress={() => handleSelect(item, index)}
        >
            <Text style={[commonStyles.text24, item === selected ? styles.selectedItem : null]}>{item}</Text>
        </TouchableOpacity>
    );

    const renderTeams = ({ item, index }) => (
        <TouchableOpacity
            style={[
                commonStyles.flex1, 
                { width: jerseyWidth }, 
                item.title === selectedTeam.title ? styles.selectedTeam : styles.defaultTeam
            ]}
            onPress={() => handleSelectTeam(item, index)}
        >   
            <View style={{height: '60%'}}>
                <Jersey jersey={item.team_jersey} width={100} height={100} style={item.title === selectedTeam.title ? null : styles.darkerJersey}/>
            </View>
            <View style={[commonStyles.center]}>
                <Text style={[commonStyles.text14, commonStyles.center]}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderRiders = ({ item, index }) => (
        <TouchableOpacity
            style={[
                commonStyles.flex1, 
                { width: jerseyWidth }, 
                item.rider_id === selectedRider.rider_id ? styles.selectedTeam : styles.defaultTeam
            ]}
            onPress={() => handleSelectRider(item, index)}
        >   
            <View style={{height: '60%'}}>
                <Portrait picture={item.rider_picture} width={100} height={100} style={item.rider_id === selectedTeam.rider_id ? null : styles.darkerJersey}/>
            </View>
            <View style={[commonStyles.center]}>
                <Text style={[commonStyles.text14, commonStyles.center]}>{item.rider_name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={props.toggleModal}>
            <View style={[modalStyles.modalView, commonStyles.flex1]}>
                <View style={[commonStyles.margin2Top, commonStyles.center]}>
                    <Text style={commonStyles.text20}>Parier</Text>
                </View>
                <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                    <FlatList
                        data={numbers}
                        horizontal
                        renderItem={renderPositions}
                        keyExtractor={item => item.toString()}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                </View>
                {teams && <View style={[commonStyles.margin2Top, commonStyles.flex4]}>
                    <FlatList
                        data={teams}
                        horizontal
                        renderItem={renderTeams}
                        keyExtractor={item => item.title}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>}
                {riders && <View style={[commonStyles.margin2Top, commonStyles.flex4]}>
                    <FlatList
                        data={riders}
                        horizontal
                        renderItem={renderRiders}
                        keyExtractor={item => item.rider_id.toString()}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>}
                <View style={[commonStyles.margin2Top, commonStyles.center, , commonStyles.flex2]}>
                    <BasicButton text={'Valider'} onPress={onPressValidate} />
                    <BasicButton text={'Annuler'} onPress={props.toggleModal}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    selectedItem: {
        color: colors.theme
    },
    text: {
        fontSize: 32,
    },
    defaultTeam: {
        opacity: 0.3 // Rend le maillot plus sombre
    },
    darkerJersey: {
        opacity: 0.3 // Alternative: appliquer directement à l'élément Jersey
    },
    selectedTeam: {
        opacity: 1 // Opacité normale pour le maillot sélectionné
    },
});