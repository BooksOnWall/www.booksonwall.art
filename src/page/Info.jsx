import React, { Component } from 'react';
import {
    Typography,
    Container,
    ButtonGroup,
    Grid,
    Box,
    Button,
    makeStyles
  } from '@material-ui/core';

import { Images } from './../assets/images/pages';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PermMediaIcon from '@material-ui/icons/PermMedia';

import { injectIntl, defineMessages } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import community from '../md/page/en/info/community.md';
import historyMD from '../md/page/en/info/history.md';
import manifest from '../md/page/en/info/manifest.md';
import formList from '../md/page/en/info/formList.md';
import press from '../md/page/en/info/press.md';
import history from '../md/history.js';
import ContactForm from './ContactForm';
import Articles from './articles/Articles';

const infoTraductions = defineMessages({
  we_are: {
    id: 'info.we_are',
    defaultMessage: "We are an interdisciplinary collective of creatives who tell stories through digital technology and cultural assets."
  },
   we_create: {
    id: 'info.we_create',
    defaultMessage: "We have created the Booksonwall App that with visual and sound stimuli, interacts with people, making them part of their stories, traveling around the city and enjoying urban artworks."
  }
});

const useStyles = makeStyles((theme) => ({
root: {
  flexGrow: 1,
  background: 'transparent',
},
wrapper: {
  display: 'flex',
  justifyContent: 'space-around',
  zIndex: 999,
},
manifest: {
  margin: '-4vh 32vw 6vh 53px',
  paddingTop: '10vh'
},
history:{
  margin: '4vw 32vw 6vh 53px',
},
tileHead: {
    margin: 0,
    maxWidth: '55vw',
    padding: '8vh 8vh',
  },
  homeHader:{
    backgroundColor: '#ccc',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPositionY: 'top',
    backgroundImage: `url(${Images.image5.default})`,
  },
  homeHaderBg: {
    background:'linear-gradient(0deg,  rgba(224,161,3,.0) 0%, rgba(24,104,88,.92) 70%) ',
    with: '100vw',
    display: 'flex',
    flexFlow: 'column wrap',
    minHeight: '80vh',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
community:{
  backgroundSize: 'cover',
  backgroundPositionY: 'center',
  backgroundImage: `url(${Images.image12.default})`,
  minHeight: '120vh',
  color: '#fff'
},
communityBg: {
  background:'linear-gradient(0deg, rgba(190,66,81,.88) 0%, rgba(224,161,3,.88) 100%) ',
  display: 'flex',
  justifyContent:'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '120vh',
  width: '100vw'
},
bg: {
    background:'#f4f4f4',
    paddingTop: '15vh',
    paddingBottom: '5vh'
},
shapeFill3: {
 fill: '#f4f4f4',
},
press: {
  display: 'flex',
  justifyContent:'space-between',
  flexDirection: 'column',
  alignItems: 'center',
},
dividerShape3: {
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(0deg)',
},
dividerSvg3: {
position: 'relative',
display: 'block',
width: 'calc(100% + 1.3px)',
height: '220px',
},
dividerShape2: {
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(0deg)',
},
dividerShape: {
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(180deg)',
},
shapeFill: {
 fill: '#fafafa',
},
dividerSvg: {
position: 'relative',
display: 'block',
width: 'calc(100% + 1.3px)',
height: '220px',
},
dividerSvg2: {
position: 'relative',
display: 'block',
width: 'calc(100% + 1.6px)',
height: '100px',
},
buton1: {
  margin: '40px 0',
  color: '#186858',
  border: '1px #186858 solid',
  '&:hover': {
      background: '#186858',
      color: 'white',
        border: '1px #186858 solid',
    }
  },
  buton2: {
    margin: '40px 0',
    color: '#fff',
    border: '1px #fff solid',
    '&:hover': {
        background: '#fff',
        color: 'rgba(190,66,81,1)',
          border: '1px #fff solid',
      }
    }
}));

const Manifest = ({manifest, messages}) => {
  const classes = useStyles();
  return (
    <>
    <Box className={classes.homeHader}>
      <Box className={classes.homeHaderBg}>
      <Container maxWidth='md' className={classes.tileHead}>
        <Typography variant="h2" gutterBottom>{messages.info.we_are}</Typography>
        <Typography variant="h3" gutterBottom>{messages.info.we_create}</Typography>
      </Container>
      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg2} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={classes.shapeFill}></path>
        </svg>
      </Box>
      </Box>
    </Box>
  <Box id='manifiest' className={classes.manifest} >
  <Container maxWidth='md'>
    <ReactMarkdown source={manifest} />
  </Container>
  </Box>
  </>
)
};
const History =({historyMD, historyFeed, goToCommunity}) => {
  const classes = useStyles();
  return (

  <Box id='history' className={classes.history}>
    <Container maxWidth='md'>
    <ReactMarkdown source={historyMD} />
    <Button primary  onClick={goToCommunity} labelPosition='right' icon='down arrow' content='Meet the community' />
      {/** <Grid columns={2} stackable textAlign='left'>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <HistoryFeed history={historyFeed} />
          </Grid.Column>
          <Grid.Column>

        </Grid.Column>
        </Grid.Row>
      </Grid> **/}
      </Container>
  </Box>
)
};


