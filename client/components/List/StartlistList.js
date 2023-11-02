import React from 'react';
import { View, Text, FlatList, SectionList } from 'react-native';
import Flag from 'react-native-flags';

import { commonStyles } from '../../styles/GlobalStyles';

export default function StartlistList(props) {

    const teams = props.startlist.reduce((acc, rider) => {
        const { team_name, team_id, team_nationality } = rider;
        if (!acc[team_id]) {
            acc[team_id] = {
                team_name,
                team_nationality,
                team_id,
                riders: [],
            };
        }
        acc[team_id].riders.push(rider);
        return acc;
    }, {});

    const teamSections = Object.keys(teams).map(key => ({
        title: teams[key].team_name,
        data: teams[key].riders,
        team_nationality: teams[key].team_nationality,
    }));

    const renderRider = ({ item }) => (
        <View style={commonStyles.startlistView}>
            <View>
                <Flag code={item.rider_nationality} size={24} type={'flat'}/>
            </View>
            <View style={commonStyles.margin2Left}>
                <Text style={commonStyles.text13}>{item.rider_name}</Text>
            </View>
        </View>
    );

    const renderSectionHeader = ({ section }) => (
        <View style={commonStyles.listView}>
            <View>
                <Flag code={section.team_nationality} size={24} type={'flat'}/>
            </View>
            <View style={commonStyles.margin2Left}>
                <Text style={commonStyles.text16}>{section.title}</Text>
            </View>
        </View>
    );

    return (
        <View style={commonStyles.flex1}>
            <SectionList
                sections={teamSections}
                keyExtractor={(item, index) => item + index}
                renderItem={renderRider}
                renderSectionHeader={renderSectionHeader}
                numColumns={2}
            />
        </View>
    );
}
