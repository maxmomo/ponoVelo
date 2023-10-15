import React from 'react';
import { TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';


export default function CardLeagues(props) {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => props.onPress(item)}>
                <Text style={commonStyles.text16}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={props.leagues}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={1}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundLight,
        padding: '3%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.theme,
        marginBottom: '2%',
        marginHorizontal: '1%'
    }
});