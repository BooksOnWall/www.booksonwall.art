import React, { useState } from 'react';
import {
  Button,
  TextField,
  TextareaAutosize,
  Backdrop,
  Box,
  Typography,
  makeStyles,
  } from '@material-ui/core';
  import CircularProgress from '@material-ui/core/CircularProgress';
  import { useForm, Controller } from "react-hook-form";
  import { injectIntl, defineMessages } from 'react-intl';
  import Captcha from "demos-react-captcha";
  import PhoneInput from 'react-phone-input-2';
  import 'react-phone-input-2/lib/plain.css';

  const registerTraductions = defineMessages({
    register: {
      id: 'register.register',
      defaultMessage: 'Register!'
    },
    send: {
      id: 'register.send',
      defaultMessage: 'Send'
    }
  });
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#99FF44',
    },
    input:{
      fontFamily: theme.typography.button.fontFamily
    }
  }));
const Register = ({messages, locale}) => {

    const classes = useStyles();
    const [complete, setComplete] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false)
    const [open, setOpen] = useState(false);
    const [captchaSuccess, setCaptchaSuccess] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {

      try {
          const { name, email, phone, message, subject } = errors;
          if (email || name || phone || message || subject || !captchaSuccess) {
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
              body: JSON.stringify({foo: 'contact', name: data.name, from: data.email, to: 'register@booksonwall.art', subject: "register", lang: locale, phone: data.phone, message: data.message})
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
    return (
      <Box id="registerForm">
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
      <Typography gutterBottom className="titleContactForm" color="secondary" variant="h5">{messages.register.register}</Typography>

          <form size='large'  onSubmit={handleSubmit(onSubmit)}>
            <>
            <Controller
              name="name"
              control={control}
              className={classes.input}
              defaultValue=""
              rules={{ required: 'name required' }}
              render={({ field: { onChange, value }, fieldState: { error }  }) => (
                <TextField
                  fullWidth
                  label={messages.contact.name}
                  placeholder={messages.contact.name}
                  autoFocus={true}
                  type="text"
                  variant="filled"
                  color="secondary"
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
                  color="secondary"
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
            <Button type="submit" className="button2" disableElevation label={messages.contact.send}  size='large' disabled={isSubmitting}>{messages.register.send}</Button>
            </>
          </form>
          </>
        }
      </Box>
    );
}
export default injectIntl(Register)
