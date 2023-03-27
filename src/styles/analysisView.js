import { StyleSheet } from 'react-native';
import { getStyle } from './baseStyle';

const basestyle = getStyle();

export const getStyles = (theme) => StyleSheet.create({
    ...basestyle,
    containerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipContainer: {
        flex: 7,
        overflow: 'scroll',
        rowGap: 10,
        padding: "5%",
    }
});