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
    Divider,
    makeStyles
  } from '@material-ui/core';
import {Helmet} from "react-helmet";
import { useReactive} from '../utils/reactive';
import Image from 'material-ui-image';
import loadable from '@loadable/component';
import { useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { injectIntl, defineMessages  } from 'react-intl';
import clsx from 'clsx';
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
button1: {
  margin: 10,
  color: theme.palette.primary.main,
  border: '2px #D9D2C6 solid',
  padding: '5px 10px',
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
  '&:hover': {
      background: theme.palette.secondary.main,
      color: 'white',
      border: '2px solid',
      borderColor: theme.palette.secondary.main
    }
  },
button3: {
  margin: 10,
  color: '#EEEFEC',
  border: '2px #D9D2C6 solid',
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
  '&:hover': {
      background: theme.palette.secondary.light,
      color: 'white',
      border: '2px solid',
      borderColor: theme.palette.secondary.light
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
dividerSvgSmall:{
  height: '60px',
},
wrapperBlob:{
  minHeight: '0vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: 50
},
wrapperGrid: {
  display: 'flex',
  zIndex: 999,
  minWidht: '50%',
  padding: '10px 50px'
},
gridBlob:{
  marginTop: 50,
  display: 'flex',
  justifyContent: 'center',
  minHeight: '65vh',
},
gridLarge:{
  margin: 0,
  padding: 0
},
gridMedium:{

},
gridSmall:{
  margin: 0,
  padding: 0
},
blobA: {
   zIndex: 1,
   backgroundColor: theme.palette.primary.main,
   background: theme.palette.primary.mainGradient,
   maxWidth: '1080px',
   maxHeight: '1080px',
   padding: 15
},
blobB: {
   zIndex: 1,
   backgroundColor: theme.palette.secondary.main,
   background: theme.palette.secondary.mainGradient,
   maxWidth: '1080px',
   maxHeight: '1080px'
},
blobIn:{
  maxWidth: '1040px',
  maxHeight: '1040px',
  with: '88%',
  height: '88%',
  padding: 20
},
homeHader:{
  display: 'flex',
  flexFlow: 'column wrap',
  minHeight: '70vh',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  backgroundColor: '#ccc',
  color: 'white',
  backgroundSize: 'cover',
  backgroundPositionY: 'center',
  padding: 0,
  margin: 0
},
bgLarge:{
  backgroundImage: `url(${Home})`,
},
bgMedium:{
  backgroundImage: `url(${Home})`, // falta imagen
},
bgSmall:{
  backgroundImage: `url(${Home})`, // falta imagen
  minHeight: '95vh',
  backgroundPosition: 'right',
},
tileHead: {
    margin: 0,
    maxWidth: '850px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  titleLarge: {
    padding: '0 8vh 10vh',
  },
  titleMedium:{
    padding: '0 4vh 10vh',
  },
  titleSmall: {
    padding: '0 3vh 4vh',
  },
  placeholderBlock:{
  marginTop: 150,
}
}));

const HomeHeaderBlock = ({messages, theme}) => {
  const classes = useStyles();
  let history = useHistory();
  const {isLarge, isMedium , isSmall} = useReactive();
  const bg = (isLarge) ? 'bgLarge' : (isMedium) ? 'bgMedium' : 'bgSmall';
  const title = (isLarge) ? 'titleLarge' : (isMedium) ? 'titleMedium' : 'titleSmall';
  const grid = (isLarge) ? 'gridLarge' : (isMedium) ? 'gridMedium' : 'gridSmall';
  const shape = (isSmall) ? 'dividerSvgSmall' : null ;
  const btnSmall = (isSmall) ? true : false ;
  const format = (isLarge) ? '8': (isMedium) ? '4': (isSmall) ? '2' : '2';

  return (
    <>
  <div className={classes.root}>

    <Box id="HomeHeaderBlock" className={clsx(classes.homeHader, classes[bg])}>
      <Container maxWidth='xs' className={clsx(classes.tileHead, classes[title])}>
            <Typography gutterBottom color="textSecondary" variant="h1" >{messages.home.title}</Typography>
      </Container>
      <Box className={classes.dividerShape}>
        <svg className={clsx(classes.dividerSvg, classes[shape])} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
            <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
        </svg>
      </Box>
    </Box>

    <Box className='bg1'><Bg1 /></Box>
    <Box className='bg2'><Bg2 /></Box>
    <Box className='bg3'><Bg3 /></Box>

    <Container maxWidth="false" className={classes.wrapperBlob}>
    <Box>
      <Grid container spacing={[format]}  >

        <Grid item  xs={12} md={6} className={clsx(classes.gridBlob, classes[grid])}>
          <Blob className={classes.blobA} >
            <Blob className={classes.blobIn} src={Blob1} />
          </Blob>
        </Grid>
        <Grid item xs={12} md={6} className={clsx(classes.wrapperGrid, classes[grid])}>
            <Card elevation={0} className={classes.card}>
              <CardContent>
                <Typography  gutterBottom variant="h2" component="h2" >{messages.home.take_a_tour}</Typography>
                <Typography gutterBottom variant="subtitle1" >{messages.home.enjoy_the_experience}</Typography>
              </CardContent>
              <CardActions>

              <Button size={(btnSmall) ? 'small' : 'large'} onClick={() => history.push('/'+messages.menu.explore+'#'+messages.menu.download_app)} className={classes.button1}>{messages.home.download_app_btn}</Button>

              </CardActions>
            </Card>
        </Grid>

      </Grid>

      </Box>
      </Container>
    </div>
    </>
)};

