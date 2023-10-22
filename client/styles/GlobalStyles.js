import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    containerLight: {
        flex: 1,
        backgroundColor: colors.backgroundLight
    },
    text12: {
        color: colors.whiteText,
        fontSize: 12
    },
    text13: {
        color: colors.whiteText,
        fontSize: 13
    },
    text14: {
        color: colors.whiteText,
        fontSize: 14
    },
    text16: {
        color: colors.whiteText,
        fontSize: 16
    },
    text18: {
        color: colors.whiteText,
        fontSize: 18
    },
    text20: {
        color: colors.whiteText,
        fontSize: 20
    },
    text21: {
        color: colors.whiteText,
        fontSize: 21
    },
    text22: {
        color: colors.whiteText,
        fontSize: 22
    },
    text23: {
        color: colors.whiteText,
        fontSize: 23
    },
    text24: {
        color: colors.whiteText,
        fontSize: 24
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
    bold: {
        fontWeight: 'bold',
    },  
    margin2Top: {
        marginTop: '2%'
    },
    margin5Top: {
        marginTop: '5%'
    },
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    flex3: {
        flex: 3
    },
    flex4: {
        flex: 4
    },
    flex5: {
        flex: 5
    },
    row: {
        flexDirection: 'row'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerVertical: {
        justifyContent: 'center'
    },
    padding1: {
        padding: '1%'
    },
    listView: {
        padding: '1%',
        borderBottomColor: '#E4E9F2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

const modalStyles = StyleSheet.create({
    modalView: {
        backgroundColor: colors.backgroundLight,
        borderWidth: 2,
        borderColor: colors.whiteText,
        borderRadius: 10,
        marginTop: '23%',
        padding: '5%',
    },
    titleView: {
        marginTop: '2%',
        alignItems: 'center'
    },
});


const textStyles = StyleSheet.create({
    headerText: {
        fontSize: 32,
        fontWeight: '600',
    },
    bodyText: {
        fontSize: 18,
    },
    // ... d'autres styles de texte
});

export { commonStyles, modalStyles };