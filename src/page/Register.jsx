import React, { Component } from 'react';
import {
  Button,
  TextField,
  TextareaAutosize,
  Divider,
  Box,
  Typography
  } from '@material-ui/core';
  import { defineMessages } from 'react-intl';

  const registerTraductions = defineMessages({
    register: {
      id: 'register.register',
      defaultMessage: 'Register!'
    },
    send: {
      id: 'register.send',
      defaultMessage: 'Send'
    },
  });

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

  render() {
    const {initialState} = this.state;
    const {messages} = this.props;

    return (
      <Box id="registerForm">
      <Typography gutterBottom className="titleContactForm" color="secondary" variant="h5">{messages.register.register}</Typography>

          <form size='large' onSubmit={this.handleSubmit}>
            <>
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

              <TextareaAutosize
                aria-label="minimum height"
                fullWidth
                rowsMin={3}
                rows={10}
                className="formMessage"
                name="Bio"
                placeholder='Bio'
                onChange={this.handleChange}
                defaultValue={initialState.message}
              />
            <Button className="button2" disableElevation label={messages.contact.send} onClick={this.handleSubmit} size='large' type="submit" disabled={this.isSubmitting}>{messages.register.send}</Button>
            </>
          </form>
      </Box>
    );
  }
}
