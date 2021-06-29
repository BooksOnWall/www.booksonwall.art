import React, { forwardRef } from 'react';

import { injectIntl, defineMessages } from 'react-intl';
import {
    Typography,
//    Container,
    ButtonGroup,
    Box,
    Button,
    makeStyles
  } from '@material-ui/core';
import {Helmet} from "react-helmet";
import { useLocation } from 'react-router-dom';
import {useReactive} from "../utils/reactive";
import clsx from "clsx";
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';

import { Images } from '../assets/images/pages';
// import AppleIcon from '@material-ui/icons/Apple';
// import ShopIcon from '@material-ui/icons/Shop';
import GetAppIcon from '@material-ui/icons/GetApp';

import loadable from '@loadable/component';
const Faqs = loadable(() => import('./faqs/faqs'));
const Stories = loadable(() => import('./stories/stories'));

const exploreTraductions = defineMessages({
  header: {
    id: 'explore.header',
    defaultMessage: 'Come and live a story through urban art and new technologies!'
  },
  subheader: {
    id: 'explore.subheader',
    defaultMessage: 'Download BookSonWall AR to enjoy the stories and experience urban art and augmented reality.'
  },
  downloadDirect: {
    id: 'explore.downloadDirect',
    defaultMessage: "Download Booksonwall-AR for Android"
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'transparent',
  },
  exploreHader: {
    display: 'flex',
    flexFlow: 'column wrap',
    minHeight: '80vh',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: '#ccc',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'left',
  },
  bgLarge: {
        backgroundImage: `url(${Images.image12.default})`,
  },
  bgMedium: {
        backgroundImage: `url(${Images.image12.default})`, //cambiar
  },
  bgSmall: {
        backgroundImage: `url(${Images.image12.default})`, //cambiar
        backgroundPosition: 'center center',
  },
  dividerShape: {
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    alignSelf: "flex-end"
  },
  shapeFill: {
   fill: '#fafafa',
  },
  dividerSvg: {
  position: 'relative',
  display: 'block',
  width: 'calc(100% + 1.3px)',
  height: '120px',
  transform: 'rotateY(180deg)'
  },
  titleWrapper: {
    padding: '40px 8vh 8vh',
  },
  titleSmall:{
    margin: '200px 0 0',
    padding: '40px 4vh 8vh',
  },
  title:{
    maxWidth: '800px',
  },
  button:{
    color: theme.palette.primary.main,
    border: '2px #fff solid',
    background: '#fff',
    '&:hover':{
      color: "#fff",
      border: '2px #fff solid',
    }
  },
  dividerShape: {
    bottom: '0',
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
},
shapeFill: {
   fill: '#fafafa',
},
dividerSvg: {
  position: 'relative',
  display: 'block',
  width: 'calc(100% + 1.3px)',
  height: '100px',
}
}));

const ExploreHeader = forwardRef(({ onBackClick,messages }, ref) => {
  const classes = useStyles();
  const {isLarge, isMedium, isSmall } = useReactive();
  const bg = (isLarge) ? 'bgLarge' : (isMedium) ? 'bgMedium' : 'bgSmall';
  const  title = (isLarge) ? 'titlLarge' : (isMedium) ? 'titlMedium' : 'titleSmall';
  const shape = (isSmall) ? 'dividerSvgSmall' : null ;

  return (
  <Box ref={ref} className={clsx(classes.exploreHader, classes[bg])}>
    <Box ref={ref} className={clsx(classes.titleWrapper, classes[title])} >
      <Typography className={classes.title} gutterBottom variant="h1" >{messages.explore.header}</Typography>
      <Typography className={classes.title} gutterBottom variant="h4" component="h2">{messages.explore.subheader}</Typography>
      <br />
      <Box>
        <ButtonGroup>
          <Button href="/download/app/BooksOnWall.0.99.105.apk" size="large" color="primary" variant="contained" startIcon={<GetAppIcon />}>{messages.explore.downloadDirect}</Button>
        </ButtonGroup>
      </Box>
    </Box>
    <Box className={classes.dividerShape} >
      <svg  className={clsx(classes.dividerSvg, classes[shape])} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path className={classes.shapeFill} d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
      </svg>
    </Box>
  </Box>
  );
});
const Explore = (props) => {
    const {messages} = props.intl;
    const {hash} = useLocation();
    return (
      <>
      <Helmet>
         <meta charset="utf-8" />
         <title>{messages.menu.explore}</title>
         <meta name="description" content="This is explore page" />
         <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.explore} />
      </Helmet>
      <Box className="main" >
        <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.download_app)}>
          <ExploreHeader  id={messages.menu.download_app} messages={messages} />
        </ScrollIntoViewIfNeeded>
        <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.stories)}>
          <Stories  id={messages.menu.stories} history={props.history} insert limit={10}/>
        </ScrollIntoViewIfNeeded>
        <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.faqs)}>
          <Faqs  id={messages.menu.faqs} messages={messages} />
        </ScrollIntoViewIfNeeded>
      </Box>
      </>
    )
};

export default injectIntl(Explore);
