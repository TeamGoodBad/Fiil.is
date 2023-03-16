import { StyleSheet } from 'react-native';

/**
 * Style, which takes care of the biggest container / view
 * @returns style, which should be used as the base
 */
export const getStyle = () => StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
});