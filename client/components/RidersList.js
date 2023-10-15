import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Flag from 'react-native-flags';

export default function RidersList(props) {

    const getPointsStyle = (points) => {
        if (points >= 70 && points < 80) {
            return styles.greenText;
        } else if (points >= 80 && points < 90) {
            return styles.orangeText;
        } else if (points >= 90) {
            return styles.redText;
        } else {
            return styles.defaultText;
        }
    };

    return (
        <View>
            <View style={styles.headerRow}>
                <View style={styles.flagListView}>
                </View>
                <View style={styles.nameListView}>
                </View>
                <View style={styles.dataListView}>
                    <Text style={styles.headerText}>ODR</Text>
                </View>
                <View style={styles.dataListView}>
                    <Text style={styles.headerText}>GC</Text>
                </View>
                <View style={styles.dataListView}>
                    <Text style={styles.headerText}>TT</Text>
                </View>
                <View style={styles.dataListView}>
                    <Text style={styles.headerText}>SP</Text>
                </View>
                <View style={styles.dataListView}>
                    <Text style={styles.headerText}>MO</Text>
                </View>
            </View>
            <View>
                {props.riders && props.riders.map((rider, index) => (
                    <View key={index} style={styles.riderItem}>
                        <View style={styles.flagListView}>
                            <Flag code={rider.nationality} size={24} type={'flat'}/>
                        </View>
                        <View style={styles.nameListView}>
                            <Text style={styles.listElement}>{rider.name}</Text>
                        </View>
                        <View style={styles.dataListView}>
                            <Text style={[styles.listElement, getPointsStyle(rider.odr_points)]}>{rider.odr_points}</Text>
                        </View>
                        <View style={styles.dataListView}>
                            <Text style={[styles.listElement, getPointsStyle(rider.gc_points)]}>{rider.gc_points}</Text>
                        </View>
                        <View style={styles.dataListView}>
                            <Text style={[styles.listElement, getPointsStyle(rider.tt_points)]}>{rider.tt_points}</Text>
                        </View>
                        <View style={styles.dataListView}>
                            <Text style={[styles.listElement, getPointsStyle(rider.sprint_points)]}>{rider.sprint_points}</Text>
                        </View>
                        <View style={styles.dataListView}>
                            <Text style={[styles.listElement, getPointsStyle(rider.climb_points)]}>{rider.climb_points}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E4E9F2',
        borderBottomWidth: 1,
    },
    flagListView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#E4E9F2',
        fontSize: 11,
        fontWeight: 'bold',
    },
    nameListView: {
        flex: 4,
        justifyContent: 'center',
    },
    dataListView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    riderItem: {
        padding: '1%',
        borderBottomColor: '#E4E9F2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    listElement: {
        color: '#E4E9F2',
        fontSize: 13,
    },
    greenText: {
        color: 'green',
    },
    orangeText: {
        color: 'orange',
    },
    redText: {
        color: 'red',
    },
    defaultText: {
        color: '#E4E9F2',
    },
});