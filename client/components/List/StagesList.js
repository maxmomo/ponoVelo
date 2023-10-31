import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { commonStyles } from '../../styles/GlobalStyles';
import RaceLogo from '../Basic/RaceLogo';

const logo_montain = require('../../assets/flat.png');

export default function StagesList(props) {

    const ListItem = ({ item, index }) => (
        <View style={commonStyles.listView}>
            <View style={[commonStyles.flex1]}>
                <Text style={commonStyles.text13}>{index + 1}</Text>
            </View>
            <View style={[commonStyles.flex5]}>
                <Text style={commonStyles.text13}>{item.departure}</Text>
            </View>
            <View style={[commonStyles.flex5]}>
                <Text style={commonStyles.text13}>{item.arrival}</Text>
            </View>

            <View style={[commonStyles.flex2]}>
                <RaceLogo source={logo_montain} height={40} width={40} />
            </View>
        </View>
    )

    return (
        <View>
            <FlatList
                data={props.stages}
                renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}
