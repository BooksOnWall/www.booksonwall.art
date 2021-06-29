import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Card,
  CardActions,
  Grid, Button, Container, Box } from '@material-ui/core';
import  ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { injectIntl, defineMessages  } from 'react-intl';
import {Helmet} from "react-helmet";
import { useLocation, useHistory } from 'react-router-dom';
import { useReactive } from '../utils/reactive';
import clsx from 'clsx';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { Blob } from 'react-blob';

import { Images } from './../assets/images/pages';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  media: {
    height: 220,
    borderRadius: 10,
    marginBottom: 16
  },
  card: {
    backgroundColor: 'transparent'
  },
  CardActionArea:{
    borderRadius: 10,
  },
  containerGrid: {
    minHeight: '100vh',
    justifyContent: 'space-around'
  },
    gridItemALarge:{
        marginTop: '10vh'
    },
    gridItemAMedium:{},
    gridItemASmall:{
      marginTop: '5vh',
      padding: '0 3vw'
    },
  gridItemB: {
    alignItems: "flex-end",
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-end',
    justifyContent: 'flex-end,'
  },
  gridItemBLarge:{
    marginTop: '30vh'
  },
  gridItemBMedium:{
        marginTop: '10vh',
        padding: '0 3vw'
  },
  gridItemBSmall:{
        marginTop: '0vh',
        padding: '0 2vw'
  },
  titleTop: {
     maxWidth: 900,
     padding: '0vh'
  },
    titleTopWrapper: {
    padding: '40px 8vh 8vh',
  },
    titleTopWrapperSmall:{
    padding: '40px 2vh 0vh',
  },
  title: {
     maxWidth: 1480,
     padding: '0 4vw'
  },
  collaborateHader: {
    display: 'flex',
    flexFlow: 'column wrap',
    minHeight: '50vh',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#ccc',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
  },
  bgLarge: {
    backgroundImage: `url(${Images.image22.default})`,
    backgroundPosition: '80% center',
    minHeight: '55vh',
  },
  bgMedium:{
    backgroundImage: `url(${Images.image22.default})`, //cambiar
  },
  bgSmall:{
    backgroundImage: `url(${Images.image22.default})`, //cambar
    backgroundPosition: '80% center',
    minHeight: '90vh',
  },
  button1: {
    margin: '30px 0',
    color: '#186858',
    border: '2px #D9D2C6 solid',
    '&:hover': {
        background: '#186858',
        color: 'white',
          border: '2px #186858 solid',
      }
  },
  button2: {
    margin: '40px 0',
    color: theme.palette.primary.main,
    border: '2px #D9D2C6 solid',
    '&:hover': {
        background: '#C33949',
        color: 'white',
          border: '2px #C33949 solid',
      }
    },
    button3: {
      margin: '0',
      color: theme.palette.primary.main,
      border: '2px #D9D2C6 solid',
      '&:hover': {
          background: '#C33949',
          color: 'white',
            border: '2px #C33949 solid',
        }
      },
    bottom2: {
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
    },
    top:{
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      alignContent: 'flex-end',
    },
    gradient: {
      background: theme.palette.primary.darkGradient,
      display: "flex",
      minHeight: '55vh',
      flexDirection: 'column',
      width: '100vw',
      justifyContent: 'flex-end',
    },
    gradientLarge: {
    },
    gradientMedium:{
      minHeight: '90vh',
    },
    gradientSmall:{
      minHeight: '90vh',
    },
    dividerShape: {
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: 'rotate(180deg)',
      alignSelf: "flex-end"
    },
    shapeFill: {
     fill: '#fafafa',
    },
    dividerSvg: {
    position: 'relative',
    display: 'block',
    width: 'calc(151% + 1.3px)',
    height: '70px',
    },
  blobA: {
     zIndex: 1,
     backgroundColor: theme.palette.primary.main,
     background: theme.palette.primary.mainGradient,
     maxWidth: '800px',
     maxHeight: '800px',
     padding: 15,
     marginBottom: '50px',
  },
  blobB: {
    background: theme.palette.primary.darkGradient,
    marginBottom: '50px',
    maxWidth: '650px',
    maxHeight: '650px',
    padding: 15,
  },
  blobIn:{
    maxWidth: '800px',
    maxHeight: '800px',
    padding: 20
  },
  blobText: {
     maxWidth: 780,
  },
  servicesTitleWrap:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '12vh'
  },
  servicesWrap:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding:'4vw 0'
  },
  servicesGrid:{
    justifyContent: 'space-evenly'
  },
  servicesGridLarge:{
    padding:'2vw'
  },
  servicesGridMedium:{
    padding:'3vw'
  },
  servicesGridSmall:{
    padding:'0 3vw'
  },
  serviceImage:{
  }
}));

