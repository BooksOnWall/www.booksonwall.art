import React, { useEffect, useState } from 'react';
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
import { useLocation, useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { injectIntl, defineMessages  } from 'react-intl';
import ReactMarkdown from 'react-markdown';
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
  },
  meet_the_comunity:{
    in: 'info.meet_the_comunity',
    defaultMessage: 'Meet the community'
  },
  more_articles:{
    id: 'info.more_articles',
    defaultMessage: 'More articles'
  },
  press_title:{
  id:  'press.press_title',
  defaultMessage: 'Branding and Press realease'
  },
  presentation:{
  id:  'press.presentation',
  defaultMessage: 'presentation'
  },
  presskit:{
    id:  'press.presskit',
    defaultMessage: 'presskit'
  },
  branding:{
    id:  'press.branding',
    defaultMessage: 'Branding'
  },
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
  padding: '8vh 8vh',
  paddingTop: '12vh',
  maxWidth: 1280
},
history:{
  margin: '4vw 32vw 6vh 53px',
},
tileHead: {
    margin: 0,
    maxWidth: '1280px',
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
    background: theme.palette.secondary.mainGradient,
    with: '100vw',
    display: 'flex',
    flexFlow: 'column wrap',
    minHeight: '80vh',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
community:{
  backgroundSize: 'cover',
  backgroundPositionY: 'center',
  backgroundImage: `url(${Images.image12.default})`,
  minHeight: '60vh',
  color: '#fff',
},
communityContainer:{
  display: 'flex',
  justifyContent:'space-between',
  flexDirection: 'column',
  alignItems: 'center',
},
communityGrid:{
  display: 'flex',
  justifyContent:'space-between',
  flexDirection: 'row',
},
communityBg: {
  background: theme.palette.primary.mainGradient,
  display: 'flex',
  justifyContent:'center',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '65vh',
  width: '100vw',
  padding: '8vh',
},
bg: {
    background:'#f4f4f4',
    paddingTop: '15vh',
    paddingBottom: '5vh'
},
shapeFill3: {
 fill: '#f4f4f4',
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
  color: theme.palette.secondary.main,
  border: '2px #D9D2C6 solid',
  '&:hover': {
      background: theme.palette.secondary.main,
      color: 'white',
        border: '2px #186858 solid',
    }
},
buton2: {
  margin: '20px 0',
  color: '#fff',
  border: '2px #D9D2C6 solid',
'&:hover': {
    background: '#fff',
    color: 'rgba(190,66,81,1)',
    border: '2px #fff solid',
  }
},
press: {
  display: 'flex',
  justifyContent:'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '100px 40px'
},
pressTitle:{
 textTransform: 'uppercase',

},
}));
const apiURL = process.env.REACT_APP_API;
const Manifest = ({messages, locale}) => {
  const classes = useStyles();
  const [manifest, setManifest] = useState();

  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=manifest&lang=' + locale;
    const getManifest = async () => {
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
              setManifest(data[0]);
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
    getManifest();
  }, [locale]);
  return (
    <>
    <Box className={classes.homeHader}>
      <Box className={classes.homeHaderBg}>
      <Container maxWidth='false' >
        <Typography className={classes.tileHead} variant="h1" gutterBottom>{messages.info.we_are}</Typography>
      </Container>
      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg2} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={classes.shapeFill}></path>
        </svg>
      </Box>
      </Box>
    </Box>
  <Box id={messages.menu.manifest} className={classes.manifest} >
  <Container  maxWidth='false'>
    <Typography variant="h4" gutterBottom>{messages.info.we_create}</Typography>
    <br/><br/>
    {manifest && <ReactMarkdown children={manifest.header} />}
    <br/><br/>
      <ButtonGroup color="secondary" aria-label="outlined secondary button group">
        <Button size="large" className={classes.buton1} startIcon={<PictureAsPdfIcon />}>{messages.press.presentation} </Button>
        <Button size="large" className={classes.buton1} startIcon={<PermMediaIcon />}>{messages.press.presskit}</Button>
        <Button size="large" className={classes.buton1} startIcon={<PermMediaIcon />}>{messages.press.branding}</Button>
      </ButtonGroup>
  </Container>

  </Box>
  </>
)
};
const History =({messages, locale, historyFeed, goToCommunity}) => {
  const [history, setHistory] = useState();
  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=history&lang=' + locale;
    const getHistory = async () => {
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
              setHistory(data[0]);
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
    getHistory();
  }, [locale]);

  const classes = useStyles();
  return (
  <Box id={messages.menu.history} className={classes.history}>
    <Container maxWidth='md'>
    {history && <ReactMarkdown children={history.header} />}
      <Button primary  onClick={goToCommunity} labelPosition='right' icon='down arrow' content={messages.create.meet_comunity} />
    </Container>
  </Box>
)
};


const Community =({goToCommunity, messages, locale}) => {
  const classes = useStyles();
  const [community, setCommunity] = useState();
  let history = useHistory();
  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=community&lang=' + locale;
    const getCommunity = async () => {
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
              setCommunity(data[0]);
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
    getCommunity();
  }, [locale]);

  return (
    <Box id={messages.menu.community} className={classes.community}>
    <Box className={classes.communityBg}>
    <Container className={classes.communityContainer}>
      <Grid container spacing={8}  className={classes.communityGrid}>
        <Grid item  xs={6}>
            <ContactForm style={{textAlign: 'left'}} messages={messages} />
        </Grid>

        <Grid item  xs={6}>
            {community && <ReactMarkdown children={community.header} /> }
            <Button onClick={() => history.push('/'+messages.menu.community)} size="large" className={classes.buton2} >{messages.create.meet_comunity}</Button>
        </Grid>
      </Grid>
      </Container>
    </Box>
    </Box>
)};

const Press =({goToArticle, history, messages}) => {
  const classes = useStyles();
  return (
  <Box id={messages.menu.press} className={classes.press} >
      <Container maxWidth='false'>
        <Typography color='primary' align='center' className={classes.pressTitle} variant='h3'>{messages.menu.press}</Typography>
        <Articles insert limit={4} tags={['Press']} history={history}/>
        <Button primary  onClick={goToArticle} labelPosition='right' icon='arrow right' content={messages.info.more_articles}  />
      </Container>
  </Box>
)};

const  Info = (props) => {
  const goToCommunity = () => props.history.push('/Community')
  const {messages, locale} = props.intl;
  const {hash} = useLocation();
    return (
      <Box id={messages.menu.info} className="main" >
        <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.manifest)}>
        </ScrollIntoViewIfNeeded>
        <Manifest messages={messages} locale={locale}/>
        <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.history)}>
          <History messages={messages} locale={locale} goToCommunity={goToCommunity}/>
        </ScrollIntoViewIfNeeded>
        <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.community)}>
          <Community  goToCommunity={goToCommunity}  locale={locale} messages={messages}/>
        </ScrollIntoViewIfNeeded>
        <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.press)}>
          <Press messages={messages} history={props.history}/>
        </ScrollIntoViewIfNeeded>
      </Box>
    );
};

export default injectIntl(Info);
