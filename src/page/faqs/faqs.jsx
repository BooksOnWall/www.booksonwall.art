import React, { Component } from 'react';
import {
    Container,
    Badge,
    Divider,
    Box,
    Typography
  } from '@material-ui/core';

import { injectIntl, defineMessages } from 'react-intl';



const exploreTraductions = defineMessages({
  subtitle: {
    id: 'faqs.subtitle',
    defaultMessage: "Here are some FAQ's with their answers!"
  },
})

const apiURL = process.env.REACT_APP_API;

class Faqs extends Component {
  constructor(props) {
    super(props)

    this.state = {
        faqs: null,
        panels: null,
        locale: this.props.intl.locale,
        apiURL: apiURL,
      }
  }
  loadFAQ = async (rows, index, sort, order) => {
    const { apiURL, locale } = this.state;
    const fetchURL = apiURL + '/faqs?_limit=10&_sort=updated_at&lang='+locale;
    this.setState({loading: true});
    await fetch(fetchURL, {
      crossDomain:true,
      headers: {'Content-Type':'application/json'},
      method: "get"
    })
    .then(response => {
      if (response && !response.ok) { throw new Error(response.statusText);}
      return response.json();
    })
    .then(data => {
        if(data) {
          this.setState({faqs: data, loading: false});
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });
  }
  componentDidMount = async () =>  {
    // update authenticated state on logout
    //
    await this.loadFAQ();
  }
  render() {
    const { faqs} = this.state;
    const {messages} = this.props.intl;

    return (faqs) ? (


      <Container>
      <Typography gutterBottom variant='h2'>
        {messages.menu.faqs}
      </Typography>
      <Typography gutterBottom variant='subtitle'>
        {messages.faqs.subtitle}
      </Typography>
      {faqs.map(faq => (
        <>
        <Box>
          <Badge color="secondary" variant="dot">
            <Typography as='h2'>{faq.Question}</Typography>
          </Badge>
          <Box className='answer' compact>
              {faq.Answer}
          </Box>
        </Box>
        </>
      ))}
      </Container>


    ) : '';
  }
}
export default injectIntl(Faqs);