const collaborateTraductions = defineMessages({
  title: {
    id: 'collaborate.title',
    defaultMessage: 'Together we can revalorate and resignify your city. Using Arte and New Technologies.'
  },
   fund_a_story: {
    id: 'collaborate.fund_a_story',
    defaultMessage: 'Fund a story'
  },
  create_new_story: {
    id: 'collaborate.create_new_story',
    defaultMessage: "Let's create a new story together in your city. Help us finance a BooksOnWall story and promote culture, heritage, territorial identity and technological innovation."
  },
  join_us: {
    id: 'collaborate.join_us',
    defaultMessage: 'Be a partner'
  },
  strategic_partner: {
    id: 'collaborate.strategic_partner',
    defaultMessage: 'We are looking for strategic partners who want to participate and contribute to the growth of BooksOnWall.'
  },
  looking_for: {
    id: 'collaborate.looking_for',
    defaultMessage: 'A unique connection with the creative industries: literary creation, audiovisual, music, plastic and visual arts with the city and its historical, cultural and social contents.',
  },
  read_more_btn:{
  id: 'collaborate.read_more_btn',
  defaultMessage: 'Read More',
  },
  how: {
    id: 'collaborate.how',
    defaultMessage: 'How to become a partner'
  },
  we_produce:{
    id: 'collaborate.we_produce',
    defaultMessage: 'We produce, direct and manage extended reality proyect.'
  },
  we_are:{
    id: 'collaborate.we_are',
    defaultMessage: 'We are a community of expert in art, media and contemporary technologies'
  }
});

