import React, { Component } from 'react';

import {
    Container,
    CardContent,
    CardActionArea,
    CardMedia,
    Typography,
    Card,
    CardActions,
    Box,
    Button,
    Backdrop,
    CircularProgress,
    List,
    ListItem,
    Grid,
    makeStyles
  } from '@material-ui/core';
import { injectIntl, defineMessages } from 'react-intl';
import {Helmet} from "react-helmet";
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {useReactive} from "../../utils/reactive";
import loadable from '@loadable/component';
import Home from "../../assets/images/pages/home.jpg";

const apiURL = process.env.REACT_APP_API;
const ProjectsMap = loadable(() => import('../map/projectsMap'));
const useStyles = makeStyles((theme) => ({
  services: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: 10,
  },
  card: {
    background: 'transparent',
    borderRadius: 10,
    flexGrow: '2 1 25%',
  },
  CardContent: {
    padding: '40px 20px 10px',
    background: 'transparent',
  },
  CardActions:{
    padding: '10px 20px 20px',
    background: 'transparent'
  },
  CardActionArea:{
    borderRadius: 10,
    background: 'transparent',
    '&:hover': {
      background: 'transparent'
    }
  },
  homeHader:{
    backgroundColor: '#ccc',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
    backgroundImage: `url(${Home})`,
    padding: 0,
    margin: '0 0 80px 0'
  },
  homeHaderGradient:{
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    minHeight: '30vh',
    minWidth: '100vw'
  },
  dividerShape: {
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    transform: 'rotate(0deg)',
  },
  shapeFill: {
   fill: '#fafafa',
  },
  dividerSvg: {
    position: 'relative',
    display: 'block',
    width: 'calc(100% + 1.3px)',
    height: '110px',
  },
  button: {
    margin: '30px 0',
    color: theme.palette.primary.main,
    padding: '10px 20px',
    '&:hover': {
        background: theme.palette.primary.main,
        color: 'white',
          borderColor: theme.palette.primary.main,
      }
    },
    tileHead:{
      paddingBottom: 40,
      paddingTop:40
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#91201F',
    },
    bodyMarkdown:{
        '& blockquote p':{
          fontSize: theme.typography.h3.fontSize,
          fontFamily: theme.typography.subtitle1.fontFamily,
          maxWidth: theme.typography.subtitle1.maxWidth,
          lineHeight: theme.typography.subtitle1.lineHeight
        },
        '& p': {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          maxWidth: theme.typography.body1.maxWidth,
          lineHeight: theme.typography.body1.lineHeight
        },
        '& li': {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          maxWidth: theme.typography.body1.maxWidth,
          lineHeight: theme.typography.body1.lineHeight
        },
        '& h1':{
          fontFamily: theme.typography.h1.fontFamily,
          fontSize: theme.typography.h1.fontSize,
          color: theme.palette.primary.main
        },
        '& h2':{
          fontFamily: theme.typography.h2.fontFamily,
          fontSize: theme.typography.h2.fontSize,
          color: theme.palette.primary.main
        },
        '& h3':{
          fontFamily: theme.typography.h3fontFamily,
          fontSize: theme.typography.h3.fontSize,
        },
        '& h4':{
          fontFamily: theme.typography.h4.fontFamily,
          fontSize: theme.typography.h4.fontSize,
        },
        '& h5':{
          fontFamily: theme.typography.h5.fontFamily,
          fontSize: theme.typography.h5.fontSize,
        },
        '& h6':{
          fontFamily: theme.typography.h6.fontFamily,
          fontSize: theme.typography.h6.fontSize,
        }
      },
}));

const projectsTraductions = defineMessages({
  complete: {
    id: 'projects.complete',
    defaultMessage: "Complete"
  },
  started: {
    id: 'projects.started',
    defaultMessage: "Started"
  },
  project_stage: {
    id: 'projects.project_stage',
    defaultMessage: "Project stage"
  },
  read_more: {
    id: 'projects.read_more',
    defaultMessage: "Read more"
  }
});

