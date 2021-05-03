import React, { Component } from 'react';
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
    GridList,
    GridListTile,
    makeStyles
  } from '@material-ui/core';

import Image from 'material-ui-image';

import { injectIntl, defineMessages  } from 'react-intl';
import Stories from './stories/stories.js';

import { Blob } from 'react-blob';


import { ReactComponent as Svg1 } from './../assets/images/svg/mask1.svg';
import { ReactComponent as Svg2 } from './../assets/images/svg/mask2.svg';
import { ReactComponent as Svg3 } from './../assets/images/svg/mask3.svg';
import { ReactComponent as Svg4 } from './../assets/images/svg/mask4.svg';
import { ReactComponent as Svg5 } from './../assets/images/svg/mask5.svg';
import { ReactComponent as Svg6 } from './../assets/images/svg/mask6.svg';

import { ReactComponent as Bg1 } from './../assets/images/svg/bow-bg1.svg';
import { ReactComponent as Bg2 } from './../assets/images/svg/bow-bg2.svg';
import { ReactComponent as Bg3 } from './../assets/images/svg/bow-bg3.svg';

import Bg4 from './../assets/images/svg/rectangle-bg.svg';
import Bg5 from './../assets/images/svg/rectangle-bg2.svg';


const homeTraductions = defineMessages({
  title: {
    id: 'home.title',
    defaultMessage: 'Art and urban culture'
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
    id: 'home.we_connet',
    defaultMessage: 'We connect people with their territories and revalue their own narratives through art and digital technologies.'
  },

});
// An array of parallax effects to be applied - see below for detail
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
paper: {
  padding: theme.spacing(3),
  background: '#EEEFEC',
},
paper2:{
  padding: 0,
  margin: 0,
  borderRadius: 8,
  overflow: 'hidden',
  height: 232,
},
tile: {
  display:'flex',
  flexDirection: 'column',
  justifyContent:'center',
  color: 'white',
  minHeight: 232,
  backgroundSize: 'cover',
},
blob: {
  paddingTop: '120px',
},
button1: {
  color: '#C33949',
  border: '1px #D9D2C6 solid',
  '&:hover': {
      background: '#C33949',
      color: 'white',
        border: '1px #C33949 solid',
    }
},
button2: {
  color: '#186858',
  border: '1px #D9D2C6 solid',
  '&:hover': {
      background: '#186858',
      color: 'white',
        border: '1px #186858 solid',
    }
  },
button3: {
  color: '#EEEFEC',
  border: '1px #D9D2C6 solid',
  '&:hover': {
      background: '#EEEFEC',
      color: '#333',
        border: '1px #EEEFEC solid',
    }
  },
button4: {
  color: '#009999',
  border: '1px #D9D2C6 solid',
  '&:hover': {
      background: '#009999',
      color: 'white',
        border: '1px #009999 solid',
    }
},
gridList: {
   height: 'inherit',
},
placeholderBlock: {
  paddingTop: '30vh',
  paddingBottom: '2vh',
  paddingLeft: '15vh',
  paddingRight: '15vh',
},
poligons: {
  padding: 25,
},
poligons2:{
  padding: 10,
},
dividerShape: {
  position: 'absolute',
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
homeHader:{
  display: 'flex',
  flexFlow: 'column wrap',
  minHeight: '80vh',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  backgroundColor: '#ccc',
  color: 'white',
  backgroundSize: 'cover',
  backgroundPositionY: 'center',
  backgroundImage: `url(../assets/images/pages/home.jpg})`,
},
tileHead: {
    margin: 0,
    maxWidth: '55vw',
    padding: '8vh 8vh 38vh',
  },
}));

