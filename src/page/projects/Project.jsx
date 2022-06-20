import React, { Component, useState, useEffect } from 'react';
import {
    Box,
    Container,
    Backdrop,
    CircularProgress,
    Typography,
    makeStyles
  } from '@material-ui/core';

import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import Image from 'material-ui-image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import { injectIntl } from 'react-intl';
import {useReactive} from "../../utils/reactive";
const apiURL = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  headerImage:{
    minHeight: '45vh',
    maxHeight: '55vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: 80,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end'
    },
    headerImageContainer:{
      minHeight: '40vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
    button1: {
      margin: 10,
      marginTop: 20,
      color: theme.palette.primary.main,
      border: '2px #D9D2C6 solid',
      padding: '5px 10px',
      '&:hover': {
          background: '#C33949',
          color: 'white',
            border: '2px #C33949 solid',
        },
      }
}));

const ProjectPage = ({project, history, messages, locale, name}) => {
  const classes = useStyles();
  const { isSmall, isMedium, islarge } = useReactive();
  const format = (isSmall) ? 'small' : (isMedium) ? 'medium' : (islarge) ? 'large': 'xlarge';
  return (
    <Box >
        {(project.header_image) ? <Box className={classes.headerImage} style={{ backgroundImage: `url(${apiURL + project.header_image.formats[format].url})`, }}>
        <Box className={classes.dividerShape}>
          <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
              <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
          </svg>
        </Box>
        </Box> : ''}

        <Container>
        <Typography gutterBottom variant="h1" component='h1'>{name}</Typography>
        <ReactMarkdown remarkPlugins={[gfm]} children={project.header} />
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={project.description} />
        </Container>
    </Box>
  )
}
class Project extends Component {
  constructor(props) {
    super(props)
    const {messages, locale} = this.props.intl;
    const name = props.history.location.pathname.replace("/"+messages.menu.project+"/", "");

    this.state = {
        project: null,
        name: name,
        loading: false,
        locale: locale,
        apiURL: apiURL,
      }
  }
  backOff = () => this.props.history.push('/Projects')
  componentDidMount = () => {
    this.loadProject();
  }
  goTo = (e, b) => {
    console.log(b);
    return window.location.href = b.src
  }
  loadProject = async (filter, rows, index, sort, order) => {
    const {name, apiURL, locale} = this.state;
    console.log("load project");
    const fetchURL = apiURL + '/projects?public=true&name='+encodeURIComponent(name)+'&lang='+locale;
    this.setState({loading: true});
    console.log("URL",fetchURL );
    try {
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
            let p = data[0];
             p.header_image.formats['xlarge']=[];
             p.header_image.formats['xlarge'].url = p.header_image.url;
            this.setState({project: p, loading: false});
          } else {
            console.log('No Data received from the server');
          }
      })
      .catch((error) => {
        // Your error is here!
        if(error) console.log(JSON.stringify(error));
      });
    } catch(e) {
      console.log(e.message);
    }
  }
  componentDidMount = async () => {
    await this.loadProject();
  }
  render() {
    const {project, name, loading} = this.state;
    const {messages, locale} = this.props.intl;
    return (
      <>
      <Backdrop styles={{zIndex: 1003, color: '#91201F'}} open={loading} >
          <CircularProgress
          size={90}
          thickness={8}
          />
      </Backdrop>
      {project && <ProjectPage name={name} project={project} history={this.props.history} messages={messages} locale={locale} />}
      </>
    )
  }
}
export default injectIntl(Project)
