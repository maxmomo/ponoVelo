import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function TeamInformation(props) {

    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error('Erreur lors du chargement', err));
    };

    return (
        <View style={[commonStyles.flex1, commonStyles.row, commonStyles.margin2Left]}>
            <View style={commonStyles.flex1}>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text14}>Catégorie : </Text>
                    <Text style={[commonStyles.text14, commonStyles.bold]}>{props.race.category}</Text>
                </View>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text14}>Date de départ : </Text>
                    <Text style={[commonStyles.text14, commonStyles.bold]}>{props.race.race_start_date}</Text>
                </View>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text14}>Date d'arrivée : </Text>
                    <Text style={[commonStyles.text14, commonStyles.bold]}>{props.race.race_end_date}</Text>
                </View>
            </View>
        </View>
    );
}