const CollaborateHeader = ({messages}) => {
  const classes = useStyles();
  const {isLarge, isMedium } = useReactive();
  const bg = (isLarge) ? 'bgLarge' : (isMedium) ? 'bgMedium' : 'bgSmall';
  const gradient = (isLarge) ? 'gradientLarge' : (isMedium) ? 'gradientMedium' : 'gradientSmall';
  const titleTopWrapper = (isLarge) ? 'titleTopWrapperLarge' : (isMedium) ? 'titleTopWrapperMedium' : 'titleTopWrapperSmall';

return (
  <Box className={clsx(classes.collaborateHader, classes[bg])}>
    <Box className={clsx(classes.gradient, classes[gradient])}>
    <Box className={clsx(classes.titleTopWrapper, classes[titleTopWrapper])} >
      <Typography className={classes.titleTop} gutterBottom variant="h2" component="h1"> {messages.collaborate.title}</Typography>
    </Box>
    <Box className={classes.dividerShape}>
      <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={classes.shapeFill}></path>
      </svg>
    </Box>
    </Box>
  </Box>
)};
const SupportStory = ({messages, lang, active}) => {
  const classes = useStyles();
  const [services, setServices] = useState([]);
  const apiURL = process.env.REACT_APP_API;
  const format = 'thumbnail';
  let history = useHistory();
  const {hash} = useLocation();
  const {isLarge, isMedium, isSmall } = useReactive();
  const gridItemA = (isLarge) ? 'gridItemALarge' : (isMedium) ? 'gridItemAMedium' : 'gridItemASmall';
  const gridItemB = (isLarge) ? 'gridItemBLarge' : (isMedium) ? 'gridItemBMedium' : 'gridItemBSmall';
  const servicesGrid = (isLarge) ? 'servicesGridLarge' : (isMedium) ? 'servicesGridMedium' : 'servicesGridSmall';
  const btnSmall = (isSmall) ? true : false ;

  useEffect(() => {
    const getServices = async () => {
      try {

        const fetchURL = apiURL + '/services?_limit=-1&_sort=published_at:DESC&lang='+lang;
        await fetch(fetchURL, {
          method: "get",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Host': 'backoff.booksonwall.art'
          }
        })
        .then(response => {
          if (response && !response.ok) { throw new Error(response.statusText);}
          return response.json();
        })
        .then(data => {
            if(data) {
              setServices(data.map((c,i) => ({id: c.id, header: c.header, header_image: c.header_image, name:c.Name})));
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
    getServices();
  }, [apiURL, lang]);
if(services && services.length >0) console.log('service.header_image', services[4].header_image)
return (
  <Box className={classes.root}>
  <Box>
    <Container  maxWidth='false'>

      <Grid container spacing={4} className={classes.containerGrid}>
            <Grid item className={clsx(classes.gridItemA, classes[gridItemA])}>
            <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.support)}>
            </ScrollIntoViewIfNeeded>

              <Blob className={classes.blobA}>
                  <Blob className={classes.blobIn} src={Images.image11.default} />
              </Blob>
                <Typography gutterBottom variant="h2" component="h3" className={classes.blobText}>{messages.collaborate.fund_a_story}</Typography>
                <Typography gutterBottom  variant="h4" component="h4" className={classes.blobText}>{messages.collaborate.create_new_story}</Typography>
                <Button onClick={() => history.push('/'+messages.menu.support)} size={(btnSmall) ? 'small' : 'large'} className={classes.button1}>{messages.collaborate.read_more_btn}</Button>

            </Grid>

            <Grid item className={clsx(classes.gridItemB, classes[gridItemB])}>
              <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.associate)}>
              </ScrollIntoViewIfNeeded>
              <Blob  className={classes.blobB}>
                  <Blob className={classes.blobIn} src={Images.image1.default} />
              </Blob>
                <Typography align="right" gutterBottom variant="h2" component="h3" className={classes.blobText}>{messages.collaborate.join_us}</Typography>
                <Typography align="right" gutterBottom variant="h4" component="h4" className={classes.blobText}>{messages.collaborate.strategic_partner}</Typography>
                <Typography align="right" gutterBottom variant="subtitle1" className={classes.blobText}>{messages.collaborate.looking_for}</Typography>
                <Button onClick={() => history.push('/'+messages.menu.partner)} size={(btnSmall) ? 'small' : 'large'} className={classes.button2}>{messages.collaborate.how}</Button>
              </Grid>
          </Grid>
    </Container>
<br /><br /><br />
    <Container maxWidth="xl" className={classes.servicesWrap}>
      <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.develop)}>
        <Box className={classes.servicesTitleWrap}>
          <Typography align='center' className={classes.title}  gutterBottom  variant="h1" component="h3" >{messages.menu.develop}</Typography>
          <Typography align='center' className={classes.title}  gutterBottom  variant="h4" >{messages.collaborate.we_produce}</Typography>
          <Typography align='center' className={classes.title} gutterBottom  variant="subtitle1" >{messages.collaborate.we_are}</Typography>
        </Box>
      </ScrollIntoViewIfNeeded>
        <Grid container spacing={10} className={clsx(classes.servicesGrid, classes[servicesGrid])}>
        {services && services.map((s,i) => (
          <Grid item xs={12/1} md={12/3} xl={12/3} key={'s'+i}>
            <Card className={classes.card} elevation={0} key={'article'+i}>
              <CardActionArea className={classes.CardActionArea} onClick={() => history.push("/"+messages.menu.service+"/"+s.name) } >
               <CardMedia
                 className={classes.media}
                 image={(s.header_image) ? apiURL + s.header_image.formats[format].url: null}
                 title={s.name}
               />
               <CardContent className={classes.CardContent} >
                 <Typography gutterBottom variant="h6" component="h3">
                   {s.name}
                 </Typography>
                 <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                   <ReactMarkdown remarkPlugins={[gfm]} children={s.header} />
                 </Typography>
               </CardContent>
             </CardActionArea>
             <CardActions className={classes.CardActions}>
                <Button className={classes.button} color="primary" size="small" onClick={() => history.push("/"+messages.menu.service+"/"+s.name)} >{messages.stories.read_more_btn}</Button>
             </CardActions>
          </Card>
        </Grid>
        ))}
        <Button onClick={() => history.push("/"+messages.menu.services)} size={(btnSmall) ? 'small' : 'large'} className={classes.button3}>{messages.collaborate.read_more_btn}</Button>
      </Grid>
    </Container>

  </Box>
</Box>
)};

const Collaborate = (props) => {
    const {messages, locale} = props.intl;
    const {hash} = useLocation();
    return (
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages.menu.collaborate}</title>
        <meta name="description" content="This is collaborate page" />
        <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.collaborate} />
      </Helmet>
      <Box id="collabora">
        <ScrollIntoViewIfNeeded active={(!hash)}>
          <CollaborateHeader messages={messages}/>
        </ScrollIntoViewIfNeeded>
        <SupportStory lang={locale} messages={messages} active={(hash && hash.substring(1) === messages.menu.develop)}/>
     </Box>
     </>
    )
};

export default injectIntl(Collaborate);
