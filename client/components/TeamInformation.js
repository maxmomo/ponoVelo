import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import AppLink from 'react-native-app-link';
import { FontAwesome } from '@expo/vector-icons'

export default function TeamInformation(props) {

    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.element}>
                    <Text style={styles.textElement}>Année :</Text>
                    <Text style={styles.textElementValue}>{props.team.year}</Text>
                </View>
                <View style={styles.element}>
                    <Text style={styles.textElement}>Abreviation :</Text>
                    <Text style={styles.textElementValue}>{props.team.abbreviation}</Text>
                </View>
                <View style={styles.element}>
                    <Text style={styles.textElement}>Statut :</Text>
                    <Text style={styles.textElementValue}>{props.team.status}</Text>
                </View>
                <View style={styles.element}>
                    <Text style={styles.textElement}>Vélo :</Text>
                    <Text style={styles.textElementValue}>{props.team.bike}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                {props.team.twitter && <TouchableOpacity onPress={() => openURL(props.team.twitter)}>
                    <FontAwesome name="twitter" size={24} color="#E4E9F2" style={styles.icon} />
                </TouchableOpacity>}
                {props.team.facebook && <TouchableOpacity onPress={() => openURL(props.team.facebook)}>
                    <FontAwesome name="facebook" size={24} color="#E4E9F2" style={styles.icon} />
                </TouchableOpacity>}
                {props.team.instagram && <TouchableOpacity onPress={() => openURL(props.team.instagram)}>
                    <FontAwesome name="instagram" size={24} color="#E4E9F2" style={styles.icon} />
                </TouchableOpacity>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: '1%'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    rightContainer:  {
        flex: 1,
        justifyContent: 'space-between',
    },
    element: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: '1%',
        marginBottom: '2%'
    },
    textElement: {
        color: '#E4E9F2',
        fontSize: 13,
        marginRight: '1%'
    },
    textElementValue: {
        color: '#E4E9F2',
        fontWeight: 'bold',
        fontSize: 13,
        marginRight: '1%'
    },
    icon: {
        marginLeft: '5%',
        marginBottom: '3%'
    }
});