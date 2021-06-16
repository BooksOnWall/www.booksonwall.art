import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import loadable from '@loadable/component';
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
const Services = loadable(() => import('./page/services/Services'));
const Service = loadable(() => import('./page/services/Service'));
const Applications = loadable(() => import('./page/applications/Applications'));
const Terms = loadable(() => import('./page/Terms'));
const Partner = loadable(() => import('./page/Partner'));
const Support = loadable(() => import('./page/Support'));

const Routes = ({messages, history, locale}) => (
    <Switch>
      <Route exact path="/"> <Home history={history} /> </Route>
      <Route path={"/"+messages[locale].menu.explore}> <Explore history={history}/> </Route>
      <Route path={"/"+messages[locale].menu.create}> <Create history={history}/> </Route>
      <Route path={"/"+messages[locale].menu.collaborate}> <Help history={history} /> </Route>
      <Route path={"/"+messages[locale].menu.info}> <Info history={history} /> </Route>
      <Route exact path={"/"+messages[locale].menu.connect}> <Connect history={history} /> </Route>
      <Route exact path={"/"+messages[locale].menu.community}> <Community history={history} /> </Route>
      <Route exact path={"/"+messages[locale].menu.projects} > <Projects history={history} /> </Route>
      <Route exact path={"/"+messages[locale].menu.project} > <Projects history={history} /> </Route>
      <Route exact path={"/"+messages[locale].menu.project+"/:name"}> <Project history={history} /> </Route>
      <Route exact path={"/"+messages[locale].menu.articles}><Articles history={history}/> </Route>
      <Route exact path={"/"+messages[locale].menu.article}><Articles history={history}/> </Route>
      <Route exact path={"/"+messages[locale].menu.article+"/:name"}><Article history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.stories}><Stories history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.story}><Stories history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.story+"/:name"}><Story history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.community+"/"+messages[locale].menu.member+":name"} ><Member history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.terms} ><Terms history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.services} ><Services history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.service} ><Services history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.service+"/:name"}><Service history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.applications} ><Applications history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.partner} ><Partner history={history}/></Route>
      <Route exact path={"/"+messages[locale].menu.support} ><Support history={history}/></Route>

    </Switch>
);
export default Routes
