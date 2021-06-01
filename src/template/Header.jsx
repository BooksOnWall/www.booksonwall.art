import React, { useEffect, useState, useRef } from 'react';

import {
    Avatar,
    AppBar,
    Toolbar,
    Popper,
    Grow,
    Paper,
    MenuList,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Menu,
    ClickAwayListener,
    MenuItem,
    makeStyles,
    Box,
    Typography
  } from '@material-ui/core';

import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import logo from '../assets/images/logo.svg';
import LanguageSwitch from '../api/user/LanguageSwitch';
import Login from '../api/user/Login';
import Auth from '../api/user/Auth';
import ProfileIcon from '@material-ui/icons/Face';

const menuTraductions = defineMessages({
  home: {
    id: 'menu.home',
    defaultMessage: 'Home',
  },
    explore: {
    id: 'menu.explore',
    defaultMessage: 'Explore',
  },
  login: {
    id: 'menu.login',
    defaultMessage: 'Login',
  },
  download_app: {
    id: 'menu.download_app',
    defaultMessage: 'Download App',
  },
  stories: {
    id: 'menu.stories',
    defaultMessage: 'Stories',
  },
  story: {
    id: 'menu.story',
    defaultMessage: 'Story',
  },
  services: {
    id: 'menu.services',
    defaultMessage: 'Services',
  },
  service: {
    id: 'menu.service',
    defaultMessage: 'Service',
  },
  partner: {
    id: 'menu.partner',
    defaultMessage: 'Partner',
  },
  articles: {
    id: 'menu.articles',
    defaultMessage: 'Articles',
  },
  article: {
    id: 'menu.article',
    defaultMessage: 'Article',
  },
  applications: {
    id: 'menu.applications',
    defaultMessage: 'Applications',
  },
  application: {
    id: 'menu.application',
    defaultMessage: 'Application',
  },
  faqs: {
    id: 'menu.faqs',
    defaultMessage: 'FAQs',
  },
  create: {
    id: 'menu.create',
    defaultMessage: 'Create',
  },
  workshop: {
    id: 'menu.workshop',
    defaultMessage: 'Workshop',
  },
  community: {
    id: 'menu.community',
    defaultMessage: 'Community',
  },
  joinus: {
    id: 'menu.joinus',
    defaultMessage: 'Join us',
  },
  collaborate: {
    id: 'menu.collaborate',
    defaultMessage: 'Collaborate',
  },
  support: {
    id: 'menu.support',
    defaultMessage: 'Support a story',
  },
  associate: {
    id: 'menu.associate',
    defaultMessage: 'Associate',
  },
  develop: {
    id: 'menu.develop',
    defaultMessage: 'Develop + innovate',
  },
  info: {
    id: 'menu.info',
    defaultMessage: 'Info',
  },
  manifest: {
    id: 'menu.manifest',
    defaultMessage: 'Manifest',
  },
  history: {
    id: 'menu.history',
    defaultMessage: 'History',
  },
  press: {
    id: 'menu.press',
    defaultMessage: 'Press',
  },
  connect: {
    id: 'menu.connect',
    defaultMessage: 'Connect',
  },
  register: {
    id: 'menu.register',
    defaultMessage: 'Register',
  },
  projects: {
    id: 'menu.projects',
    defaultMessage: 'Projects',
  },
  project: {
    id: 'menu.project',
    defaultMessage: 'Project',
  },
  terms: {
    id: 'menu.terms',
    defaultMessage: 'Terms',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logo:{
    padding: 0,
    marginTop: 0,
    marginLeft: '2vw',
  },
  logoIcon:{
    minHeight: 70,
    minWidth: 70,
    background: '#fff',
    padding: 3
  },
  logoMobile:{
    marginLeft: 10,
  },
  menuItem: {
    borderRadius: 6,
    color: theme.palette.secondary.contrastText,
    fontWeight: 700,
    textTransform: 'uppercase',
    margin: 3,
    padding: '8px 14px',
    background: 'rgba(0, 0, 0,  .09)',
    '&:hover': {
        background: 'rgba(0, 0, 0, 0.2)',
        color:  '#fff'
      }
  },
  menuItemContact:{
    textTransform: 'uppercase',
    fontSize: 14,
    margin: '0 2px',
    padding: '3px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    fontWeight: 700,
    background: 'rgba(0, 0, 0,  .1)',
    color: theme.palette.secondary.contrastText,
    '&:hover': {
        background: 'rgba(0, 0, 0, 0.03)',
        color:  "#000"
      }
  },
  menuitemitem:{
    textTransform: 'uppercase',
    fontSize: 14,
    margin: 0,
    padding: '14px 17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    '&:hover': {
        background: 'rgba(0, 0, 0, 0.1)',
        color:  "#000"
      }
  },
  menuItemText:{
    padding: 20
  },
  menuItemContactText:{
    margin: '5px',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'noWrap',
    justifyContent: 'space-between',
    width: '100vw'
  },
  menuWrapp:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'noWrap',
    alignItems: 'center',
  },
  popper:{
    marginTop: 6,
    background:'transparent',
    padding: 0,
  },
  paper:{
    background: 'transparent',
    margin: 0,
    padding: 0,
  },
  grow:{
    background: 'transparent',
    padding:0,
    margin: 0,
  },
  menuListGrow:{
    padding:0,
    margin: 0,
    background: 'rgba(0, 0, 0,  .3)',
    borderRadius:6
  },
  lenguageSwitch:{
  }
}));
/** @primary title of menu
**  @secondary array of menu
**/
const MenuBranch = ({primary, secondary, activeIndex, activeItem , handleMenuItemClick}) => {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const anchorRef = React.useRef(null);

   const handleToggle = () => {
     setOpen((prevOpen) => !prevOpen);
   };

   const handleClose = (event) => {
     if (anchorRef.current && anchorRef.current.contains(event.target)) {
       return;
     }
     setOpen(false);
   };
   function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

return (
  <div className={classes.root}>

    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
        className={classes.menuItem}
        >
        {primary}
      </Button>
      <Popper className={classes.popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            className={classes.grow}
            >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} className={classes.menuListGrow} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {secondary.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      selected={index === activeIndex && activeItem === option}
                      onClick={(event) => handleMenuItemClick(event, index, primary, option)}
                      className={classes.menuitemitem}
                      >
                      <Typography color='textSecondary' variant="button">{option}</Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  </div>
);
};
const MainMenu = ({history, allMessages, switchLang, goTo,menuOptions, loadPage, activeIndex, activeItem,handleMenuItemClick,adminMenu, messages, exploreOptions, createOptions, collaborateOptions, infoOptions, langs, locale  }) => {
  const classes = useStyles();
  return (
    <>
    <AppBar elevation={0} id="appbar-mobile" color="transparent" >
      <Toolbar elevation={0}  className={classes.toolbar} disableGutters variant='regular' >
        <IconButton className={classes.logoMobile} value='home' onClick={(e)=> loadPage('/')} edge="start"  color="inherit" aria-label="menu">
          <Avatar alt="logo" src={logo} />
        </IconButton>
        <Box className={classes.menuWrapp}>
        <MenuBranch
          primary="Menu"
          secondary={menuOptions}
          activeIndex={activeIndex}
          activeItem={activeItem}
          handleMenuItemClick={handleMenuItemClick}
          />

          {Auth.isUserAuthenticated()

              ?
              <Menu>
              {adminMenu.map((option, index) => (
                <MenuItem
                  className={classes.menubranchItem}
                  key={index}
                  value={option}
                  selected={index === activeIndex}
                  onClick={(e) => goTo({content:option, history})}
                  >
                  <ProfileIcon /> {option}
                </MenuItem>

              ))}
              </Menu>
             : <Login messages={messages} history={history}/>
         }
         </Box>
      </Toolbar>
    </AppBar>

    <AppBar elevation={0} id="appbar-web" position="relative" color="transparent"  >
      <Toolbar style={{display: 'flex', justifyContent: 'space-between',}}>
        <IconButton className={classes.logo} value='home' onClick={(e)=> loadPage('/')} edge="start"  color="inherit" aria-label="menu">
          <Avatar className={classes.logoIcon}   alt="logo" src={logo} />
        </IconButton>
        <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
        <MenuBranch
          primary={messages.menu.explore}
          secondary={exploreOptions}
          activeIndex={activeIndex}
          activeItem={activeItem}
          handleMenuItemClick={handleMenuItemClick}
          />
        <MenuBranch
          primary={messages.menu.create}
          secondary={createOptions}
          activeIndex={activeIndex}
          activeItem={activeItem}
          handleMenuItemClick={handleMenuItemClick}
          />
        <MenuBranch
          primary={messages.menu.collaborate}
          secondary={collaborateOptions}
          activeIndex={activeIndex}
          activeItem={activeItem}
          handleMenuItemClick={handleMenuItemClick}
          />
        <MenuBranch
          primary={messages.menu.info}
          secondary={infoOptions}
          activeIndex={activeIndex}
          activeItem={activeItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <List disablePadding component="nav" aria-label="Connect" className="nav">
          <ListItem
            button
            className={classes.menuItemContact}
            value="connect"
            aria-haspopup="true"
            aria-controls="connect"
            aria-label="Connect"
            onClick={(e) => loadPage('/'+messages.menu.connect)}
            >
            <ListItemText className={classes.menuItemContactText} color="primary">
            <Typography variant="button">{messages.menu.connect}</Typography>
            </ListItemText>
          </ListItem>
        </List>

        <LanguageSwitch langs={langs} history={history} allMessages={allMessages} messages={messages} locale={locale} switchLang={switchLang} className={classes.lenguageSwitch} />

        {Auth.isUserAuthenticated()
            ?
            <>

            <MenuBranch
              primary="Admin"
              secondary={adminMenu}
              activeIndex={activeIndex}
              activeItem={activeItem}
              handleMenuItemClick={handleMenuItemClick}
            />
            </>
          : <Login messages={messages} history={history}/>
         }
         </Box>
      </Toolbar>
    </AppBar>
    </>
  )
}
const TopMenu = ({intl, pathvalue, hash, authenticated, switchLang, locale , history, allMessages}) => {
    const { messages } = intl;
    const navigate = target => {
      const siteUrl = process.env.REACT_APP_URL;
      history.push(siteUrl+"/"+(target)? target: "");
    }
    const pathName = (pathvalue) ? pathvalue.replace("/",""): null;
    hash = (hash) ? hash.replace("#",""): null;
    const langs = [
      {
        value: <FormattedMessage defaultMessage='English' id='lang.english' />,
        id: 'en'
      },
      {
        value: <FormattedMessage defaultMessage='Spanish' id='lang.spanish' />,
        id: 'es'
      },
      {
        value: <FormattedMessage defaultMessage='Portuguese' id='lang.portuguese' />,
        id: 'pt'
      },
      {
        value: <FormattedMessage defaultMessage='French' id='lang.french' />,
        id: 'fr'
      },
      {
        value: <FormattedMessage defaultMessage='Italian' id='lang.italian' />,
        id: 'it'
      }
    ];
  const [activeItem, setActiveItem] = useState();
  const [activeIndex, setActiveIndex] = useState();
  const loadPage = value => navigate(value);
  const handleItemClick = (e, { value, anchor }) => {
    if (anchor) {
      //this.setState({ anchorMenu: null, anchorExplore: null, anchorCreate: null, activeItem: value, anchor: anchor });
      goTo({history, content: value, hash: anchor});
    } else {
      //this.setState({ anchorMenu: null, activeItem: value });
      goTo({history, content: value});
    }
  }
  const logout = () => {
    Auth.deauthenticateUser();
    navigate('/');
  }
  const handleMenuItemClick = (e, index, name, hash, history) => {
    if (hash) {
    //  this.setState({ anchorEl: null, anchorInfo: null, anchorCreate: null, anchorExplore: null, anchorCollaborate: null, activeIndex: index , activeItem: name, anchor: hash });
      goTo({content: name,hash, history});
    } else {
    //  this.setState({ activeItem: name });
      goTo({content: name, hash:null, history});
    }
  };
  const goTo = ({history,content,hash, admin = false}) => {
    let path = (content === 'home') ? '' : content;
    path = (hash) ? path+"#"+hash  : path;
    switch(content) {
      case "Admin":
      if(hash === 'Logout') logout();
      break;
      default:
      navigate('/'+path) ;
    }

  }
     //const { activeIndex, activeItem, langs, lang, intl } = this.state;
     //const messages =  intl.messages;
     const adminMenu = [
      'Profile',
      'Dashboard',
      'Logout'
      ];
    const menuOptions = [
      messages.menu.explore,
      messages.menu.create,
      messages.menu.collaborate,
      messages.menu.connect
    ];
    const exploreOptions = [
      messages.menu.download_app,
      messages.menu.stories,
      messages.menu.faqs
    ];
    const createOptions = [
      messages.menu.workshop,
      messages.menu.community,
      messages.menu.joinus
    ];
    const collaborateOptions = [
      messages.menu.support,
      messages.menu.associate,
      messages.menu.develop
    ];
    const infoOptions = [
      messages.menu.manifest,
      messages.menu.history,
      messages.menu.community,
      messages.menu.press
    ];
    return (

      <MainMenu
        goTo={goTo}
        menuOptions={menuOptions}
        activeIndex={activeIndex}
        activeItem={activeItem}
        handleMenuItemClick={handleMenuItemClick}
        history={history}
        adminMenu={adminMenu}
        messages={messages}
        exploreOptions={exploreOptions}
        createOptions={createOptions}
        collaborateOptions={collaborateOptions}
        infoOptions={infoOptions}
        allMessages={allMessages}
        langs={langs}
        loadPage={loadPage}
        locale={locale}
        switchLang={switchLang}
      />
    )
};

export default injectIntl(TopMenu);
