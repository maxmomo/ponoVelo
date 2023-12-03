import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Flag from 'react-native-flags';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

export default function RidersOfferList(props) {
    const toggleModalList = () => {
        if (!props.isLoading) {
            if (props.rider.offer) {
                props.setOffer(props.rider.offer.toString()) 
            } else {
                props.setOffer(props.rider.cost.toString())
            }
            props.setRider(props.rider)
            props.toggleModal();
        }
    };

    return (
        <View style={styles.riderItem}>
            <View style={styles.flagListView}>
                <Flag code={props.rider.nationality} size={24} type={'flat'}/>
            </View>
            <View style={styles.nameListView}>
                <Text style={styles.listElement}>{props.rider.rider_name}</Text>
            </View>
            <View style={styles.teamListView}>
                <Text style={styles.listElement}>{props.rider.team_abbreviation}</Text>
            </View>
            <View style={styles.dataListView}>
                <Text style={styles.listElement}>{props.rider.cost}</Text>
            </View>
            <View style={styles.dataListView}>
                <Text style={styles.listElement}>{props.rider.offer}</Text>
            </View>
            {props.state && props.rider.state === 0 && 
            <View style={styles.dataListView}>
                <MaterialCommunityIcons name='sync' size={24} color={colors.orange} />
            </View>}
            {props.state && props.rider.state === 1 && 
            <View style={styles.dataListView}>
                <MaterialCommunityIcons name='check-bold' size={24} color={colors.green} />
            </View>}
            {props.state && props.rider.state === 2 && 
            <View style={styles.dataListView}>
                <MaterialCommunityIcons name='close' size={24} color={colors.red} />
            </View>}
            {props.toggleModal && <TouchableOpacity onPress={toggleModalList} disabled={props.isLoading}>
                <MaterialCommunityIcons name='plus' size={30} color={colors.theme} /> 
            </TouchableOpacity>}
            {props.toggleModal && props.rider.offer && <TouchableOpacity onPress={props.onPressDelete} disabled={props.isLoading}>
                <MaterialCommunityIcons name='delete-circle' size={30} color={colors.red} /> 
            </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    flagListView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameListView: {
        flex: 10,
        justifyContent: 'center',
    },
    teamListView: {
        flex: 4,
        justifyContent: 'center',
    },
    dataListView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    riderItem: {
        padding: '1%',
        borderBottomColor: colors.whiteText,
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginHorizontal: '2%',
    },
    listElement: {
        color: '#E4E9F2',
        fontSize: 13,
    },
});