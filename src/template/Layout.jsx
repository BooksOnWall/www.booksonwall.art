import React from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './Header';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import './layout.css';

const Layout = ({ children, switchLang, locale, history }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      maxWidth:'2020px',
      minWidth: 350,
      width: '100vw',
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'noWrap',
      overflow: 'inherit',
      width: '100vw',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      overflow: 'auto',
      margin: '0',
      padding: '0',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: 0,
      margin:'0 auto'
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    logo:{
      top: 30,
      maxHeight: 90,
      position: 'fixed',
      zIndex: 999999,
    },
    topBtn:{
      background: theme.palette.secondary.main,
      height: 24,
      width: 24,
      borderRadius: 80,
      padding: '20px 20px',
      color:  theme.palette.common.white,
      position: 'fixed',
      bottom: '8vh',
      right: '2vw',
      boxShadow: '3px 3px 5px rgba(0,0,0, .3)',
      '&:hover': {
        background: theme.palette.primary.dark,
        color:  theme.palette.common.white,
      },
      marginRight: 30,
    }
  }));
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        className= 'black-background'
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

      <Box className={classes.root}>
        <CssBaseline />
        <AppBar elevation={0}  color="transparent" position="absolute" className={clsx(classes.appBar)}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <Header locale={locale} switchLang={switchLang} history={history}/>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Box className={classes.container} id="top">
            {children}
          </Box>
        </main>
      </Box>
       <Footer locale={locale} switchLang={switchLang} history={history}/>

  </ThemeProvider >
)
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Layout
