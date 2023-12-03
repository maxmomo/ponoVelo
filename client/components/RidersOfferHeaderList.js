import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../constants/colors';
import { commonStyles } from '../styles/GlobalStyles';

export default function RidersOfferHeaderList(props) {
    
    return (
        <View style={styles.riderItem}>
            <View style={styles.flagListView} />
            <View style={styles.nameListView} />
            <View style={styles.teamListView} />
            <View style={styles.dataListView}>
                <Text style={commonStyles.text14}>Coût</Text>
            </View>
            {props.title === 'Mes offres' && <View style={styles.dataListView}>
                <Text style={styles.listHeaderElement}>Offre</Text>
            </View> || <View style={styles.dataListView}/>}
            {props.state && <View style={styles.dataListView}>
                <Text style={styles.listHeaderElement}>Etat</Text>
            </View>}
            {props.modify && props.title === 'Mes offres' && <MaterialCommunityIcons name='plus' size={30} color={colors.background} />}
            {props.modify && <MaterialCommunityIcons name='plus' size={30} color={colors.background} />}
        </View>
    );
}

const styles = StyleSheet.create({
    riderItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.whiteText,
        marginHorizontal: '1%',
        paddingBottom: '1%'
    },
    flagListView: {
        flex: 2,
    },
    nameListView: {
        flex: 10,
    },
    teamListView: {
        flex: 4,
    },
    dataListView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listHeaderElement: {
        color: '#E4E9F2',
        fontSize: 13,
    }
});