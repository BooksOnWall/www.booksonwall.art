import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import loadable from '@loadable/component';

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
const Terms = loadable(() => import('./page/Terms'));

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

  const checkLang = pathname => {
    // verify that the url passed correspond to the good lang or locale
    const page = pathname.substring(1);
    if(page) {
      // check that locale correspond to the page if no change it
      const menu = messages[locale]["menu"];
      let exist = false;
      for (const [value] of Object.entries(menu)) {
        if(value === page) exist = true;
      }
      if(!exist) {
        // locale and url are different
        for (const [key, value] of Object.entries(messages)) {
          if(key !== locale) {
            for (const [mvalue] of Object.entries(value.menu)) {
              if(mvalue === page) {
                switchLang(key);
              }
            }
          }
        }
      }
    }
  }
  return (
    <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
      <Router>
        <Route render={({ location, history }) => {
          checkLang(location.pathname);
          return (
            <Layout locale={locale} allMessages={messages} switchLang={switchLang} history={history}>
            <Switch>
            <Route exact path="/"> <Home history={history} /> </Route>
            <Route path={"/"+messages[locale].menu.explore}> <Explore history={history}/> </Route>
            <Route path={"/"+messages[locale].menu.create}> <Create history={history}/> </Route>
            <Route path={"/"+messages[locale].menu.collaborate}> <Help history={history} /> </Route>
            <Route path={"/"+messages[locale].menu.info}> <Info history={history} /> </Route>
            <Route exact path={"/"+messages[locale].menu.connect}> <Connect history={history} /> </Route>
            <Route exact path={"/"+messages[locale].menu.community}> <Community history={history} /> </Route>
            <Route exact path={"/"+messages[locale].menu.projects} > <Projects history={history} /> </Route>
            <Route exact path={"/"+messages[locale].menu.project+"/:name"}> <Project history={history} /> </Route>
            <Route exact path={"/"+messages[locale].menu.articles}><Articles history={history}/> </Route>
            <Route exact path={"/"+messages[locale].menu.article+"/:name"}><Article history={history}/></Route>
            <Route exact path={"/"+messages[locale].menu.stories}><Stories history={history}/></Route>
            <Route exact path={"/"+messages[locale].menu.story+"/:name"}><Story history={history}/></Route>
            <Route exact path={"/"+messages[locale].menu.community+"/"+messages[locale].menu.member+":name"} ><Member history={history}/></Route>
            <Route exact path={"/"+messages[locale].menu.terms} ><Terms history={history}/></Route>
            </Switch>
            </Layout>
          );
        }}/>
      </Router>
    </IntlProvider>
  );
}

export default App;
