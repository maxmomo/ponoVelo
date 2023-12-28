import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';

import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

export default function UsersList(props) {

    const ListItem = ({ item, index }) => (
        <View style={[commonStyles.row, commonStyles.alignCenter]}>
            <View style={[commonStyles.margin2]}>
                <Avatar
                    size='medium'
                    rounded
                    source={{ uri: item.avatar ? `data:image/jpeg;base64,${item.avatar}` : null }}
                    overlayContainerStyle={{borderWidth: 2, borderColor: colors.whiteText}}
                />
            </View>
            <View style={[]}>
                <Text style={commonStyles.text16}>{item.userName}</Text>
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
