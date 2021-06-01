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
    mainGradient: 'linear-gradient(0deg, rgba(190,66,81,.8) 0%, rgba(224,161,3,.8) 100%)',
    darkGradient: 'linear-gradient(0deg, rgba(20, 0, 100, .88) 0%, rgba(190,66,81,.88) 100%)'
  },
  secondary: {
    light: '#009999',
    main: '#186858',
    dark: '#424675', //will be calculated from palette.secondary.main,
    contrastText: '#FEFEFE',
    mainGradient: 'linear-gradient(0deg, rgba(56,142,60, 0.88) 0%, rgba(0,153,153, 0.88) 100%)'
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
  fontSize: 15,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightBold: 700,
  letterSpacing: 'normal',
  body:{
    fontFamily: '"Roboto", Helvetica, Arial, sans-serif',
    fontSize: "1.4rem",
    lineHeight: 1.2,
  },
  body1:{
    fontFamily: '"Roboto", Helvetica, Arial, sans-serif',
    fontSize: "1.3rem",
    lineHeight: 1.2,
  },
  body2:{
    fontFamily: '"RobotoCondensed-Regular", Helvetica, Arial, sans-serif',
    fontSize: "1.2rem",
    lineHeight: 1.2,
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
    letterSpacing: -.2
  },
  h3: {
    fontWeight: 700,
    fontSize: "2.33rem",
    lineHeight: 1.2,
    fontFamily: '"RobotoCondensed-Regular", Helvetica, Arial, sans-serif',
    letterSpacing: -.1
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
    fontSize: "1.5em",
    lineHeight: 1.3,
    fontFamily: '"RobotoCondensed-Regular", Helvetica, Arial, sans-serif',
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
