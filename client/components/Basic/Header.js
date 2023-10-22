import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

function Header({ navigation }) {

    if (navigation) {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                    <MaterialCommunityIcons name='arrow-left' size={30} color={colors.theme} />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Image source={require('../../assets/header.png')} style={styles.logo} />
                </View>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name='account-circle' size={30} color={colors.theme} />
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name='arrow-left' size={30} color={colors.backgroundLight} />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Image source={require('../../assets/header.png')} style={styles.logo} />
                </View>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name='account-circle' size={30} color={colors.theme} />
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        height: '10%',
        alignItems: 'center',
        backgroundColor: colors.backgroundLight,
        flexDirection: 'row'
    },
    icon: {
        color: colors.theme,
        flex: 1,
        alignItems: 'center'
    },
    title: {
        flex: 4,
        alignItems: 'center',
    },
    logo: {
        width: '60%',
        resizeMode: 'contain',
    },
});

export default Header;