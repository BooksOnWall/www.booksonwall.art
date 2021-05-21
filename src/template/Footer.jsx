import React, { useState } from 'react';
//import {  Box, Menu, Grid, Icon, Breadcrumb, Divider } from 'semantic-ui-react';
import {Paper,MenuList, Button,  makeStyles, Container,  Link, Box, Typography, Breadcrumbs, MenuItem, Grid, Icon, Divider} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Heart from '@material-ui/icons/Favorite';
import Cc from '@material-ui/icons/ClosedCaption';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import ChatIcon from '@material-ui/icons/Chat';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CloudIcon from '@material-ui/icons/Cloud';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';

import { ReactComponent as FooterBg } from './../assets/images/svg/footer.svg';
import { ReactComponent as Principal } from './../assets/images/svg/principal.svg';
import { ReactComponent as Logo }   from './../assets/images/svg/logo_extended.svg';

import { injectIntl, defineMessages } from 'react-intl';
const createTraductions = defineMessages({
  thx_for_support_us: {
    id: 'footer.thx_for_support_us',
    defaultMessage: "Thx for supporting us"
  },
  terms: {
    id: 'footer.terms',
    defaultMessage: "Terms"
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flex:1,
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    height: 'auto',
    backgroundColor: 'transparent',
    color: '#fff',
  },
  control: {
    padding: theme.spacing(2),
  },
  character: {
    maxHeight: "15vh",
    position: 'absolute',
    bottom:'3px',
    zIndex: 99,
  },
  bg:{
    position: 'absolute',
    bottom: '0',
    zIndex: 98,
    width: '99vw',
    height: 'auto',
  },
  hr:{
    backgroundColor: '#333',
  },
  footerContainer: {
    backgroundColor: '#001111',
    background:'linear-gradient(0deg, #000005 0%, #001030 100%)',
    color: '#fff',
  },
  footerBreadcrumb:{
    height: '67px'
  },
  divider: {
      backgroundColor: '#184050',
      background: 'linear-gradient(0deg, #000010 0%, #184050 100%)',
  },
  dividerH: {
    marginTop: 15,
    backgroundColor: '#184050',
    background: 'linear-gradient(-90deg, #18404d 0%, #000010 60%)',
    },
  title: {
    color: '#131413',
    maxWidth: '60vw',
    paddingTop: '7vh',
  },
  logo:{
    maxHeight: 55,
    alignSelf: 'flex-start',
    maxWidth: '220px',
    paddingLeft: 10,
  },
  bottom: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 0,
    alignItems: 'center',
  },
  button: {
    color: '#fff',
  }
}));
const TopFooter = ({messages}) => {
  const classes = useStyles();
  return (
    <Box className='footerBg'>
      <Container>
        <Typography variant="h2" component="h3" className={classes.title}></Typography>
        <Typography variant="h4" className={classes.title}></Typography>
      </Container>
    </Box>
  );
};