const Project = ({projects, goToProject, messages}) => {
  const classes = useStyles();
  const { isSmall, isMedium } = useReactive();
  const format = (isSmall) ? 'small' : (isMedium) ? 'medium' : 'large';
  return projects.map((proj, i) => (
    <Grid item xs={12/1} md={12/2} xl={12/4} key={'proj'+i}>
    <Card elevation={0} className={classes.card} key={'proj'+i}>
    <CardActionArea className={classes.CardActionArea} onClick={(e) => goToProject(proj.name)}>

    {proj.header_image &&
      <CardMedia
      className={classes.media}
      image={(proj.header_image) ? apiURL + proj.header_image.formats[format].url: null}
      title={proj.name}
    />}

       <CardContent className={classes.CardContent}>
         <Typography align='left' variant="h5" component="h2">{proj.name}</Typography>
         <ReactMarkdown className={classes.bodyMarkdown} remarkPlugins={[gfm]} children={proj.header} />
       </CardContent>

      <CardActions className={classes.cardActions}>
        <List disablePadding dense>
           <ListItem> <Typography variant="button" component="p">{messages.projects.started}: {proj.start_date}</Typography></ListItem>
           <ListItem><Typography variant="button" component="p">{messages.projects.complete}: {proj.end_date}</Typography></ListItem>
           <ListItem><Typography variant="button" component="p">{messages.projects.project_stage}: {proj.project_step}</Typography></ListItem>
           <ListItem><Button className={classes.button} size="small" onClick={(e) => goToProject(proj.name)} >{messages.projects.read_more}</Button></ListItem>
         </List>
      </CardActions>
     </CardActionArea>
    </Card>
    </Grid>
  ));
};

const ProjectHeader = ({messages}) => {
  const classes = useStyles();
  return (
    <>
    <Container maxWidth='false' className={classes.tileHead}>
      <Typography gutterBottom  variant="h1" >{messages.menu.projects}</Typography>
    </Container>
    </>
  )
};

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
        projects: null,
        apiURL: apiURL,
        insert: this.props.insert,
        limit: this.props.limit,
        loading: false,
        service: this.props.service,
        messages: this.props.intl.messages,
        locale: (this.props.intl && this.props.intl.locale) ? this.props.intl.locale : this.props.locale,
    };
  }
  backOff = () => this.props.history.push('/Projects')
  componentDidMount = async () => {
    await this.loadProjects();
  }
  loadProjects = async (filter, rows, index, sort, order) => {
    const { apiURL, locale, service, insert, limit } = this.state;
    const fetchURL = (insert && limit) ? apiURL + '/projects?_limit='+limit+'&_sort=updated_at:desc&public=true&lang='+locale :  apiURL + '/projects?_limit=-1&_sort=updated_at:desc&public=true&lang='+locale;
    this.setState({loading: true});

    await fetch(fetchURL, {
      crossDomain:true,
      headers: {'Content-Type':'application/json'},
      method: "get"
    })
    .then(response => {
      if (response && !response.ok) { throw new Error(response.statusText);}
      return response.json();
    })
    .then(data => {
        if(data) {
          this.setState({projects: (service) ? data.filter((o) => (o.service && o.service.id === service.id)): data, loading: false});
                } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });
  }
  goToProject = (name) => {
    const {messages} = this.props.intl;
    console.log('menu', messages.menu.project);
    this.props.history.push('/'+messages.menu.project+'/'+name)
  }
  render() {
    const {projects, locale,insert, loading} = this.state;
    const {messages} = this.props.intl;
    return (
      <>
      {!insert &&
        <Helmet>
          <meta charSet="utf-8" />
          <title>{messages.menu.projects}</title>
          <meta name="description" content="This is projects page" />
          <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.projects} />
        </Helmet>
      }
      <Backdrop styles={{zIndex: 1003, color: '#91201F'}} open={loading} >
          <CircularProgress
          size={90}
          thickness={8}
          />
      </Backdrop>
      {projects &&
        <>
        <ScrollIntoViewIfNeeded active={(!insert)}>
          <ProjectsMap projects={projects} mode={"Light"}/>
        </ScrollIntoViewIfNeeded>
        <Box >
          <ProjectHeader messages={messages}/>
          <Box style={{display: 'flex', flexDirection:'column'}}>
            <Container maxWidth='false'>
            <Grid container spacing={3}>
              <Project messages={messages} projects={projects} goToProject={this.goToProject} locale={locale}/>
            </Grid>
            </Container>
          </Box>
        </Box>
        </>
      }
      </>
    )
  }
}
export default injectIntl(Projects);
