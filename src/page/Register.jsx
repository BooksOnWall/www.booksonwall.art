import React, { Component } from 'react';
import {
  Button,
  TextField,
  TextareaAutosize,
  Divider
  } from '@material-ui/core';

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
      <>
      <h5>Register</h5>

          <form size='large' onSubmit={this.handleSubmit}>
            <>
            <TextField
              label={messages.contact.name}
              placeholder={messages.contact.name}
              autoFocus={true}
              type="text"
              name="name"
              onChange={this.handleChange}
              defaultValue={initialState.name}
              />

            <Divider />
            <TextField
              label={messages.contact.email}
              placeholder={messages.contact.email}
              type="email"
              name="email"
              onChange={this.handleChange}
              defaultValue={initialState.email}
              />
            <Divider />
              <TextField
                label={messages.contact.phone}
                placeholder={messages.contact.phone}
                type="text"
                name="phone"
                onChange={this.handleChange}
                defaultValue={initialState.phone}
                />

            <Divider />
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={3}
                rows={10}
                className="formMessage"
                name="Bio"
                placeholder='Bio'
                onChange={this.handleChange}
                defaultValue={initialState.message}
              />
            <Divider />
            <Button onClick={this.handleSubmit}  primary size='large' type="submit" disabled={this.isSubmitting} content="Send" />
            <Divider />
            </>
          </form>
      </>
    );
  }
}
