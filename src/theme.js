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
        primary: "rgb(191, 194, 255)", // mm. contained napin väri
        onPrimary: "rgb(20, 25, 148)", // mm. contained napin tekstin väri
        primaryContainer: "rgb(48, 55, 170)",
        onPrimaryContainer: "rgb(224, 224, 255)",
        secondary: "rgb(197, 196, 221)",
        onSecondary: "rgb(46, 47, 66)",
        secondaryContainer: "rgb(68, 69, 89)", // tab boksin valintaväri
        onSecondaryContainer: "rgb(225, 224, 249)", // tab boxin valitun iconin väri
        tertiary: "rgb(232, 185, 213)",
        onTertiary: "rgb(70, 38, 59)",
        tertiaryContainer: "rgb(94, 60, 82)",
        onTertiaryContainer: "rgb(255, 216, 238)",
        error: "rgb(255, 180, 171)",
        onError: "rgb(105, 0, 5)",
        errorContainer: "rgb(147, 0, 10)",
        onErrorContainer: "rgb(255, 180, 171)",
        background: "rgb(27, 27, 31)", // perus taustaväri
        onBackground: "rgb(229, 225, 230)",
        surface: "rgb(27, 27, 31)",
        onSurface: "rgb(229, 225, 230)", // perus tekstin väri
        surfaceVariant: "rgb(70, 70, 79)", // (ainakin) text inputin tausta
        onSurfaceVariant: "rgb(199, 197, 208)", // tab boxin valitsemattomat iconit
        outline: "rgb(145, 143, 154)",
        outlineVariant: "rgb(70, 70, 79)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(229, 225, 230)",
        inverseOnSurface: "rgb(48, 48, 52)",
        inversePrimary: "rgb(73, 81, 195)",
        elevation: {
            level0: "transparent",
            level1: "rgb(35, 35, 42)",
            level2: "rgb(40, 40, 49)", // tab boxin tausta
            level3: "rgb(45, 45, 56)",
            level4: "rgb(47, 47, 58)",
            level5: "rgb(50, 50, 62)"
        },
        surfaceDisabled: "rgba(229, 225, 230, 0.12)",
        onSurfaceDisabled: "rgba(229, 225, 230, 0.38)",
        backdrop: "rgba(48, 48, 56, 0.4)"
    }
};