import { createMuiTheme } from '@material-ui/core/styles';

export const colorIconDefault = '#003B4A';
export const colorCommonBlack = '#003B4A';
export const colorPrimary = '#00C08B';
export const colorSecondary = 'rgb(0,192,139,.1)';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colorPrimary,
      contrastText: '#fff'
    },
    secondary: {
      main: colorSecondary,
      contrastText: colorPrimary
    },
    common: {
      white: '#fff',
      black: colorCommonBlack
    },
    iconButtonBar: {
      main: 'rgb(0,59,74,.1)'
    },
    background: {
      paper: '#fff'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
        borderRadius: '15px',
        color: colorIconDefault,
        boxShadow: 'none !important'
      },
    },
    MuiListItem: {
      root: {
        color: colorIconDefault
      }
    },
    MuiIconButton: {
      root: {
        color: colorIconDefault
      }
    },
    MuiContainer: {
      root: {
        background: '#F5F6F7'
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '10px'
      },
      input: {
        padding: '10px 10px'
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 12px) scale(1)'
      }
    },
    MuiSwitch: {
      switchBase: {
        color: '#9C9C9C',
        '&$checked': {
          color: `${colorCommonBlack} !important`,
        },
        '&$checked + $track': {
          backgroundColor: `${colorCommonBlack} !important`,
        }
      }
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;