const SpacingGrid = ({activeItem, activeIndex, handleMenuItemClick, messages}) => {
  const classes = useStyles();
  return (
    <>
    <Box className={classes.footerContainer}>
    <Container maxWidth="false" >
    <Grid container className={classes.root}>
        <Grid item xs={2}>
          <Paper elevation={0} className={classes.paper}>
            <Typography gutterBottom variant="h6">{messages.menu.explore}</Typography>
            <MenuList variant="selectedMenu">
              <MenuItem
                selected={0 === activeIndex && activeItem === messages.menu.explore}
                    onClick={(event) => handleMenuItemClick(event, 0, messages.menu.explore, messages.menu.download_app)}
                >{messages.menu.download_app}</MenuItem>
              <MenuItem
                selected={1 === activeIndex && activeItem === messages.menu.explore}
                onClick={(event) => handleMenuItemClick(event, 1, messages.menu.explore, messages.menu.stories)}
                >{messages.menu.stories}</MenuItem>
              <MenuItem
                selected={2 === activeIndex && activeItem === messages.menu.explore}
                onClick={(event) => handleMenuItemClick(event, 2, messages.menu.explore, messages.menu.faqs)}
                >{messages.menu.faqs}</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <Grid item xs={2}>
          <Paper elevation={0} className={classes.paper}>
            <Typography gutterBottom  variant="h6">{messages.menu.create} </Typography>
            <MenuList variant="selectedMenu">
              <MenuItem
                selected={0 === activeIndex && activeItem === messages.menu.create}
                onClick={(event) => handleMenuItemClick(event, 0, messages.menu.create, messages.menu.workshop)}
                >{messages.menu.workshop}</MenuItem>
              <MenuItem
                selected={1 === activeIndex && activeItem === messages.menu.create}
                onClick={(event) => handleMenuItemClick(event, 1, messages.menu.create, messages.menu.community)}>
                {messages.menu.community}
              </MenuItem>
              <MenuItem
                selected={2 === activeIndex && activeItem === messages.menu.create}
                onClick={(event) => handleMenuItemClick(event, 2, messages.menu.create, messages.menu.joinus)}
                >{messages.menu.joinus}</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <Grid item xs={2}>
          <Paper elevation={0} className={classes.paper}>
          <Typography gutterBottom  variant="h6">  {messages.menu.collaborate} </Typography>
            <MenuList variant="selectedMenu">
              <MenuItem
                selected={0 === activeIndex && activeItem === messages.menu.collaborate}
                onClick={(event) => handleMenuItemClick(event, 0, messages.menu.collaborate, messages.menu.support)}
              >{messages.menu.support}</MenuItem>
            <MenuItem
                selected={1 === activeIndex && activeItem === messages.menu.collaborate}
               onClick={(event) => handleMenuItemClick(event, 1, messages.menu.collaborate, messages.menu.associate)}
              >{messages.menu.associate}</MenuItem>
            <MenuItem
              selected={2 === activeIndex && activeItem === messages.menu.collaborate}
               onClick={(event) => handleMenuItemClick(event, 2, messages.menu.collaborate, messages.menu.develop)}
              >{messages.menu.develop}</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Divider orientation="vertical" flexItem light className={classes.divider} />
        <Grid item xs={2}>
          <Paper elevation={0} className={classes.paper}>
          <Typography gutterBottom  variant="h6">  {messages.menu.info} </Typography>
            <MenuList variant="selectedMenu">
              <MenuItem
                selected={0 === activeIndex && activeItem === messages.menu.info}
                 onClick={(event) => handleMenuItemClick(event, 0, messages.menu.info, messages.menu.manifest)}
              >{messages.menu.manifest}</MenuItem>
            <MenuItem
              selected={1 === activeIndex && activeItem === messages.menu.info}
              onClick={(event) => handleMenuItemClick(event, 1, messages.menu.info, messages.menu.history)}
              >{messages.menu.history}</MenuItem>
            <MenuItem
              selected={2 === activeIndex && activeItem === messages.menu.info}
              onClick={(event) => handleMenuItemClick(event, 2, messages.menu.info, messages.menu.community)}
              >{messages.menu.community}</MenuItem>
            <MenuItem
              selected={3 === activeIndex && activeItem === messages.menu.info}
              onClick={(event) => handleMenuItemClick(event, 3, messages.menu.info, messages.menu.press)}
                >{messages.menu.press}</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <Grid item xs={2}>
          <Paper elevation={0} className={classes.paper}>
            <Typography gutterBottom  variant="h6">{messages.menu.connect}</Typography>
            <MenuList variant="selectedMenu">
              <MenuItem
                selected={activeItem === messages.menu.connect}
                onClick={(event) => handleMenuItemClick(event, 0, messages.menu.connect, messages.menu.email)}
              >{messages.menu.email}</MenuItem>
            <MenuItem onClick={(event) => handleMenuItemClick(event, 1, messages.menu.connect, "Facebook")}
              ><FacebookIcon />  Facebook</MenuItem>
            <MenuItem onClick={(event) => handleMenuItemClick(event, 2, messages.menu.connect, "Instagram")}
              ><InstagramIcon />  Instagram</MenuItem>
            <MenuItem onClick={(event) => handleMenuItemClick(event, 3, messages.menu.connect, "Tweeter")}
                ><TwitterIcon />  Twitter</MenuItem>
              <MenuItem onClick={(event) => handleMenuItemClick(event, 4, messages.menu.connect, "Chat")}
                ><ChatIcon />  Chat</MenuItem>
              <MenuItem onClick={(event) => handleMenuItemClick(event, 5, messages.menu.connect, "Linkedin")}
                ><LinkedInIcon />  Linkedin</MenuItem>
              <MenuItem onClick={(event) => handleMenuItemClick(event, 6, messages.menu.connect, "Youtube")}
                ><YouTubeIcon />  Youtube</MenuItem>
              <MenuItem onClick={(event) => handleMenuItemClick(event, 7, messages.menu.connect, "Cloud")}
                ><CloudIcon />  Cloud</MenuItem>
              <MenuItem onClick={(event) => handleMenuItemClick(event, 8, messages.menu.connect, "Github")}
                ><GitHubIcon />  Github</MenuItem>
              <MenuItem onClick={(event) => handleMenuItemClick(event, 9, messages.menu.connect, "Telegram")}
                ><TelegramIcon />  Telegram</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
    </Grid>

    <Divider light className={classes.dividerH} />
    <Grid container className={classes.bottom} spacing={1}>
      <Grid item xs={6}>
          <Logo className={classes.logo} alt="logo" /><Icon name='creative commons' size='small' />
      </Grid>
      <Grid item xs>
          <Grid className={classes.menuBottom} >
            <Button className={classes.button} color="default" startIcon={<Heart color='secondary' />}>{messages.footer.thx_for_support_us}</Button>
            <Button className={classes.button}  startIcon={<Cc color='primary' />}>{messages.footer.terms}</Button>
          </Grid>
      </Grid>
      </Grid>

    </Container>
    </Box>
    </>
  );
};
const Footer = ({intl}) => {
  let history = useHistory();

  const [activeItem, setActiveItem] = useState();
  const [activeIndex, setActiveIndex] = useState();
  const [anchor, setAnchor] = useState();
  const {messages} = intl;
  const page = (activeItem) ? activeItem.charAt(0).toUpperCase() + activeItem.slice(1): activeItem;
  const subPage = (anchor) ? anchor.charAt(0).toUpperCase()+ anchor.slice(1): anchor;
  const handleItem = item => setActiveItem(item);
  const handleIndex = index => setActiveIndex(index);
  const handleAnchor= anchor => setAnchor(anchor);

  const goTo = (content,hash, admin = false) => {
    let path = (content === 'home') ? '' : content;
    path = (hash) ? path+'#'+ hash : path;
    switch(content) {
      default:
      history.push('/'+path) ;
    }
  }
  const handleMenuItemClick = (e, index, name, hash) => {
    handleIndex(index);
    if (hash) {
      handleItem(name);
      handleAnchor(hash);
      goTo(name,hash);
    } else {
      handleItem(name);
      goTo(name);
    }
  }
  const handleClick = (event) => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  };
    return (<>
      <Box className="footer" >
        <Box className="footerBreadcrumb">
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="textPrimary" name={"Home"} href="/" onClick={handleClick}>{messages.menu.home}</Link>
              <Link color="textPrimary" name={page} href={"/"+page} onClick={handleClick}>{page}</Link>
              <Typography name={subPage} >{subPage}</Typography>
            </Breadcrumbs>
          </Box>
          <SpacingGrid activeItem={activeItem} activeIndex={activeIndex} messages={messages} handleMenuItemClick={handleMenuItemClick}/>
      </Box>
      </>
    )
};

export default injectIntl(Footer);
