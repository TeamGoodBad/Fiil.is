import { StyleSheet } from 'react-native';
import { getStyle } from './baseStyle';


export const getStyles = (theme) => StyleSheet.create({
    base: getStyle().container,
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipContainer: {
        overflow: 'scroll',
        flexDirection: 'column',
        rowGap: 10,
        padding: '5%',
    }
});