import React from 'react';
import { View, Text, FlatList } from 'react-native';

import Portrait from '../components/Basic/Portrait';
import { commonStyles } from '../styles/GlobalStyles';

export default function MyTeam(props) {

    const renderRiders = ({ item, index }) => (
        <View>   
            <View style={commonStyles.flex1}>
                <Portrait picture={item.rider_picture} width={100} height={100} />
            </View>
            <View style={[commonStyles.center, commonStyles.flex1]}>
                <Text style={[commonStyles.text14, commonStyles.center]}>{item.rider_firstname}</Text>
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
                    showsHorizontalScrollIndicator={false}
                />}
            </View>
    );
}