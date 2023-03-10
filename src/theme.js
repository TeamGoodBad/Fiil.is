import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

export const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: "rgb(0, 103, 126)",
        onPrimary: "rgb(255, 255, 255)",
        primaryContainer: "rgb(181, 235, 255)",
        onPrimaryContainer: "rgb(0, 31, 40)",
        secondary: "rgb(76, 98, 106)",
        onSecondary: "rgb(255, 255, 255)",
        secondaryContainer: "rgb(207, 230, 240)", // tab boksin valintaväri
        onSecondaryContainer: "rgb(7, 30, 38)", // tab boxin valitun iconin väri
        tertiary: "rgb(89, 92, 126)",
        onTertiary: "rgb(255, 255, 255)",
        tertiaryContainer: "rgb(224, 224, 255)",
        onTertiaryContainer: "rgb(22, 25, 55)",
        error: "rgb(186, 26, 26)",
        onError: "rgb(255, 255, 255)",
        errorContainer: "rgb(255, 218, 214)",
        onErrorContainer: "rgb(65, 0, 2)",
        background: "rgb(251, 252, 254)", // perus taustaväri
        onBackground: "rgb(25, 28, 29)",
        surface: "rgb(251, 252, 254)",
        onSurface: "rgb(25, 28, 29)", // perus tekstin väri
        surfaceVariant: "rgb(219, 228, 232)", // text inputin tausta
        onSurfaceVariant: "rgb(64, 72, 76)", // tab boxin valitsemattomat iconit
        outline: "rgb(112, 120, 124)",
        outlineVariant: "rgb(191, 200, 204)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(46, 49, 50)",
        inverseOnSurface: "rgb(239, 241, 242)",
        inversePrimary: "rgb(91, 213, 250)",
        elevation: {
            level0: "transparent",
            level1: "rgb(238, 245, 248)",
            level2: "rgb(231, 240, 244)", // tab boxin tausta
            level3: "rgb(223, 236, 240)",
            level4: "rgb(221, 234, 239)",
            level5: "rgb(216, 231, 236)"
      },
      surfaceDisabled: "rgba(25, 28, 29, 0.12)",
      onSurfaceDisabled: "rgba(25, 28, 29, 0.38)",
      backdrop: "rgba(41, 50, 53, 0.4)"
    },
};

export const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...NavigationDarkTheme.colors,
        primary: "rgb(91, 213, 250)", // mm. contained napin väri
        onPrimary: "rgb(0, 53, 67)", // mm. contained napin tekstin väri
        primaryContainer: "rgb(0, 78, 96)",
        onPrimaryContainer: "rgb(181, 235, 255)",
        secondary: "rgb(179, 202, 212)",
        onSecondary: "rgb(29, 51, 59)",
        secondaryContainer: "rgb(52, 74, 82)", // tab boksin valintaväri
        onSecondaryContainer: "rgb(207, 230, 240)", // tab boxin valitun iconin väri
        tertiary: "rgb(194, 195, 235)",
        onTertiary: "rgb(43, 46, 77)",
        tertiaryContainer: "rgb(66, 68, 101)",
        onTertiaryContainer: "rgb(224, 224, 255)",
        error: "rgb(255, 180, 171)",
        onError: "rgb(105, 0, 5)",
        errorContainer: "rgb(147, 0, 10)",
        onErrorContainer: "rgb(255, 180, 171)",
        background: "rgb(25, 28, 29)", // perus taustaväri
        onBackground: "rgb(225, 227, 228)",
        surface: "rgb(25, 28, 29)",
        onSurface: "rgb(225, 227, 228)", // perus tekstin väri
        surfaceVariant: "rgb(64, 72, 76)", // (ainakin) text inputin tausta
        onSurfaceVariant: "rgb(191, 200, 204)", // tab boxin valitsemattomat iconit
        outline: "rgb(137, 146, 150)",
        outlineVariant: "rgb(64, 72, 76)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(225, 227, 228)",
        inverseOnSurface: "rgb(46, 49, 50)",
        inversePrimary: "rgb(0, 103, 126)",
        elevation: {
            level0: "transparent",
            level1: "rgb(28, 37, 40)",
            level2: "rgb(30, 43, 47)", // tab boxin tausta
            level3: "rgb(32, 48, 53)",
            level4: "rgb(33, 50, 56)",
            level5: "rgb(34, 54, 60)"
        },
        surfaceDisabled: "rgba(225, 227, 228, 0.12)",
        onSurfaceDisabled: "rgba(225, 227, 228, 0.38)",
        backdrop: "rgba(41, 50, 53, 0.4)"
    }
};