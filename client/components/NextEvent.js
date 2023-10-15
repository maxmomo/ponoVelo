import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import RaceLogo from './Basic/RaceLogo';
import { commonStyles } from '../styles/GlobalStyles';
const logo_vuelta = require('../assets/logo-vuelta.png');
const logo_tdf = require('../assets/logo-tdf.png');
const logo_giro = require('../assets/logo-giro.png');

export default function NextEvent(props) {

    let source = null

    if (props.race_name === 'Tour de France') {
        source = logo_tdf
    } else if (props.race_name === 'La Vuelta ciclista a España') {
        source = logo_vuelta
    } else if (props.race_name === 'Giro d\'Italia') {
        source = logo_giro
    } else {
        source = logo_tdf
    }
    return (
        <TouchableOpacity style={commonStyles.center}>
            <RaceLogo width={150} height={150} source={source} />
            <Text style={commonStyles.text16}>{props.stage_name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imageView: {
        alignItems: 'center'
    }
});