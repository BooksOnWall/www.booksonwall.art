import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
type: 'light',
palette: {
  common: {
    white: '#FEFEFE',
    black: '#131413',
  },
  background: {
      paper: '#fff',
      default: '#FAFAFA',
  },
  text: {
    light: '#131413',
     dark: '#FEFEFE',
    primary: '#131413',
    secondary: '#FEFEFE',
    disabled: '#FF9999',
    hint: '#339395'
  },
  primary: {
    light: '#AB514E', //will be calculated from palette.primary.main,
    main: '#91201F',
    dark: '#893E4E', //will be calculated from palette.primary.main,
    contrastText: '#FEFEFE', //will be calculated to contrast with palette.primary.main
  },
  secondary: {
    light: '#42ACD8',
    main: '#2577BB',
    dark: '#424675', //will be calculated from palette.secondary.main,
    contrastText: '#FEFEFE',
  },
  success: {
    light: '#81c784',
    main: '#339D66',
    dark: '#186858',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  error: {
    light: '#C90049',
    main: '#C33949',
    dark: '#C00000', //will be calculated from palette.secondary.main,
    contrastText: '#FEFEFE',
  },
  info: {
    light: '#0066ff',
    main: '#2577BB',
    dark: '#000055', //will be calculated from palette.secondary.main,
    contrastText: '#FEFEFE',
  },
},
  typography: {
  fontFamily: '"RobotoCondensed-Regular", Helvetica, Arial, sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightBold: 700,
  letterSpacing: 'normal',
  body1:{
    fontFamily: '"Roboto", Helvetica, Arial, sans-serif',
    fontSize: "1.1rem",
    lineHeight: 1,
  },
  body2:{
    fontFamily: '"Roboto", Helvetica, Arial, sans-serif',
    fontSize: "1.1rem",
    lineHeight: 1.4,
  },
  h1: {
    fontWeight: 700,
    fontSize: "4.3rem",
    lineHeight: .98,
    fontFamily: '"RobotoCondensed-Bold", Helvetica, Arial, sans-serif',
  },
  h2: {
    fontWeight: 700,
    fontSize: "3rem",
    lineHeight: 1,
    fontFamily: '"RobotoCondensed-Bold", Helvetica, Arial, sans-serif',
  },
  h3: {
    fontWeight: 700,
    fontSize: "2.33rem",
    lineHeight: 1.1,
    fontFamily: '"RobotoCondensed-Regular", Helvetica, Arial, sans-serif',
  },
  h4: {
    fontWeight: 400,
    fontSize: "2rem",
    lineHeight: 1.2,
    fontFamily: '"RobotoCondensed-regular", Helvetica, Arial, sans-serif',
  },
  h5: {
    fontWeight: 400,
    fontSize: "1.8rem",
    fontFamily: '"RobotoCondensed-Bold", Helvetica, Arial, sans-serif',
    lineHeight: 1.1,
  },
  h6: {
    fontWeight: 700,
    fontSize: "1.1rem",
    fontFamily: '"RobotoCondensed-Bold", Helvetica, Arial, sans-serif',
    textTransform: "uppercase",
  },
  subtitle1:{
    fontFamily: '"RobotoCondensed-Light", Helvetica, Arial, sans-serif',
  },
  subtitle2:{
    fontFamily: '"RobotoCondensed-Regular", Helvetica, Arial, sans-serif',
  },
  button:{
    fontFamily: '"RobotoCondensed-Bold", Helvetica, Arial, sans-serif',
    textTransform: "uppercase",
    letterSpacing: "0.02877em",
  },
},
overrides: {
  MuiTableCell: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#FF9900',
  },
  MuiDivider: {
    backgroundColor: "#FEFEFE"
  },
},
shape:{
  borderRadius: 4
},
});
theme = responsiveFontSizes(theme);

export {theme};
