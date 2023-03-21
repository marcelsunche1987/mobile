import { Platform } from "react-native";
import { Font } from "react-native-paper/lib/typescript/types";

const ref = {
    palette: {
        tonalTeal80: '#51DBCD',
        tonalTeal70: '#28BFB2',
        tonalTeal60: '#00A297',
        tonalTeal50: '#00867C',
        tonalTeal45: '#007E75',
        tonalTeal40: '#006A62',
        neutral0: '#04080A',
        neutral1: '#080F13',
        neutral2: '#161C20',
        neutral3: '#22282C',
        neutral4: '#2D3237',
        neutral5: '#0F161A',
    },
    
    typeface: {
        brandRegular: Platform.select({
          web: 'Inter-Regular',
          ios: 'Inter-Regular',
          default: 'Inter-Regular',
        }),
        weightRegular: '400' as Font['fontWeight'],
    
        plainMedium: Platform.select({
          web: 'Inter-Medium',
          ios: 'Inter-Medium',
          default: 'Inter-Medium',
        }),
        weightMedium: '500' as Font['fontWeight'],
      },
    
      opacity: {
        level1: 0.08,
        level2: 0.12,
        level3: 0.16,
        level4: 0.38,
      },
    };
    
    const regularType = {
      fontFamily: ref.typeface.brandRegular,
      letterSpacing: 0,
      fontWeight: ref.typeface.weightRegular,
    };
    
    const mediumType = {
      fontFamily: ref.typeface.plainMedium,
      letterSpacing: 0.15,
      fontWeight: ref.typeface.weightMedium,
    };
    
    export const typescale = {
      displayLarge: {
        ...regularType,
        lineHeight: 64,
        fontSize: 57,
      },
      displayMedium: {
        ...regularType,
        lineHeight: 52,
        fontSize: 45,
      },
      displaySmall: {
        ...regularType,
        lineHeight: 44,
        fontSize: 36,
      },
    
      headlineLarge: {
        ...regularType,
        lineHeight: 40,
        fontSize: 32,
      },
      headlineMedium: {
        ...regularType,
        lineHeight: 36,
        fontSize: 28,
      },
      headlineSmall: {
        ...regularType,
        lineHeight: 32,
        fontSize: 24,
      },
    
      headlineSmaller: {
        ...regularType,
        lineHeight: 32,
        fontSize: 4,
      },
    
      titleLarge: {
        ...regularType,
        lineHeight: 28,
        fontSize: 22,
      },
      titleMedium: {
        ...mediumType,
        lineHeight: 24,
        fontSize: 16,
      },
      titleSmall: {
        ...mediumType,
        letterSpacing: 0.1,
        lineHeight: 20,
        fontSize: 14,
      },
    
      labelLarge: {
        ...mediumType,
        letterSpacing: 0.1,
        lineHeight: 20,
        fontSize: 14,
      },
      labelMedium: {
        ...mediumType,
        letterSpacing: 0.5,
        lineHeight: 16,
        fontSize: 12,
      },
      labelSmall: {
        ...mediumType,
        letterSpacing: 0.5,
        lineHeight: 16,
        fontSize: 11,
      },
    
      bodyLarge: {
        ...mediumType,
        fontWeight: ref.typeface.weightRegular,
        fontFamily: ref.typeface.brandRegular,
        lineHeight: 24,
        fontSize: 16,
      },
      bodyMedium: {
        ...mediumType,
        fontWeight: ref.typeface.weightRegular,
        fontFamily: ref.typeface.brandRegular,
        letterSpacing: 0.25,
        lineHeight: 20,
        fontSize: 14,
      },
      bodySmall: {
        ...mediumType,
        fontWeight: ref.typeface.weightRegular,
        fontFamily: ref.typeface.brandRegular,
        letterSpacing: 0.4,
        lineHeight: 16,
        fontSize: 12,
      },
    };




export const tokens = {
    md: {
        ref,
        sys: {
            typescale,
        }
    }
};

export const SorensonColors = ref.palette;