import { MD3DarkTheme, configureFonts } from "react-native-paper";
import { SorensonColors, tokens, typescale } from "./tokens";

const { palette } = tokens.md.ref;

const fontConfig = {
    web: {
      regular: {
        fontFamily: 'Inter-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Inter-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Inter-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Inter-Thin',
        fontWeight: 'normal',
      },
    },
    ios: {
      regular: {
        fontFamily: 'Inter-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Inter-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Inter-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Inter-Thin',
        fontWeight: 'normal',
      },
    },
    android: {
      regular: {
        fontFamily: 'Inter-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Inter-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Inter-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Inter-Thin',
        fontWeight: 'normal',
      },
    },
    native: {
        regular: {
          fontFamily: 'Inter-Regular',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'Inter-Medium',
          fontWeight: 'normal',
        },
        light: {
          fontFamily: 'Inter-Light',
          fontWeight: 'normal',
        },
        thin: {
          fontFamily: 'Inter-Thin',
          fontWeight: 'normal',
        },
      }
  };

const SorensonTheme = {
    ...MD3DarkTheme,
    colors: {
        primary: palette.tonalTeal70,
        onPrimary: palette.tonalTeal70,
        primaryContainer: palette.tonalTeal70,
        onPrimaryContainer: palette.tonalTeal70,
        background: palette.neutral1,
        backgroundCustom:palette.neutral5,
        onBackground: palette.neutral0,
        surface: palette.neutral0,
        onSurface: palette.neutral0,
        surfaceVariant: palette.neutral3,
        onSurfaceVariant: palette.neutral3,
        outline: palette.neutral3,
        

    },
    typescale,

};

export type ThemeOverride = typeof theme;

export default SorensonTheme;