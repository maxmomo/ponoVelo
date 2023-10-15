import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useMyContext } from '../../context/MyContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

function Header({ navigation }) {

    const { state, dispatch } = useMyContext();

    if (navigation) {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                    <MaterialCommunityIcons name='arrow-left' size={30} color='#F2C238' />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Image source={require('../../assets/header.png')} style={styles.logo} />
                </View>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name='account-circle' size={30} color='#F2C238' />
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name='arrow-left' size={30} color='#21222D' />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Image source={require('../../assets/header.png')} style={styles.logo} />
                </View>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name='account-circle' size={30} color='#F2C238' />
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
        color: '#F2C238',
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