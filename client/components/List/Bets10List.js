import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';

export default function Bets10List(props) {

    console.log(props.bets)

    const ListItem = ({ item }) => (
        <View style={[commonStyles.row, commonStyles.padding1]}>
            <View style={commonStyles.flex2}>
                <Text style={commonStyles.text13}>{item.position}</Text>
            </View>
            <View style={commonStyles.flex5}>
                <Text style={commonStyles.text13}>{item.name}</Text>
            </View>
        </View>
    )

    return (
        <FlatList
            data={props.bets}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={item => item.id}
        />
    );
}