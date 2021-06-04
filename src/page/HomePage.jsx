import React, { useState } from 'react';
import {
    Grid,
    Box,
    Container,
    Paper,
    CardContent,
    Typography,
    Card,
    CardActions,
    Button,
    makeStyles
  } from '@material-ui/core';

import Image from 'material-ui-image';
import loadable from '@loadable/component';
import { useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { injectIntl, defineMessages  } from 'react-intl';

import {Images}  from '../assets/images/pages/index';

import { Blob } from 'react-blob';

import Home from "../assets/images/pages/home.jpg";
import Blob1 from "../assets/images/pages/home-app-blob.jpg";
import Blob2 from "../assets/images/pages/home-we-are.jpg";

import { ReactComponent as Svg1 } from '../assets/images/svg/mask1.svg';
import { ReactComponent as Svg2 } from '../assets/images/svg/mask2.svg';
import { ReactComponent as Svg3 } from '../assets/images/svg/mask3.svg';
import { ReactComponent as Svg4 } from '../assets/images/svg/mask4.svg';
import { ReactComponent as Svg5 } from '../assets/images/svg/mask5.svg';
import { ReactComponent as Svg6 } from '../assets/images/svg/mask6.svg';

import { ReactComponent as Bg1 } from '../assets/images/svg/bow-bg1.svg';
import { ReactComponent as Bg2 } from '../assets/images/svg/bow-bg2.svg';
import { ReactComponent as Bg3 } from '../assets/images/svg/bow-bg3.svg';

import Bg4 from '../assets/images/svg/rectangle-bg.svg';
import Bg5 from '../assets/images/svg/rectangle-bg2.svg';

const Stories = loadable(() => import('./stories/stories'));
const Articles = loadable(() => import('./articles/Articles'));

const homeTraductions = defineMessages({
  title: {
    id: 'home.title',
    defaultMessage: 'Immersive storytelling through art and urban culture'
  },
  enjoy: {
    id: 'home.enjoy_the_experience',
    defaultMessage: 'Enjoy a hypermedia experience and live a story through urban art!'
  },
  take_a_tour: {
    id: 'home.take_a_tour',
    defaultMessage: 'Take a tour through the city with the BooksOnWall App.'
  },
  we_are : {
    id: 'home.we_are',
    defaultMessage: 'We are a creative collective that tells stories around the world.'
  },
  we_connect: {
    id: 'home.we_connect',
    defaultMessage: 'We connect people with their territories and revalue their own narratives through art and digital technologies.'
  },
  support_a_story_btn: {
    id: 'home.support_a_story_btn',
    defaultMessage: "Support a Story"
  },
  create_togheter: {
    id: 'home.create_togheter',
    defaultMessage: "Let's create a fantastic story"
  },
  download_app: {
    id: 'home.download_app',
    defaultMessage: "Download Booksonwall AR"
  },
  download_app_btn: {
    id: 'home.download_app_btn',
    defaultMessage: "Donwaload now"
  },
  enjoy_btn: {
    id: 'home.enjoy_btn',
    defaultMessage: 'Enjoy the experience'
  },
  join_btn: {
    id: 'home.join_btn',
    defaultMessage: "Join Us"
  },
  know_btn: {
    id: 'home.know_btn',
    defaultMessage: "Know our community"
  },
});
// An array of parallax effects to be applied - see below for detail
const useStyles = makeStyles((theme) => ({
root: {
  flexGrow: 1,
  with: '100vw',
  overflow: 'hidden'
},
wrapperBlob:{
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
},
wrapperGrid: {
  display: 'flex',
  zIndex: 999,
  minWidht: '50%',
  padding: 50
},
bgLeft:{
  backgroundImage: `url(${Bg1})`,
  backgroundRepeat: 'repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'left center',
},
bgRight:{
  backgroundImage: `url(${Bg2})`,
  backgroundRepeat: 'repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'left center',
},
paperGallery: {
  padding: theme.spacing(0),
  background: '#EEEFEC',
  borderRadius: 0,
  overflow: 'hidden'
},
card:{
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 650,
  marginLeft: '3vw'
},

imageGaller:{
  borderRadius: 0,
},
tile: {
  display:'flex',
  flexDirection: 'column',
  justifyContent:'center',
  color: 'white',
  minHeight: 400,
  padding: '30px',
  backgroundSize: 'cover',
  borderRadius: 0,
  margin: 0,

},
blob: {
  padding: '120px 30px 30px',
  overflow: 'hidden'
},
button1: {
  margin: 10,
  color: theme.palette.primary.main,
  border: '2px #D9D2C6 solid',
  padding: '10px 20px',
  '&:hover': {
      background: '#C33949',
      color: 'white',
        border: '2px #C33949 solid',
    }
},
button2: {
  margin: 10,
  color: theme.palette.secondary.main,
  border: '2px #D9D2C6 solid',
  padding: '10px 20px',
  '&:hover': {
      background: theme.palette.secondary.main,
      color: 'white',
        border: '2px #186858 solid',
    }
  },
button3: {
  margin: 10,
  color: '#EEEFEC',
  border: '2px #D9D2C6 solid',
  padding: '10px 20px',
  '&:hover': {
      background: '#EEEFEC',
      color: '#333',
        border: '2px #EEEFEC solid',
    }
  },
button4: {
  margin: 10,
  color: theme.palette.secondary.light,
  border: '2px #D9D2C6 solid',
  padding: '10px 20px',
  '&:hover': {
      background: theme.palette.secondary.light,
      color: 'white',
        border: '2px #009999 solid',
    }
},

poligon: {
display: 'flex',
flexGrow: 1,
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
minHeight: '50vh',
padding: 80
},
poligons: {
  padding: 0,
  minWidht: 300,
  minHeight: 300,
  flex: '2 1 10%',
  alignSelf: 'flex-start',

},
poligons2:{
  flex: '2 1 16%',
  padding: '0',
  alignSelf: 'flex-end',
  minWidht: 450,
  minHeight: 450,
  maxWidth: 450
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
blobA: {
   zIndex: 1,
   backgroundColor: '#E18C23',
   background: theme.palette.primary.mainGradient,
   maxWidth: '850px',
   maxHeight: '850px'
},
blobB: {
   zIndex: 1,
   backgroundColor: '#E18C23',
   background: theme.palette.secondary.mainGradient,
   maxWidth: '850px',
   maxHeight: '850px'
},
homeHader:{
  display: 'flex',
  flexFlow: 'column wrap',
  minHeight: '90vh',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  backgroundColor: '#ccc',
  color: 'white',
  backgroundSize: 'cover',
  backgroundPositionY: 'center',
  backgroundImage: `url(${Home})`,
  padding: 0,
  margin: 0
},
tileHead: {
    margin: 0,
    maxWidth: '850px',
    padding: '0 8vh 10vh',
  },
}));

const HomeHeaderBlock = ({messages, theme}) => {
  const classes = useStyles();
  let history = useHistory();
  return (
  <div className={classes.root}>
    <Box id="HomeHeaderBlock" className={classes.homeHader}>
      <Container maxWidth='xs' className={classes.tileHead}>
            <Typography gutterBottom color="textSecondary" variant="h1" >{messages.home.title}</Typography>
      </Container>
      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
            <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
        </svg>
      </Box>
    </Box>
    <Box className='bg1'><Bg1 /></Box>
    <Box className='bg2'><Bg2 /></Box>
    <Box className='bg3'><Bg3 /></Box>
    <Container maxWidth="xl" className={classes.wrapperBlob}>
    <Box>

      <Grid container spacing={8}>

        <Grid item  xs={6}>
          <Blob className={classes.blobA} size="50vw" >
            <Blob size="88%" src={Blob1} />
          </Blob>
        </Grid>

        <Grid item xs={6} className={classes.wrapperGrid}>
            <Card elevation={0} className={classes.card}>
              <CardContent>
                <Typography  gutterBottom variant="h2" >{messages.home.take_a_tour}</Typography>
                <Typography gutterBottom variant="h4" >{messages.home.enjoy_the_experience}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => history.push('/'+messages.menu.explore+'#'+messages.menu.download_app)} className={classes.button1}>{messages.home.download_app_btn}</Button>
              </CardActions>
            </Card>
        </Grid>

      </Grid>

      </Box>
      </Container>
    </div>
)};

const WhoAreWe = ({messages}) => {
  const classes = useStyles();
  let history = useHistory();
return (
  <div className={classes.root}>
  <Box  className={classes.poligon}>
      <Svg1 className={classes.poligons2} />  <Svg2 className={classes.poligons}  /> <Svg3 className={classes.poligons2}  /> <Svg4 className={classes.poligons}  />   <Svg5 className={classes.poligons2}  /> <Svg6 className={classes.poligons}  />
    </Box>

    <Container maxWidth="xl" className={classes.wrapperBlob}>
    <Box>

    <Grid container spacing={8}>

        <Grid item xs={6} >
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <Typography gutterBottom color="textPrimary" variant="h2" >{messages.home.we_are}</Typography>
              <Typography gutterBottom color="textPrimary" variant="h4" >{messages.home.we_connect}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => history.push('/'+messages.menu.connect+"#"+messages.menu.register)} className={classes.button4}>{messages.home.join_btn}</Button>
              <Button onClick={() => history.push('/'+messages.menu.create+'#'+messages.menu.community)} className={classes.button2} color="primary">{messages.home.know_btn}</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item  xs={6} className={classes.wrapperGrid}>
          <Blob className={classes.blobB} size="50vw">
            <Blob size="88%" src={Blob2} />
          </Blob>
        </Grid>
      </Grid>
      </Box>
      </Container>
    </div>
)};
const PlaceholderBlock = ({messages}) => {
  const classes = useStyles();
  let history = useHistory();
  const tileData2 = [
 {
     img: Images.image4,
     title: 'Image',
     author: 'author',
     cols: 1,
   },
   {
     img: Images.image5,
     title: 'Image',
     author: 'author',
     cols: 1,
   },
   {
     img: Images.image6,
     title: 'Image',
     author: 'author',
     cols: 1,
   },
   {
     img: Images.image9,
     title: 'Image',
     author: 'author',
     cols: 1,
   }
 ];
  const tileData = [
 {
     img: Images.image14,
       title: 'Image',
       author: 'author',
       cols: 1,
     },
     {
       img: Images.image15,
       title: 'Image',
       author: 'author',
       cols: 1,
     },
     {
       img: Images.image16,
       title: 'Image',
       author: 'author',
       cols: 1,
     },
     {
       img: Images.image17,
       title: 'Image',
       author: 'author',
       cols: 1,
     },
 ];
return (
  <div>
  <Container className={classes.placeholderBlock} maxWidth="false" >
          <Grid container justify="center" spacing={0}>
            {tileData.map((tile,i) => (
              <Grid key={i} item xs={6} md={3}>
                <Paper className={classes.paperGallery} >
                <Image aspectRatio={1/1} className={classes.imageGaller} src={tile.img.default} alt={tile.title} />
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Grid container justify="center" spacing={0}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0}  className={classes.tile} style={{alignItems:'center', backgroundImage: `url(${Bg4})` }} >
                <Typography gutterBottom align="center" color="textSecondary" variant="h3">{messages.home.download_app}</Typography>
                <Button onClick={()=> history.push("/"+messages.menu.explore+"#"+messages.menu.download_app)} className={classes.button3} variant="outlined" color="primary">{messages.home.enjoy_btn}</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
             <Paper elevation={0}  className={classes.tile} style={{alignItems:'center', backgroundImage: `url(${Bg5})` }} >
               <Typography gutterBottom align="center" color="textSecondary" variant="h3">{messages.home.create_togheter}</Typography>
               <Button onClick={() => history.push("/"+messages.menu.collaborate+"#"+messages.menu.support)} className={classes.button3}  variant="outlined" color="primary">{messages.home.support_a_story_btn}</Button>
             </Paper>
            </Grid>
         </Grid>

          <Grid container justify="center" spacing={0}>
            {tileData2.map((tile,i) => (
              <Grid key={i} item xs={6} md={3}>
               <Paper className={classes.paperGallery} >
                  <Image aspectRatio={1/1} className={classes.imageGaller} src={tile.img.default} alt={tile.title} />
                </Paper>
              </Grid>
          ))}
          </Grid>
      </Container>
    </div>
)};
const HomePage = (props) => {

    const {messages} = props.intl;
    const [activeScroll, setActiveScroll] = useState('top');

    return (
      <>
      <ScrollIntoViewIfNeeded active={(activeScroll === 'top')}>
      </ScrollIntoViewIfNeeded>
      <Box id='home' className="main" >
        <HomeHeaderBlock messages={messages}/>
      <ScrollIntoViewIfNeeded active={(activeScroll === messages.menu.WhoAreWe)}>
        <WhoAreWe messages={messages} />
      </ScrollIntoViewIfNeeded>
      <ScrollIntoViewIfNeeded active={(activeScroll === messages.menu.articles)}>
        <Articles messages={messages} history={props.history} limit={10} insert/>
      </ScrollIntoViewIfNeeded>
        <ScrollIntoViewIfNeeded active={(activeScroll === messages.menu.block)}>
        <PlaceholderBlock messages={messages} />
      </ScrollIntoViewIfNeeded>
      <ScrollIntoViewIfNeeded active={(activeScroll === messages.menu.stories)}>
        <Stories messages={messages} history={props.history} limit={10} insert/>
      </ScrollIntoViewIfNeeded>
    </Box>
    </>
    )

};

export default injectIntl(HomePage);
