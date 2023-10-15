import React from 'react';
import { View, Text, Modal } from 'react-native';

import BasicTextInput from '../components/Basic/BasicTextInput';
import BasicButton from '../components/Basic/BasicButton';

import { commonStyles, modalStyles } from '../styles/GlobalStyles';

export default function JoinLeagueModal(props) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={props.toggleModal}>
            <View style={modalStyles.modalView}>
                <View style={[commonStyles.margin2Top, {alignItems: 'center'}]}>
                    <Text style={commonStyles.text20}>Saisir les identifiants de la ligue</Text>
                </View>
                <View style={commonStyles.margin2Top}>
                    <BasicTextInput value={props.name} onChangeText={props.setName} placeholder={'Nom'} secureTextEntry={false} />
                    <BasicTextInput type={'visible-password'} value={props.password} onChangeText={props.setPassword} placeholder={'Mot de passe'} secureTextEntry={false} />
                </View>
                <View style={[commonStyles.margin2Top, {alignItems: 'center'}]}>
                    <BasicButton text={'Rejoindre'} onPress={props.onPressCreate} />
                    <BasicButton text={'Annuler'} onPress={props.toggleModal}/>
                </View>
            </View>
        </Modal>
    );
}