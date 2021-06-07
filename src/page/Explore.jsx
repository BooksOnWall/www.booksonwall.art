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
import { useLocation } from 'react-router-dom';
import {useReactive} from "../utils/reactive";
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
    defaultMessage: "Download Booksonwall-AR.APK v.0.99.2"
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
    minHeight: '60vh',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: '#ccc',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'right ',
    backgroundImage: `url(${Images.image12.default})`,
  },
  titleWrapper: {
    margin: '200px 0 0',
    padding: '40px 8vh 8vh',
  },
  title:{
    maxWidth: '600px',
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
  height: '200px',
}
}));

const ExploreHeader = forwardRef(({ onBackClick,messages }, ref) => {
  const classes = useStyles();
  return (

<Box ref={ref} className={classes.exploreHader}>
  <Box className={classes.titleWrapper} >
    <Typography className={classes.title} gutterBottom variant="h1" >{messages.explore.header}</Typography>
    <Typography className={classes.title} gutterBottom variant="h4" component="h2">{messages.explore.subheader}</Typography>
    <br />
    <Box>
      <ButtonGroup>
        <Button href="/download/app/BooksOnWall.0.99.105.apk" size="large" className={classes.button} startIcon={<GetAppIcon />}>{messages.explore.downloadDirect}</Button>
      </ButtonGroup>
    </Box>
  </Box>
</Box>
);
});
const Explore = (props) => {
    const {messages} = props.intl;
    const {hash} = useLocation();
    return (
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
    )
};

export default injectIntl(Explore);
