import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { commonStyles } from '../../styles/GlobalStyles';

export default function UsersList(props) {

    const ListItem = ({ item, index }) => (
        <View style={commonStyles.listView}>
            <View style={[commonStyles.flex5]}>
                <Text style={commonStyles.text14}>{item.userName}</Text>
            </View>
        </View>
    )

    return (
        <View>
            <FlatList
                data={props.users}
                renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}
