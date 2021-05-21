import React, {Component} from "react";
import {
  Button,
  TextField,
  TextareaAutosize,
  Box,
  Typography
  } from '@material-ui/core';

import { defineMessages } from 'react-intl';

const contactTraductions = defineMessages({
  name: {
    id: 'contact.name',
    defaultMessage: 'Name'
  },
  mail: {
    id: 'contact.email',
    defaultMessage: 'Email'
  },
  phone : {
    id: 'contact.phone',
    defaultMessage: 'Phone'
  } ,
  send : {
    id: 'contact.send',
    defaultMessage: 'Send'
  },
  contactUs: {
    id: 'contact.contactUs',
    defaultMessage: 'Contact Us',
  }
});

export default class ContactForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trad: contactTraductions,
      initialState: {
        first_name: '',
        name: '',
        email: '',
        company: '',
        message:  '',
        phone: '',
      },
    }
  }
  componentDidMount() {
    // update authenticated state on logout

  }
  postForm = () => {}
  render() {
    const {initialState} = this.state;
    const{messages} = this.props;
    // const options = [
    //   {
    //     key: 'general',
    //     text: 'General enquiry',
    //     value: 'general',
    //
    //   },
    //   {
    //     key: 'new story',
    //     text: 'Proposal for a new story',
    //     value: 'new story',
    //
    //   },
    //   {
    //     key: 'new partner',
    //     text: 'I want to become a partner',
    //     value: 'new partner',
    //
    //   },
    //   {
    //     key: 'join team',
    //     text: 'I want to be part of the team',
    //     value: 'new partner',
    //
    //   },
    //   {
    //     key: 'press',
    //     text: 'Press',
    //     value: 'press',
    //
    //   },
    // ];
    return (
      <Box id="contactForm" >
      <Typography gutterBottom color="textSecondary" variant="h4">{messages.contact.contactUs}</Typography>
          <form  onSubmit={this.handleSubmit}>
          {/*<Dropdown
                placeholder='How can we help you ?'
                fluid
                selection
                options={options}
              /> */}

            <TextField
              className="formImput"
              fullWidth
              label={messages.contact.name}
              placeholder={messages.contact.name}
              autoFocus={true}
              type="text"
              name="name"
              onChange={this.handleChange}
              defaultValue={initialState.name}
              />
              <br /><br />
            <TextField
              className="formImput"
              fullWidth
              label={messages.contact.email}
              placeholder={messages.contact.email}
              type="email"
              name="email"
              onChange={this.handleChange}
              defaultValue={initialState.email}
              />
              <br /><br />
              <TextField
                className="formImput"
                fullWidth
                label={messages.contact.phone}
                placeholder={messages.contact.phone}
                type="text"
                name="phone"
                onChange={this.handleChange}
                defaultValue={initialState.phone}
                />
              <br /><br />
            <TextareaAutosize
              fullWidth
              rowsMin={10}
              rows={10}
              className="formMessage"
              name="message"
              placeholder='Message'
              onChange={this.handleChange}
              defaultValue={initialState.message}
            />
            <br /><br />
            <Button className="button2" disableElevation label={messages.contact.send}>{messages.contact.send}</Button>
          </form>
      </Box>
    );
  }
}
