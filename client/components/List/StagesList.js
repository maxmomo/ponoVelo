import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { commonStyles } from '../../styles/GlobalStyles';
import RaceLogo from '../Basic/RaceLogo';

const logo_montain = require('../../assets/montain.png');
const logo_flat = require('../../assets/flat.png');
const logo_hilly = require('../../assets/hilly.png');

export default function StagesList(props) {

    const ListItem = ({ item, index }) => (
        <View style={commonStyles.listView}>
            <View style={[commonStyles.flex1]}>
                <Text style={commonStyles.text14}>{index + 1}</Text>
            </View>
            <View style={[commonStyles.flex5]}>
                <Text style={commonStyles.text14}>{item.departure}</Text>
            </View>
            <View style={[commonStyles.flex5]}>
                <Text style={commonStyles.text14}>{item.arrival}</Text>
            </View>
            {/* <View style={[commonStyles.flex2]}>
               {item.profile_icone === 'p1' && <RaceLogo source={logo_flat} height={40} width={40} />}
               {(item.profile_icone === 'p2' || item.profile_icone === 'p3') && <RaceLogo source={logo_hilly} height={40} width={40} />}
               {(item.profile_icone === 'p4' || item.profile_icone === 'p5') && <RaceLogo source={logo_montain} height={40} width={40} />}
            </View> */}
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
