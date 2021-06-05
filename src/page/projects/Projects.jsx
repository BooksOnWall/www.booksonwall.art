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
    Divider,
    makeStyles
  } from '@material-ui/core';
import { injectIntl, defineMessages } from 'react-intl';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';

import Home from "../../assets/images/pages/home.jpg";

const apiURL = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  card: {
    minWidht: 600,
    maxWidth: 2160,
    background: 'transparent',
  },
  CardActionArea:{
    display: 'flex',
    flexDirection: 'row',
    background: 'transparent',
    justifyContent: 'space-between',
    padding: '30px 50px 30px'

  },
  media: {
    height: 250,
    minWidth: 250,
    borderRadius: 400,
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
    background: theme.palette.primary.mainGradient,
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
    border: '2px #D9D2C6 solid',
    padding: '10px 20px',
    '&:hover': {
        background: theme.palette.primary.main,
        color: 'white',
          border: '2px solid',
          borderColor: theme.palette.primary.main,
      }
    },
    tileHead:{
      paddingBottom: 50,
    }
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
  return projects.map((proj, i) => (
    <Card elevation={0} className={classes.card} key={'proj'+i}>
    <CardActionArea className={classes.CardActionArea} >
       <CardMedia
         onClick={(e) => goToProject(proj.name)}
         className={classes.media}
         image={(proj.header_image && proj.header_image.formats && proj.header_image.formats.thumbnail ) ? apiURL + proj.header_image.formats.thumbnail.url : null}
         title={proj.name}
       />
       <CardContent>
         <Typography align='left' variant="h2" component="h2">
           {proj.name}
         </Typography>
       </CardContent>
       <CardContent>
        <Typography  variant="subtitle1"><b>{messages.projects.started}:</b> {proj.start_date} <br/> <b>{messages.projects.complete}:</b>{proj.end_date} </Typography>
        <Typography  variant="subtitle1"><b>{messages.projects.project_stage}:</b> {proj.project_step} </Typography>
      </CardContent>
      <CardActions>
       <Button className={classes.button} size="small" color="primary" bgcolor="primary" onClick={(e) => goToProject(proj.name)} >{messages.projects.read_more}</Button>
      </CardActions>
     </CardActionArea>
     <Divider />
    </Card>
  ));
};

const ProjectHeader = ({messages}) => {
  const classes = useStyles();
  return (
    <Box className={classes.homeHader}>
    <Box className={classes.homeHaderGradient}>
      <Container maxWidth='xs' className={classes.tileHead}>
        <Typography gutterBottom color="textSecondary" variant="h1" >{messages.menu.projects}</Typography>
      </Container>
      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
            <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
        </svg>
      </Box>
    </Box>
    </Box>
  )
};

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
        projects: null,
        apiURL: apiURL,
        insert: this.props.insert,
        loading: false,
        messages: this.props.intl.messages,
        locale: (this.props.intl && this.props.intl.locale) ? this.props.intl.locale : this.props.locale,
    };
  }
  backOff = () => this.props.history.push('/Projects')
  componentDidMount = async () => {
    await this.loadProjects();
  }
  loadProjects = async (filter, rows, index, sort, order) => {
    console.log("load projects");
    const { apiURL, locale } = this.state;
    const fetchURL = apiURL + '/Projects?public=true&lang='+locale;
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
          this.setState({projects: data, loading: false});
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
    this.props.history.push('/'+messages.menu.project+'/'+name)
  }
  render() {
    const {projects, locale,insert, loading} = this.state;
    const {messages} = this.props.intl;
    return (
      <>
      <ScrollIntoViewIfNeeded active={(!insert)}></ScrollIntoViewIfNeeded>
      <Backdrop styles={{zIndex: 1003, color: '#99FF44'}} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      {projects &&
        <>
        <Box >
          <ProjectHeader messages={messages}/>
          <Box style={{display: 'flex', flexDirection:'column'}}>
            <Container maxWidth='xl'>
              <Project messages={messages} projects={projects} goToProject={this.goToProject} locale={locale}/>
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
