import React, { Component } from 'react';
import {
    Box,
    Grid,
    Container,
    Typography
  } from '@material-ui/core';

import { injectIntl, defineMessages } from 'react-intl';
import ContactForm from './ContactForm';
import Register from './Register'

import Social from './Social';
import projects from '../md/projects/index';
import Projects from './projects/Projects';
const connectTraductions = defineMessages({
keed_in_touch:{
  id: 'connect.keed_in_touch',
  defaultMessage: "Keep in touch, we are in the networks and you can also write us, we are at your service."
},
register:{
  id: 'connect.register',
  defaultMessage: "If you want to join us and collaborate in any of the projects, drop by here and we will get in touch with some ideas to participate."
}
});

class Connect extends Component {
  constructor(props) {
    super(props)

    this.state = {  }
  }
  componentDidMount() {
    // update authenticated state on logout

  }
  goTo = (e, b) => window.location.href = b.src
  render() {
    const { locale, messages } = this.props.intl;

    return (
      <Box className="connect">
        <Box className="contact">
        <Container maxWidth="xl">
        <Grid container spacing={10} >
          <Grid item xs={12} md={4} xl={4} className="contactGrid">
              <Typography color="textSecondary" variant='h2'> {messages.connect.keed_in_touch}</Typography>
          </Grid>
          <Grid item xs={12} md={5} xl={5} className="contactGrid">
              <ContactForm messages={messages} locale={locale}/>
          </Grid>
          <Grid item xs={12} md={3} xl={3}>
            <Social tab goTo={this.goTo}/>
          </Grid>
        </Grid>
        </Container>
        </Box>

        <Box className="register">
          <Container maxWidth="xl">
            <Grid container spacing={10} >
              <Grid item xs={12} md={6} xl={4} >
                <Typography color="textSecondary" variant='h2'> {messages.connect.register}</Typography>
              </Grid>
              <Grid item xs={12} md={6} xl={4} >
                <Register messages={messages}/>
              </Grid>
            </Grid>
          </ Container>
        </Box>

        <Box className="projects">
        <Container maxWidth="xl">
          <Projects messages={messages} locale={locale} projects={projects}/>
          </ Container>
        </Box>
      </Box>
    )
  }
};

export default injectIntl(Connect);
