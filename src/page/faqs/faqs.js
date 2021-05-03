import React, { Component } from 'react';
import {
    Container,
    Badge,
    Divider,
    Box,
  } from '@material-ui/core';

import ToggleButton from '@material-ui/lab/ToggleButton';

import Image from 'material-ui-image';

import { injectIntl } from 'react-intl';

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

    return (faqs && panels) ? (

      <Box id="FAQs">
      <Container>
      <h2>
        FAQS
        <h4>
          "Here are someFAQ's with their answers!"
        </h4>
      </h2>
      <Divider />

      <Divider />
      </Container>
      </Box>

    ) : '';
  }
}
export default injectIntl(Faqs);