const HomeHeaderBlock = ({messages}) => {
  const classes = useStyles();
  return (
  <div className={classes.root}>
    <Box id="HomeHeaderBlock" className={classes.homeHader}>
      <Container maxWidth='xs' className={classes.tileHead}>
            <Typography gutterBottom color="textPrimary" variant="h1" >{messages.home.title}</Typography>
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
    <Container className="app" maxWidth="lg">
    <Box className={classes.end}>
      <Grid container spacing={1}>
        <Grid item xs>
        <Blob size="50vw" style={{ zIndex: 1, backgroundColor: '#E18C23', background:'linear-gradient(0deg, #C33949 0%, #E18C23 100%)' }} >
                <Blob size="45vw" src="../assets/images/pages/home-app-blob.jpg" il/>
              </Blob>
        </Grid>
        <Grid item xs className={classes.wrapper}>
            <Card elevation={0} className={classes.root}>
            <CardContent>
              <Typography gutterBottom variant="h2" >{messages.home.take_a_tour}</Typography>
              <Typography gutterBottom variant="h4" >{messages.home.enjoy_the_experience}</Typography>
            </CardContent>
            <CardActions>
              <Button href="/explore#Download-App" className={classes.button1}>{messages.home.download_app_btn}</Button>
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
return (
  <div className="who">
    <Box className={classes.wrapper}>
    <Svg1 className={classes.poligons2} />  <Svg2 className={classes.poligons}  /> <Svg3 className={classes.poligons2}  /> <Svg4 className={classes.poligons}  />   <Svg5 className={classes.poligons2}  /> <Svg6 className={classes.poligons}  />
    </Box>

    <Container className="about" maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs>
            <Card className={classes.root} elevation={0}>
            <CardContent>
              <Typography gutterBottom color="textSecondary" variant="h2" >{messages.home.we_are}</Typography>
              <Typography gutterBottom color="textSecondary" variant="h4" >{messages.home.we_connect}</Typography>
            </CardContent>
            <CardActions>
              <Button href="/conenct" className={classes.button4}>{messages.home.join_btn}</Button> <Button href="/create#Community" className={classes.button2} color="primary">{messages.home.know_btn}</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md>
          <Box className={classes.blob}>
          <Blob size="50vh" style={{ zIndex: 1, backgroundColor: '#388e3c', background:'linear-gradient(0deg, #388e3c 0%, #009999 100%)' }}>
                <Blob size="45vh" src="../assets/images/pages/home-we-are.jpg" />
              </Blob>
          </Box>
        </Grid>
      </Grid>
      </Container>
    </div>
)};
const PlaceholderBlock = ({messages}) => {
  const classes = useStyles();
  const tileData2 = [
 {
     src: "../assets/images/pages/home-gallery1.jpg",
     title: 'Image',
     author: 'author',
     cols: 1,
   },
   {
     src: "../assets/images/pages/home-gallery2.jpg",
     title: 'Image',
     author: 'author',
     cols: 1,
   },
   {
     src: "../assets/images/pages/home-gallery3.jpg",
     title: 'Image',
     author: 'author',
     cols: 1,
   }
 ];
  const tileData = [
 {
     src: "../assets/images/pages/home-gallery4.jpg",
       title: 'Image',
       author: 'author',
       cols: 1,
     },
     {
       src: "../assets/images/pages/home-gallery5.jpg",
       title: 'Image',
       author: 'author',
       cols: 1,
     },
     {
       src: "../assets/images/pages/home-gallery6.jpg",
       title: 'Image',
       author: 'author',
       cols: 1,
     },
 ];
return (
  <div>
  <Container className={classes.placeholderBlock} maxWidth="xl" >
    <GridList cellHeight={232} className={classes.gridList} cols={5}>
         {tileData.map((tile,i) => (
           <GridListTile key={i} cols={tile.cols || 1}>
              <Box elevation={0}  className={classes.paper2}>
                  <Image src={tile.src} alt={tile.title} />
               </Box>
           </GridListTile>
         ))}
         <Grid item cols={2}>
           <Paper elevation={0}  className={classes.tile} style={{alignItems:'center', backgroundImage: `url(${Bg4})` }} >
               <Typography gutterBottom align="center" color="textPrimary" variant="h4">{messages.home.download_app}</Typography>
               <Button className={classes.button3} variant="outlined" color="primary">{messages.home.enjoy_btn}</Button>
           </Paper>
         </Grid>
      <Grid item xs>
        <Paper elevation={0}  className={classes.tile} style={{alignItems:'center', backgroundImage: `url(${Bg5})` }} >
            <Typography gutterBottom align="center" color="textPrimary" variant="h4">{messages.home.create_togheter}</Typography>
            <Button href="/Collaborate#Support-a-story" className={classes.button3}  variant="outlined" color="primary">{messages.home.support_a_story_btn}</Button>
        </Paper>
        </Grid>
           {tileData2.map((tile,i) => (
             <GridListTile key={i} cols={tile.cols || 1}>
                <Paper elevation={0}  className={classes.paper2}>
                    <Image src={tile.src} alt={tile.title} />
                 </Paper>
             </GridListTile>
           ))}
         </GridList>
      </Container>
    </div>
)};
class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trad: homeTraductions,
      markdown: null
    }
  }
  componentDidMount() {
    // update authenticated state on logout
  }
  render() {
    const {messages} = this.props.intl;
    return (
      <Box id='home' className="main" >
        <HomeHeaderBlock messages={messages}/>
        <WhoAreWe messages={messages} />
        <Stories messages={messages} history={this.props.history}/>
        <PlaceholderBlock messages={messages} />
    </Box>
    )
  }
};

export default injectIntl(HomePage);
