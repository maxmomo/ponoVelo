import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import BasicSubtitleView from '../components/Basic/BasicSubtitleView'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function ProfileMenuPage() {

    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const onPressDisconnect = () => {
        dispatch({ type: 'SET_USERNAME', payload: '' });
        dispatch({ type: 'SET_TEAM', payload: '' });
        dispatch({ type: 'SET_STATISTICS', payload: [] });
        dispatch({ type: 'SET_RACE_STATISTIC', payload: '' });
        dispatch({ type: 'SET_LEAGUE', payload: '' });
        dispatch({ type: 'SET_NEXT_RACE', payload: {} });
        dispatch({ type: 'SET_RACE', payload: {} });
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} is_profile={true} />
            <BasicSubtitleView text={'Profil'} />
            <View>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={() => {/* Handle password change */}}>
                    <Text style={commonStyles.text18}>Modifier mon mot de passe</Text>
                    <MaterialCommunityIcons name='arrow-right' size={24} color={colors.theme} />
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={() => {/* Handle email change */}}>
                    <Text style={commonStyles.text18}>Modifier mon adresse mail</Text>
                    <MaterialCommunityIcons name='arrow-right' size={24} color={colors.theme} />
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={() => {/* Handle username change */}}>
                    <Text style={commonStyles.text18}>Modifier mon nom d'utilisateur</Text>
                    <MaterialCommunityIcons name='arrow-right' size={24} color={colors.theme} />
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={onPressDisconnect}>
                    <Text style={[commonStyles.text18, commonStyles.colorRed]}>Déconnexion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={() => {/* Handle account deletion */}}>
                    <Text style={[commonStyles.text18, commonStyles.colorRed]}>Supprimer mon compte</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}