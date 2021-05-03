import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import loadable from '@loadable/component';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes } from '@material-ui/core/styles';


import 'react-toastify/dist/ReactToastify.css';

import intlMessages_en from './i18n/locales/en.json';
import intlMessages_es from './i18n/locales/es.json';
import intlMessages_pt from './i18n/locales/pt.json';
import intlMessages_fr from './i18n/locales/fr.json';
import intlMessages_it from './i18n/locales/it.json';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-pluralrules/locale-data/es';
import '@formatjs/intl-pluralrules/locale-data/pt';
import '@formatjs/intl-pluralrules/locale-data/it';

import './App.css';

const Layout = loadable(() => import('./template/Layout'));
const Home = loadable(() => import('./page/HomePage'));
const Explore = loadable(() => import('./page/Explore'));
const Create = loadable(() => import('./page/Create'));
const Help = loadable(() => import('./page/Collaborate'));
const Info = loadable(() => import('./page/Info'));
const Connect = loadable(() => import('./page/Connect'));
const Community = loadable(() => import('./page/members/Community'));
const Story = loadable(() => import('./page/stories/story'));
const Member = loadable(() => import('./page/members/Member'));
const Articles = loadable(() => import('./page/articles/Articles'));
const Article = loadable(() => import('./page/articles/Article'));
const Projects = loadable(() => import('./page/projects/Projects'));
const Project = loadable(() => import('./page/projects/Project'));
const Stories = loadable(() => import('./page/stories/stories'));


let theme = createMuiTheme({
type: 'light',
  common: {
    white: '#FEFEFE',
    black: '#131413',
  },
  background: {
      paper: '#131413',
      default: '#FEFEFE',
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
    main: '#BE4251',
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
  borderRadius: 8
},
});
theme = responsiveFontSizes(theme);

const messages = {
  'en': intlMessages_en,
  'es': intlMessages_es,
  'pt': intlMessages_pt,
  'fr': intlMessages_fr,
  'it': intlMessages_it,
};

const App = () => {
  let navLocale =  (navigator.languages && navigator.languages[0])
                 || navigator.language
                 || navigator.userLanguage
                 || 'en';
  navLocale = navLocale.split("-")[0];
  const [locale, setLocale] = useState(navLocale);
  const switchLang = locale => setLocale(locale);
  return (
    <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
          <Router>
                <Route render={({ location, history }) => {
                    return (
                      <Layout locale={locale} switchLang={switchLang} history={history}>
                        <Switch>
                          <Route path={"/"+messages[locale].menu.explore}> <Explore history={history}/> </Route>
                          <Route path={"/"+messages[locale].menu.create}> <Create history={history}/> </Route>
                          <Route path={"/"+messages[locale].menu.collaborate}> <Help history={history} /> </Route>
                          <Route path={"/"+messages[locale].menu.info}> <Info history={history} /> </Route>
                          <Route exact path={"/"+messages[locale].menu.connect}> <Connect history={history} /> </Route>
                          <Route exact path={"/"+messages[locale].menu.community}>   <Community history={history} /> </Route>
                          <Route exact path={"/"+messages[locale].menu.projects} > <Projects history={history} /> </Route>
                          <Route exact path={"/"+messages[locale].menu.project+":name"}> <Project history={history} /> </Route>
                          <Route exact path={"/"+messages[locale].menu.news}><Articles history={history}/> </Route>
                          <Route exact path={"/"+messages[locale].menu.news+":name"}><Article history={history}/></Route>
                          <Route exact path={"/"+messages[locale].menu.stories}><Stories history={history}/></Route>
                          <Route exact path={"/"+messages[locale].menu.story+":name"}><Story history={history}/></Route>
                          <Route exact path={"/"+messages[locale].menu.community+"/"+messages[locale].menu.member+":name"} ><Member history={history}/></Route>
                          <Route path="/"> <Home history={history} /> </Route>
                        </Switch>
                      </Layout>
                    );
                  }}/>
          </Router>
    </IntlProvider>
  );
}

export default App;
