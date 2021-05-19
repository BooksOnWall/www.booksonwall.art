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
        apiURL: apiURL,
      }
  }
  loadFAQ = async (rows, index, sort, order) => {
    const { apiURL } = this.state;
    const fetchURL = apiURL + '/FAQS';
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

          const panels = [];
          data.map((faq, i) => {

            panels.push({
                key: 'faq'+i,
                title: {
                  content: <Badge as='h3' size='big' content={faq.Question} />,
                },
                content: {
                  content: (
                    <Box className='answer' compact>
                        {faq.Answer}
                    </Box>
                  ),
                },
            });
            return faq;
          });

          this.setState({faqs: data, loading: false, panels: panels});
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
    const {panels, faqs} = this.state;
    const {messages} = this.props.intl;

    return (faqs && panels) ? (

      <Box id="FAQs">
      <Container>
      <Typography gutterBottom variant='h2'>
        {messages.menu.faqs}
      </Typography>
      <Typography gutterBottom variant='subtitle'>
        {messages.faqs.subtitle}
      </Typography>
      <Divider />
      <Divider />
      </Container>
      </Box>

    ) : '';
  }
}
export default injectIntl(Faqs);
