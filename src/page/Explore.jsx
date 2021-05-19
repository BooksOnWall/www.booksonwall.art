import React, { Component } from 'react';

import { injectIntl, defineMessages } from 'react-intl';
import {
    Typography,
    Container,
    ButtonGroup,
    Box,
    Button,
    makeStyles
  } from '@material-ui/core';

import { Images } from '../assets/images/pages';
import AppleIcon from '@material-ui/icons/Apple';
import ShopIcon from '@material-ui/icons/Shop';
import GetAppIcon from '@material-ui/icons/GetApp';

import loadable from '@loadable/component';
import Faqs from './faqs/faqs';
const Stories = loadable(() => import('./stories/stories'));
const exploreTraductions = defineMessages({
  header: {
    id: 'explore.header',
    defaultMessage: 'Come and live a story through urban art and new technologies!'
  },
  subheader: {
    id: 'explore.subheader',
    defaultMessage: 'Download \"BookSonWall AR\" to enjoy the stories and experience urban art and augmented reality.'
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
    minHeight: '50vh',
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
    color: '#fff',
    border: '1px #fff solid'
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
  height: '260px',
}
}));

const ExploreHeader = ({messages}) => {
  const classes = useStyles();
  return (

<Box className={classes.exploreHader}>
  <Box className={classes.titleWrapper} >
    <Typography className={classes.title} gutterBottom variant="h1" >{messages.explore.header}</Typography>
    <Typography className={classes.title} gutterBottom variant="h4" component="h2">{messages.explore.subheader}</Typography>
    <br />
    <Box>
      <ButtonGroup>
        <Button size="large" className={classes.button} startIcon={<GetAppIcon />}>{messages.explore.downloadDirect}</Button>
      </ButtonGroup>
    </Box>
  </Box>
  <Box className={classes.dividerShape} >
      <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={classes.shapeFill} ></path>
      </svg>
  </Box>
</Box>
);
};
class Explore extends Component {
  constructor(props) {
    super(props)

    this.state = { trad: exploreTraductions }
  }
  componentDidMount() {
    // update authenticated state on logout

  }

  render() {
    const {messages} = this.props.intl;
    return (
      <Box className="main" >
        <ExploreHeader id='Download_app' messages={messages} />
        <Stories history={this.props.history} />
        <Faqs id="FAQs" messages={messages} />
      </Box>
    )
  }
};

export default injectIntl(Explore);
