import React, { Component } from 'react';

import {
  List,
  ListItem,
  ListItemText,
  Modal,
  Divider,
  TextField,
  Button,
  ButtonGroup,
  makeStyles,
  Typography,
  Backdrop } from '@material-ui/core';
import { defineMessages, injectIntl } from 'react-intl';
import Auth from './Auth';
import ParticlesBg from 'particles-bg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const apiURL = process.env.REACT_APP_API;
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
    width: '50vw',
    maxHeight: '40vh',
    minHeight: '30vh',
    zIndex: '1300',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2vh',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    boxShadow: theme.shadows[1],
    padding: 40,
    borderRadius: 15,
    overflow: 'hidden'
  },
  bg:{
    borderRadius: 15,
    overflow: 'hidden'
  },
  menuItem: {
    borderRadius: 400,
    color: '#000',
    fontWeight: 700,
    padding: '8px 2px 7px 12px',
    textTransform: 'uppercase',
    fontSize: 13,
    margin: 5,
    '&:hover': {
       background: 'rgba(0, 0, 0, 0.03)',
       color:  '#333'
      }
  },
  input: {
    margin: 20,
    minWidth: '300px'
  }
}));

const loginTraductions = defineMessages({
  title: {
    id: 'login.title',
    defaultMessage: 'Login',
  },
  name: {
    id: 'login.email',
    defaultMessage: 'Email',
  },
  passworrd: {
    id: 'login.password',
    defaultMessage: 'Password',
  },
});
 const  LoginModal = ({values ,email, password, messages, handleChange, handleSubmit, login }) => {
   const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   return (
     <>
        <List component="nav" aria-label="Connect" className="nav">
          <ListItem
            button
            value="Login"
            aria-haspopup="true"
            aria-controls="connect"
            aria-label="Login"
            onClick={handleOpen}
            className={classes.menuItem}
            >
            <ListItemText primary={<AccountCircleIcon fontSize='default' />}  />
          </ListItem>
        </List>
      <Modal
        disableEnforceFocus
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <div className={classes.paper}>
            <ParticlesBg className={classes.bg} type="circle" bg={true} num={5}/>
            <Typography color="textSecondary" variant="h6" component="h2">{messages.login.title}</Typography>
            <TextField
              color="primary"
              inputProps={{ 'aria-label': 'email' }}
              onChange={(e) => handleChange(e)}
              type="text"
              name="email"
              defaultValue={values.email}
              placeholder={messages.login.email}
              label={messages.login.email}
              autoFocus={true}
              className={classes.input}
              />
            <Divider />

            <TextField
              color="primary"
              inputProps={{ 'aria-label': 'password' }}
              defaultValue={messages.login.password}
              label={messages.login.password}
              placeholder={messages.login.password}
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              className={classes.input}
              />
            <Divider />
            <ButtonGroup>
            <Button variant="contained" color="primary" onClick={login}>Login</Button>
            <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
            </ButtonGroup>
          </div>
      </Modal>
    </>
   );
 };
 class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginTraductions: loginTraductions,
      apiURL: apiURL,
      open: false,
      email: '',
      login: '',
      password: '',
      name: '',
      initialState: {
        email: '',
        password: ''
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // update authenticated state on logout

  }

  login = async () => {
    const { apiURL, email, password } = this.state;
    const fetchURL = apiURL + '/auth/local';
    this.setState({loading: true});
    console.log(email);
    console.log(password);
    console.log("URL",fetchURL );
    let form= {
        "identifier": email,
        "password": password
      };
      try {
        await fetch(fetchURL, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(form)
        })
        .then(response => {
          if (response && !response.ok) { throw new Error(response.statusText);}
          return response.json();
        })
        .then(data => {
            if(data) {
              Auth.authenticateUser(data);
              this.props.history.push("/Dashboard");
            } else {
              console.log('No Data received from the server');
            }
        })
        .catch((error) => {
          // Your error is here!
          if(error) console.log(JSON.stringify(error));
        });
      } catch(e) {
        console.log(e.message);
      }

  }
  handleChange = (e,o) => {

    if(e) this.setState({ [e.target.name]: e.target.value });
  }
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  render() {
    const { email , password, open} = this.state;
    const {messages} = this.props;
    const values = {email, password};
    return (

      <LoginModal
        email={email}
        password={password}
        open={open}
        messages={messages}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        login={this.login}
        values={values}
        />

    );
  }
}
export default injectIntl(Login);
