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
  } from '@material-ui/core';

import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

import logo from '../assets/images/logo.svg';
import LanguageSwitch from '../api/user/LanguageSwitch';
import Login from '../api/user/Login';
import Auth from '../api/user/Auth';

import ProfileIcon from '@material-ui/icons/Face';


const menuTraductions = defineMessages({
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
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menuItem: {
    borderRadius:8,
    color: '#000',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: 13,
    margin: 5,
    padding: '8px 10px',
    '&:hover': {
        background: 'rgba(0, 0, 0, 0.03)',
        color:  '#333'
      }
  },
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
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {secondary.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      selected={index === activeIndex && activeItem === option}
                      onClick={(event) => handleMenuItemClick(event, index, primary, option)}
                      >
                      {option}
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
const MainMenu = ({history, switchLang, goTo,menuOptions, loadPage, activeIndex, activeItem,handleMenuItemClick,adminMenu, messages, exploreOptions, createOptions, collaborateOptions, infoOptions, langs, locale  }) => {
  const classes = useStyles();
  return (
    <>
    <AppBar id="appbar-mobile" color="default">
      <Toolbar>
        <IconButton value='home' onClick={(e)=> loadPage('/')} edge="start"  color="inherit" aria-label="menu">
          <Avatar alt="logo" src={logo} />
        </IconButton>
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

      </Toolbar>
    </AppBar>

    <AppBar id="appbar-web" position="relative" color="default" >
      <Toolbar style={{display: 'flex', justifyContent: 'space-between',}}>
        <IconButton value='home' onClick={(e)=> loadPage('/')} edge="start"  color="inherit" aria-label="menu">
          <Avatar alt="logo" src={logo} />
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
        <List component="nav" aria-label="Connect" className="nav">
          <ListItem
            button
            className={classes.menuItem}
            value="connect"
            aria-haspopup="true"
            aria-controls="connect"
            aria-label="Connect"
            onClick={(e) => loadPage('/'+messages.menu.connect)}
            >
            <ListItemText color="primary" primary={messages.menu.connect}  />
          </ListItem>
        </List>

        <LanguageSwitch langs={langs} locale={locale} switchLang={switchLang} className="lenguage" />

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
const TopMenu = ({intl, pathvalue, hash, authenticated, switchLang, locale , history}) => {
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
        langs={langs}
        loadPage={loadPage}
        locale={locale}
        switchLang={switchLang}
      />
    )
};

export default injectIntl(TopMenu);