const WhoAreWe = ({messages}) => {
  const classes = useStyles();
  let history = useHistory();
  const {isLarge, isMedium , isSmall} = useReactive();
  const blobDistribution = (isSmall) ? true : false ;
  const poligonsDistribution = (isSmall) ? true : false ;
  const btnSmall = (isSmall) ? true : false ;
  const format = (isLarge) ? '8': (isMedium) ? '4': (isSmall) ? '2' : '2';
return (
  <>
  <div className={classes.root}>
  {!poligonsDistribution &&
    <Box  className={classes.poligon}>
      <Svg1 className={classes.poligons2} />  <Svg2 className={classes.poligons}  /> <Svg3 className={classes.poligons2}  /> <Svg4 className={classes.poligons}  />   <Svg5 className={classes.poligons2}  /> <Svg6 className={classes.poligons}  />
    </Box>
    }
    <Container maxWidth="xl" className={classes.wrapperBlob}>
    <Box>

    <Grid container spacing={[format]}>

        {blobDistribution &&
          <Grid item  xs={12} md={6} className={classes.gridBlob}>
            <Blob className={classes.blobB}>
              <Blob className={classes.blobIn} src={Blob2} />
            </Blob>
          </Grid>
        }
        <Grid item xs={12} md={6} className={classes.wrapperGrid}>
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <Typography gutterBottom color="textPrimary" variant="h2" >{messages.home.we_are}</Typography>
              <Typography gutterBottom color="textPrimary" variant="subtitle1" >{messages.home.we_connect}</Typography>
            </CardContent>
            <CardActions>
              <Button size={(btnSmall) ? 'small' : 'large'} onClick={() => history.push('/'+messages.menu.connect+"#"+messages.menu.register)} className={classes.button4}>{messages.home.join_btn}</Button>
              <Button size={(btnSmall) ? 'small' : 'large'} onClick={() => history.push('/'+messages.menu.create+'#'+messages.menu.community)} className={classes.button2} color="primary">{messages.home.know_btn}</Button>
            </CardActions>
          </Card>
        </Grid>

        {!blobDistribution &&
          <Grid item  xs={12} md={6} className={classes.gridBlob}>
            <Blob className={classes.blobB}>
              <Blob className={classes.blobIn} src={Blob2} />
            </Blob>
          </Grid>
        }
      </Grid>

      </Box>
      </Container>
    </div>
    </>
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
 const {isSmall} = useReactive();
 const btnSmall = (isSmall) ? true : false ;
return (
  <div>
  <Box className={classes.placeholderBlock} >
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
                <Typography gutterBottom align="center" color="textSecondary" variant="h2">{messages.home.download_app}</Typography>
                <Button  size={(btnSmall) ? 'small' : 'large'} onClick={()=> history.push("/"+messages.menu.explore+"#"+messages.menu.download_app)} className={classes.button3} variant="outlined">{messages.home.enjoy_btn}</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
             <Paper elevation={0}  className={classes.tile} style={{alignItems:'center', backgroundImage: `url(${Bg5})` }} >
               <Typography gutterBottom align="center" color="textSecondary" variant="h2">{messages.home.create_togheter}</Typography>
               <Button size={(btnSmall) ? 'small' : 'large'}  onClick={() => history.push("/"+messages.menu.collaborate+"#"+messages.menu.support)} className={classes.button3}  variant="outlined">{messages.home.support_a_story_btn}</Button>
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
      </Box>
    </div>
)};
const HomePage = (props) => {
    const reactive = useReactive();
    const {messages} = props.intl;
    const [activeScroll, setActiveScroll] = useState('top');
    return (
      <>
      <Helmet>
         <meta charset="utf-8" />
         <title>BooksOnWall</title>
         <meta name="description" content="This is home page" />
         <link rel="canonical" href={"https://www.booksonwall.art"} />
      </Helmet>
      <ScrollIntoViewIfNeeded active={(activeScroll === 'top')}>
      </ScrollIntoViewIfNeeded>
      <Box id='home' className="main" >
        <HomeHeaderBlock messages={messages}/>

      <ScrollIntoViewIfNeeded active={(activeScroll === messages.menu.WhoAreWe)}>
        <WhoAreWe messages={messages} />
      </ScrollIntoViewIfNeeded>

      <ScrollIntoViewIfNeeded active={(activeScroll === messages.menu.stories)}>
        <Box><Stories messages={messages} history={props.history} limit={(reactive.isLarge) ? 12 : (reactive.isMedium) ? 8 :  3} insert/> </Box>
      </ScrollIntoViewIfNeeded>

        <ScrollIntoViewIfNeeded active={(activeScroll === messages.menu.block)}>
        <Box> <PlaceholderBlock messages={messages} /> </Box>
      </ScrollIntoViewIfNeeded>

      <ScrollIntoViewIfNeeded active={(activeScroll === messages.menu.articles)}>
        <Box> <Articles messages={messages} history={props.history} limit={(reactive.isLarge) ? 4 : (reactive.isMedium) ? 4 :  3} insert/> </Box>
      </ScrollIntoViewIfNeeded>
    </Box>
    </>
    )

};

export default injectIntl(HomePage);
