import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { useMyContext } from '../context/MyContext';

import BasicButton from '../components/Basic/BasicButton';

import { commonStyles, modalStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';
import ResultsStageSubPage from '../SubPage/Stages/ResultsStageSubPage';
import StageBet from '../components/StageBet';
import RaceBet from '../components/RaceBet';

export default function RankingInformationModal(props) {
    const { state, dispatch } = useMyContext();

    user_id = state['user_selected']['id']

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={props.toggleModal}>
            <View style={[modalStyles.modalView]}>
                {props.type === 'stage' && <StageBet user_id={user_id} readonly={true} />}
                {props.type === 'race' && <RaceBet user_id={user_id} readonly={true} />}
                <View style={[commonStyles.margin2Top, {alignItems: 'center'}]}>
                    <BasicButton text={'Fermer'} onPress={props.toggleModal}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    statView: {
        justifyContent: 'space-between'
    }
});