const Community =({community, goToCommunity, formList, messages}) => {
  const classes = useStyles();
  return (

    <Box id='community' className={classes.community}>
    <Box className={classes.communityBg}>
    <Box className={classes.dividerShape2}>
      <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={classes.shapeFill}></path>
      </svg>
    </Box>
    <Container>
      <Grid container spacing={8}>
        <Grid item xs>
            <ReactMarkdown source={formList} />
            <ContactForm style={{textAlign: 'left'}} messages={messages} />
        </Grid>
        <Grid item xs>
            <ReactMarkdown source={community} />
            <Button onClick={goToCommunity} size="large" className={classes.buton2} >Meet the community</Button>
        </Grid>
      </Grid>
      </Container>

      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={classes.shapeFill3}></path>
        </svg>
      </Box>
    </Box>
    </Box>
)};

const Press =({press, goToArticle, history}) => {
  const classes = useStyles();
  return (
  <Box id='press' >
      <Box className={classes.bg}>
        <Container>
          <Typography gutterBottom variant="h4">Branding and press realease  </Typography>
          <ButtonGroup color="secondary" aria-label="outlined secondary button group">
            <Button size="large" className={classes.buton1} startIcon={<PictureAsPdfIcon />}>Presentation</Button>
            <Button size="large" className={classes.buton1} startIcon={<PermMediaIcon />}>PressKIT</Button>
            <Button size="large" className={classes.buton1} startIcon={<PermMediaIcon />}>Branding</Button>
          </ButtonGroup>
        </Container>
      </Box>
      <Box>
      <Box className={classes.dividerShape3}>
        <svg className={classes.dividerSvg3} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={classes.shapeFill3}></path>
        </svg>
      </Box>
      <Container>
        <ReactMarkdown source={press} />
        <Articles max={4} tags={['Press']} history={history}/>
        <Button primary  onClick={goToArticle} labelPosition='right' icon='arrow right' content='More articles' />
      </Container>
      </Box>
  </Box>
)};

class Info extends Component {
  constructor(props) {
    super(props)

    this.state = {  manifest: null, historyMD: null, formList: null, press: null, community: null  }
  }
  componentDidMount() {
    // update authenticated state on logout
    fetch(formList).then(res => res.text()).then(text => this.setState({ formList: text }));
    fetch(community).then(res => res.text()).then(text => this.setState({ community: text }));
    fetch(historyMD).then(res => res.text()).then(text => this.setState({ historyMD: text }));
    fetch(manifest).then(res => res.text()).then(text => this.setState({ manifest: text }));
    fetch(press).then(res => res.text()).then(text => this.setState({ press: text }));
  }
  goToCommunity = () => this.props.history.push('/Community')
  render() {
    const { manifest, historyMD, community, press, formList } = this.state;
    const {messages} = this.props.intl;
    return (
      <Box id="info" className="main" >
        <Manifest messages={messages} manifest={manifest}/>
        <History historyMD={historyMD} history={history} goToCommunity={this.goToCommunity}/>
        <Community community={community} goToCommunity={this.goToCommunity} formList={formList} messages={messages}/>
        <Press press={press} history={this.props.history}/>

    </Box>
    )
  }
};

export default injectIntl(Info);
