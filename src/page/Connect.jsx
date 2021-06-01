import React from 'react';
import {
    Box,
    Grid,
    Container,
    Typography,
    Button,
    makeStyles
  } from '@material-ui/core';

import { injectIntl, defineMessages } from 'react-intl';
import ContactForm from './ContactForm';
import Register from './Register'
import { useLocation } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { Images } from './../assets/images/pages';

import Social from './Social';

import Projects from './projects/Projects';

const connectTraductions = defineMessages({
keed_in_touch:{
  id: 'connect.keed_in_touch',
  defaultMessage: "Keep in touch, we are in the networks and you can also write us, we are at your service."
},
we_are:{
  id: 'connect.we_are',
  defaultMessage: "Our brand management team is based in Montevideo, Uruguay.  Also the community currently has referents in Portugal, Spain, Egypt and Chile."
},
adress:{
  id: 'connect.adress',
  defaultMessage: "Magallanes 1064, Montevideo, Uruguay."
},
register:{
  id: 'connect.register',
  defaultMessage: "If you want to join us and collaborate in any of the projects, drop by here and we will get in touch with some ideas to participate."
}
});

const useStyles = makeStyles((theme) => ({
homeHaderBg:{
  padding:0,
  backgroundImage: `url(${Images.image12.default})`,
  backgroundSize: 'cover',
  backgroundPositionY: 'top',
},
connect:{

  minWidth: '100vw',
  minHeight: '90vh'
},
contact: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '20vh 30px',
},
gradine:{
  background:  theme.palette.primary.darkGradient,
  minHeight: '80vh',
},
contactGrid:{
},
project:{
  minWidth: '100vw',
  padding: '120px 30px',
},
register:{
  background:  'transparent',
  padding: '120px 30px',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
buton2: {
  margin: '20px 0',
  color: theme.palette.secondary.main,
  border: '2px #D9D2C6 solid',
'&:hover': {
    background:  theme.palette.secondary.main,
    color:  '#fff',
    border: '2px #fff solid',
  }
},

}));

const Connect = (props) => {
  const classes = useStyles();
  const goTo = (e, b) => window.location.href = b.src;
  const {hash} = useLocation();
  const { locale, messages, goToCommunity } = props.intl;
  return (
    <Box className={classes.connect}>
    <Box className={classes.homeHaderBg}>
    <Box className={classes.gradine}>


      <Box className={classes.contact}>
        <Container maxWidth="xl">
          <Grid container spacing={10} >
            <Grid item xs={12} md={4} xl={4} className={classes.contactGrid}>

                <Typography gutterBottom color="textSecondary" variant='h2'> {messages.connect.keed_in_touch}</Typography>

                <Typography gutterBottom color="textSecondary" variant='subtitle1'> {messages.connect.we_are}</Typography>
                <Typography gutterBottom color="textSecondary" variant='subtitle1'> {messages.connect.addres}</Typography>
            </Grid>
            <Grid item xs={12} md={5} xl={5} className={classes.contactGrid}>
              <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.connect)}>
                <ContactForm messages={messages} locale={locale}/>
              </ScrollIntoViewIfNeeded>
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <Social tab goTo={goTo}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
            <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
        </svg>
      </Box>
      </Box>
    </Box>

      <Box className={classes.register}>
        <Container maxWidth="xl">
          <Grid container spacing={10} >
            <Grid item xs={12} md={1} xl={3} >
            </Grid>
            <Grid item xs={12} md={4} xl={4} >
              <Typography gutterBottom color="textPrimary" variant='h2'> {messages.connect.register}</Typography>
              <Button onClick={goToCommunity} size="large" className={classes.buton2} >{messages.create.meet_comunity}</Button>
            </Grid>
            <Grid item xs={12} md={6} xl={4} >
              <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.register)}>
                <Register messages={messages} locale={locale}/>
              </ScrollIntoViewIfNeeded>
            </Grid>
          </Grid>
        </ Container>
      </Box>

      <Box className={classes.projects}>
      <Container maxWidth="xl">
        <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.project)}>
          <Projects messages={messages} history={props.history} locale={locale} />
        </ScrollIntoViewIfNeeded>
      </ Container>
      </Box>
    </Box>
  );
}


export default injectIntl(Connect);
