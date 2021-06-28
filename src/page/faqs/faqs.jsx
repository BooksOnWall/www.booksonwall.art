import React, { Component } from 'react';
import {
    Container,
    Box,
    Typography,
    Divider,
  } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';
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
      <Box id="FAQs">
      <Container maxWidth="xl" style={{paddingBottom: 40}}>
      <Typography  variant='h2'>
          {messages.menu.faqs}
      </Typography>
      <Typography gutterBottom color="primary" variant='subtitle1'>
        {messages.faqs.subtitle}
      </Typography>
      </Container>
      <Divider/>
      <Container disableGutters maxWidth="xl">

      {faqs.map((faq, i) => (
        <Accordion elevation={0} key={i} className='questionWrap'>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}  >
          <Typography variant='h4'>{faq.Question}</Typography>
        </AccordionSummary>
        <AccordionDetails className='answer'>
            <Typography variant='body1'> {faq.Answer}</Typography>
        </AccordionDetails>
        </Accordion>

      ))}
      </Container>
      </Box>

    ) : '';
  }
}
export default injectIntl(Faqs);
