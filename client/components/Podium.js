import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { commonStyles } from '../styles/GlobalStyles';
import Flag from 'react-native-flags';

export default function Podium(props) {

    let bets = []

    if (props.type === 'Classement par point') {
        bets = props.bets.filter(bet => bet.type_id === 1);
    } else if (props.type === 'Classement montagne') {
        bets = props.bets.filter(bet => bet.type_id === 2);
    } else if (props.type === 'Classement jeune') {
        bets = props.bets.filter(bet => bet.type_id === 3);
    }

    const firstPlace = bets.find(bet => bet.position === 1);
    const secondPlace = bets.find(bet => bet.position === 2);
    const thirdPlace = bets.find(bet => bet.position === 3);

    return (
        <TouchableOpacity style={[commonStyles.flex1, commonStyles.padding1, commonStyles.roundyellow, commonStyles.margin1]} onPress={props.onPress}>
            <View style={[commonStyles.center, commonStyles.margin1Bottom]}>
                <Text style={[commonStyles.text16, commonStyles.bold]}>{props.type}</Text>
            </View>
            <View style={[commonStyles.row, commonStyles.flex1, commonStyles.margin2]}>
                <View style={[commonStyles.column, commonStyles.flex1]}>
                    <View style={[commonStyles.flex1, commonStyles.center, commonStyles.padding1]}>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5} style={commonStyles.text13}>{secondPlace ? secondPlace.firstName : ''}</Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5} style={commonStyles.text13}>{secondPlace ? secondPlace.name : ''}</Text>
                    </View>
                    <View style={[commonStyles.flex1, commonStyles.colorWhite, commonStyles.center]}>
                        {secondPlace && <Flag code={secondPlace.nationality} size={24} type={'flat'}/>}
                        <Text style={[commonStyles.text20Inv, commonStyles.bold]}>2</Text>
                    </View>
                </View>
                <View style={[commonStyles.column, commonStyles.flex1]}>
                    <View style={[commonStyles.flex2, commonStyles.center, commonStyles.padding1]}>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5} style={commonStyles.text13}>{firstPlace ? firstPlace.firstName : ''}</Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5} style={commonStyles.text13}>{firstPlace ? firstPlace.name : ''}</Text>
                    </View>
                    <View style={[commonStyles.flex3, commonStyles.colorWhite, commonStyles.center]}>
                        {firstPlace && <Flag code={firstPlace.nationality} size={24} type={'flat'}/>}
                        <Text style={[commonStyles.text20Inv, commonStyles.bold]}>1</Text>
                    </View> 
                </View>
                <View style={[commonStyles.column, commonStyles.flex1]}>
                    <View style={[commonStyles.flex3, commonStyles.center, commonStyles.padding1]}>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5}  style={commonStyles.text12}>{thirdPlace ? thirdPlace.firstName : ''}</Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5}  style={commonStyles.text12}>{thirdPlace ? thirdPlace.name : ''}</Text>
                    </View>
                    <View style={[commonStyles.flex2, commonStyles.colorWhite, commonStyles.center]}>
                        {thirdPlace && <Flag code={thirdPlace.nationality} size={24} type={'flat'}/>}
                        <Text style={[commonStyles.text20Inv, commonStyles.bold]}>3</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
}