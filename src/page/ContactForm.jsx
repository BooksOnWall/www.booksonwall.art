import React, {useState} from "react";
import {
  Button,
  TextField,
  TextareaAutosize,
  Box,
  Typography
  } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
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

const ContactForm = ({messages, locale}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("name")); // watch input value by passing the name of it
    const options = [
      {
        key: 'general',
        text: 'General enquiry',
        value: 'general',

      },
      {
        key: 'new story',
        text: 'Proposal for a new story',
        value: 'new story',

      },
      {
        key: 'new partner',
        text: 'I want to become a partner',
        value: 'new partner',

      },
      {
        key: 'join team',
        text: 'I want to be part of the team',
        value: 'new partner',

      },
      {
        key: 'press',
        text: 'Press',
        value: 'press',

      },
    ];
    return (
      <Box id="contactForm" >
      <Typography gutterBottom color="textSecondary" variant="h4">{messages.contact.contactUs}</Typography>
      <form  onSubmit={handleSubmit(onSubmit)}>

          {/*<Dropdown
                placeholder='How can we help you ?'
                fluid
                selection
                options={options}
              /> */}
              <Controller
                name="name"
                control={control}
                value={name}
                rules={{ required: 'name required' }}
                render={({ field: { onChange, value }, fieldState: { error }  }) => (
                  <TextField
                    fullWidth
                    className="formImput"
                    label={messages.contact.name}
                    placeholder={messages.contact.name}
                    autoFocus={true}
                    type="text"
                    variant="filled"
                    error={!!error}
                    helperText={error ? error.message : null}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              <br /><br />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    className="formImput"
                    label={messages.contact.email}
                    placeholder={messages.contact.email}
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="email"
                  />
                )}
                rules={{ required: 'Email required' }}
              />

              <br /><br />
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    className="formImput"
                    label={messages.contact.phone}
                    placeholder={messages.contact.phone}
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="text"
                  />
                )}
                rules={{ required: 'Phone required' }}
              />
              <br /><br />
              <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextareaAutosize
                    fullWidth
                    rowsMin={10}
                    rows={10}
                    className="formMessage"
                    name="message"
                    label={messages.contact.message}
                    placeholder={messages.contact.message}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Message required' }}
              />

            <br /><br />
            <Button type="submit" className="button2" disableElevation label={messages.contact.send}>{messages.contact.send}</Button>
          </form>
      </Box>
    );
}
export default ContactForm
