import React, {useState} from "react";
import {
  Button,
  TextField,
  Backdrop,
  TextareaAutosize,
  Box,
  Typography,
  makeStyles,
  } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm, Controller } from "react-hook-form";
import { defineMessages } from 'react-intl';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/plain.css';
import Captcha from "demos-react-captcha";

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

    const [open, setOpen] = useState(false);
    const [captchaSuccess, setCaptchaSuccess] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {

      try {
          const { name, email, phone, message, subject } = errors;
          if (email || name || phone || message || subject || !captchaSuccess ) {
            console.log(errors);
          } else {
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
              setComplete(true);
            }
          }
      } catch (err) {
        console.log("error",err);
      }
    }

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
              <Captcha
                onChange={status => setCaptchaSuccess(status)}
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
