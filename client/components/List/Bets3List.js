import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Flag from 'react-native-flags';
import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

export default function Bets3List(props) {

    let bets = []

    if (props.betTypeId === 2) {
        bets = props.bets.filter(bet => bet.type_id === 2);
    } else if (props.betTypeId === 3) {
        bets = props.bets.filter(bet => bet.type_id === 3);
    } else if (props.betTypeId === 4) {
        bets = props.bets.filter(bet => bet.type_id === 4);
    }

    const renderNameForPosition = (position) => {
        const bet = bets.find(bet => bet.position === position);
        return bet ? [bet.fullName, bet.nationality, bet.is_boost] : ['', false];
    }

    return (
        <TouchableOpacity style={[commonStyles.flex1, commonStyles.padding2, commonStyles.roundyellow, commonStyles.margin1]} onPress={props.onPress}>
            <View style={[commonStyles.center, commonStyles.margin1Bottom]}>
                <Text style={[commonStyles.text16, commonStyles.bold]}>{props.type}</Text>
            </View>
            <View style={[commonStyles.row, commonStyles.flex1]}>
                <View style={[commonStyles.padding1, commonStyles.spaceBetween]}>
                    {[1, 2, 3].map((position) => (
                        <Text key={position} style={commonStyles.text13}>{position}</Text>
                    ))}
                </View>
                <View style={[commonStyles.padding1, commonStyles.spaceBetween]}>
                    {[1, 2, 3].map((position) => (
                        <View key={position} style={[commonStyles.row]} >
                            {renderNameForPosition(position)[1] && <Flag code={renderNameForPosition(position)[1]} size={16} type={'flat'}/>}
                            <Text key={position} style={[commonStyles.text13, commonStyles.margin2Left, renderNameForPosition(position)[2] ? { color: colors.theme } : {}]}>
                                {renderNameForPosition(position)[0]}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
}