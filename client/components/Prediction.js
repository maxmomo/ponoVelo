import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';

import Portrait from './Basic/Portrait';
import { commonStyles } from '../styles/GlobalStyles';

const screenWidth = Dimensions.get('window').width;

export default function MyTeam(props) {

    const itemWidth = screenWidth / props.riders.length;

    const renderRiders = ({ item, index }) => (
        <View style={[{width: itemWidth}]}>   
            <View style={commonStyles.flex1}>
                <Portrait picture={item.rider_picture} width={100} height={100} />
            </View>
            <View style={[commonStyles.center, commonStyles.flex1]}>
                <Text style={[commonStyles.text14, commonStyles.center]}>{item.rider_first_name}</Text>
            </View>
            <View style={[commonStyles.center, commonStyles.flex1]}>
                <Text style={[commonStyles.text14, commonStyles.center]}>{item.rider_name}</Text>
            </View>
        </View>
    );

    return (
            <View style={[commonStyles.containerLight]}>
                {props.riders && 
                <FlatList
                    data={props.riders}
                    horizontal
                    renderItem={renderRiders}
                    keyExtractor={item => item.rider_id.toString()}
                    scrollEnabled={false}
                />}
            </View>
    );
}