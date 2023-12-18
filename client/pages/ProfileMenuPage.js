import React, {useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import Header from '../components/Basic/Header';
import BasicSubtitleView from '../components/Basic/BasicSubtitleView'

import { setAvatarUser } from '../api/user/api';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function ProfileMenuPage() {

    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();
    const [avatarSource, setAvatarSource] = useState(null);

    const user_id = state['user']['id']
    const user = state['user']

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Désolé, nous avons besoin des permissions de la bibliothèque de photos pour que cela fonctionne!');
            }
        })();
    }, []);

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
            });

            if (!result.cancelled) {
                console.log(result)
                await setAvatarUser(state['ip_adress'], user_id, result.uri)
            }
        } catch (error) {
            console.error(error);
        }
    };
      
      

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
                <View>
                    <Avatar
                        size="large"
                        rounded
                        source={user['avatar']}
                        onPress={selectImage}
                        activeOpacity={0.7}
                        avatarStyle={{borderColor: 'green'}}
                    />
                </View>
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