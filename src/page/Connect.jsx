import React, { Component } from 'react';
import {
    Box
  } from '@material-ui/core';

import { injectIntl } from 'react-intl';
import ContactForm from './ContactForm';
import Register from './Register'

import Social from './Social';
import projects from '../md/projects/index';
import Projects from './projects/Projects';

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
      <Box className="main">
        <Box  >
          <Social tab goTo={this.goTo}/>
        </Box>
        <Box style={{display: 'flex', justifyContent: 'space-around'}} >
            <ContactForm messages={messages}  locale={locale}/>
            <Register messages={messages}/>
      </Box>
        <Box >
          <Projects messages={messages} locale={locale} projects={projects}/>
        </Box>
    </Box>
    )
  }
};

export default injectIntl(Connect);
