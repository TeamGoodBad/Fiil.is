import { StyleSheet } from 'react-native';

/**
 * Style, which takes care of the biggest container / view
 * @returns style, which should be used as the base
 */
export const getStyle = () => StyleSheet.create({
    base: {
        flex: 1,
        /* marginTop: 20, */
    },
    starsContainer: {
        flex: 1,
        minHeight: 20,
      },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
});