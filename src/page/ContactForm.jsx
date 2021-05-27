import React, {useState} from "react";
import {
  Button,
  TextField,
  Backdrop,
  TextareaAutosize,
  Box,
  Typography,
  IconButton,
  makeStyles,
  } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { defineMessages } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/plain.css';

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
  subject : {
    id: 'contact.subject',
    defaultMessage: 'Subject'
  } ,
  send : {
    id: 'contact.send',
    defaultMessage: 'Send'
  },
  contactUs: {
    id: 'contact.contactUs',
    defaultMessage: "Let's talk?",
  }
});
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#99FF44',
  },
}));
const ContactForm = ({messages, locale}) => {
    const classes = useStyles();
    const [complete, setComplete] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false)
    const [open, setOpen] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {

      try {
          const { name, email, phone, message, subject } = errors;
          if (email || name || phone || message || subject) {
            console.log(errors);
          } else {
            setSubmitting(true)
            setOpen(!open);
            const contact  = await fetch(`${process.env.REACT_APP_API}/email/`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({foo: 'contact', name: data.name, from: data.email, to: 'hola@booksonwall.art', subject: data.subject, lang: locale, phone: data.phone, message: data.message})
            })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));

            if(contact && contact.message) {
              if(contact.message !== 'Email sent') {
                console.log(contact.message);
              } else {
                console.log(contact.message);
              }
              setOpen(false);
              setSubmitting(false);
              setComplete(true);
            }
          }
      } catch (err) {
        console.log("error",err);
      }
    }
   // watch input value by passing the name of it
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
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      {complete &&
        <Box>
          Gracias Message enviado
        </Box>
      }
      {!complete &&
        <>
        <Typography gutterBottom className="titleContactForm" color="primary" variant="h5">{messages.contact.contactUs}</Typography>
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
                defaultValue=""
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
                  <PhoneInput
                  label={messages.contact.phone}
                  placeholder={messages.contact.phone}
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Phone required' }}
              />
              <br /><br />
              <Controller
                name="subject"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    className="formImput"
                    label={messages.contact.subject}
                    placeholder={messages.contact.subject}
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type="text"
                  />
                )}
                rules={{ required: 'subject required' }}
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
          </>
        }
      </Box>
    );
}
export default ContactForm
