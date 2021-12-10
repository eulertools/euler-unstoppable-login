import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';

// allow configuration using `createTheme`
declare module '@mui/material/styles' {
  interface TypographyVariants {
    small: React.CSSProperties;
    medium: React.CSSProperties;
    large: React.CSSProperties;
    largeSemiBold: React.CSSProperties;
    largeBold: React.CSSProperties;
    largeExtraBold: React.CSSProperties;
    extraLarge: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
    medium?: React.CSSProperties;
    large?: React.CSSProperties;
    largeSemiBold?: React.CSSProperties;
    largeBold?: React.CSSProperties;
    largeExtraBold?: React.CSSProperties;
    extraLarge?: React.CSSProperties;
  }

  interface Palette {
    positive: Palette['primary'];
    negative: Palette['primary'];
    primaryVariant: Palette['primary'];
    secondaryVariant: Palette['primary'];
    surface: Palette['primary'];
    alert: Palette['primary'];
  }

  interface PaletteOptions {
    positive?: PaletteOptions['primary'];
    negative?: PaletteOptions['primary'];
    primaryVariant?: PaletteOptions['primary'];
    secondaryVariant?: PaletteOptions['primary'];
    surface?: PaletteOptions['primary'];
    alert?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    positive: true;
    negative: true;
    primaryVariant: true;
    secondaryVariant: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true;
    medium: true;
    large: true;
    largeSemiBold: true;
    largeBold: true;
    largeExtraBold: true;
    extraLarge: true;
  }
}

export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

const typographyOptions: ThemeOptions = {
  typography: {
    fontFamily:
      '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    htmlFontSize: 16,
    h1: {
      fontWeight: 700,
      fontSize: '2rem', // 32px
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.5625rem', // 25px
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.375rem', // 22px
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem', // 20px
    },
    small: {
      fontWeight: 400,
      fontSize: '0.875rem', // 14px
    },
    medium: {
      fontWeight: 500,
      fontSize: '0.9375rem', // 15px
    },
    large: {
      fontWeight: 400,
      fontSize: '1rem', // 16px
    },
    largeSemiBold: {
      fontWeight: 600,
      fontSize: '1rem', // 16px
    },
    largeBold: {
      fontWeight: 700,
      fontSize: '1rem', // 16px
    },
    largeExtraBold: {
      fontWeight: 800,
      fontSize: '1rem', // 16px
    },
    extraLarge: {
      fontWeight: 700,
      fontSize: '1.125rem', // 18px
    },
  },
}

const paletteOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#4867F5', // Ultramarine Blue
      light: '#7B92F8',
      dark: '#0B31D7',
    },
    primaryVariant: {
      main: '#F1F4FF'
    },
    secondary: {
      main: '#239FA0', // Viridian Green
      light: '#4DC9CA',
      dark: '#197272',
    },
    secondaryVariant: {
      main: '#E8F3F3'
    },
    success: {
      main: '#60D265' // Mantis
    },
    error: {
      main: '#FF3C3B' // Tart Orange
    },
    info: {
      main: '#617DF7'
    },
    warning: {
      main: '#FFCD06'
    },
    positive: {
      main: '#23D4A0'
    },
    negative: {
      main: '#FF646D'
    }
  }
}

const themesOptions: Record<string, ThemeOptions> = {
  [THEMES.LIGHT]: {
    palette: {
      mode: 'light',
      background: {
        default: '#FAF9FA' // Cultured
      },
      surface: {
        main: '#FFFFFF' // White
      },
      text: {
        primary: '#42526E' // Independence
      },
      alert: {
        main: '#F2F4FE' // Ghost White
      }
    },
  },
  [THEMES.DARK]: {
    palette: {
      mode: 'dark',
      background: {
        default: '#191E2E' // Raisin Black
      },
      surface: {
        main: '#263144' // Prussian Blue
      },
      text: {
        primary: '#42526E' // Independence
      },
      alert: {
        main: '#F2F4FE' // Ghost White
      }
    },
  },
};

let theme = createTheme({
  ...typographyOptions,
  ...paletteOptions,
  ...themesOptions[THEMES.LIGHT]
});

theme = responsiveFontSizes(theme);

export default theme;
