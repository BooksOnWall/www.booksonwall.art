import React, { Component } from 'react';
import { makeStyles, Grid, Button,  Typography, Container, Box } from '@material-ui/core';

import { injectIntl, defineMessages  } from 'react-intl';
import collaborate from '../md/page/en/collaborate.md';

import { Blob } from 'react-blob';

import Image from 'material-ui-image';
import { Images } from './../assets/images/pages';
const useStyles = makeStyles((theme) => ({
  root: {

  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  card: {
    backgroundColor: 'transparent'
  },
  collaborate: {
    padding:'8vh 12vw',
  },
  tile: {
     paddingBottom: '12vh',
  },
  collaborateHader: {
    display: 'flex',
    flexFlow: 'column wrap',
    minHeight: '65vh',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: '#ccc',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
    backgroundImage: `url(${Images.image22.default})`,
  },
  button1: {
    margin: '30px 0',
    color: '#186858',
    border: '1px #186858 solid',
    '&:hover': {
        background: '#186858',
        color: 'white',
          border: '1px #186858 solid',
      }
  },
  button2: {
    margin: '40px 0',
    color: '#C33949',
    border: '1px #D9D2C6 solid',
    '&:hover': {
        background: '#C33949',
        color: 'white',
          border: '1px #C33949 solid',
      }
    },
    bottom2: {
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
    },
    top:{
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      alignContent: 'flex-end',
    },
    gradient: {
      background:'linear-gradient(0deg,rgba(32,34,71, .90) 40%, rgba(51,157,102,.1) 100%) ',
      display: "flex",
      height: '65vh',
      flexDirection: 'column',
      width: '100vw',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      alignContent: 'center',
    },
    dividerShape: {
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: 'rotate(180deg)',
      alignSelf: "flex-end"
    },
    shapeFill: {
     fill: '#fafafa',
    },
    dividerSvg: {
    position: 'relative',
    display: 'block',
    width: 'calc(151% + 1.3px)',
    height: '70px',
    },
    collaborateGrid2:{
        marginTop: '25vh',
        alignItems: "flex-end",
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-end',
        justifyContent: 'flex-end,'
  },
  marginTop: {
    marginTop: '10vh',
  },
  marginLeft: {
    marginLeft: '-5vw',
  },
}));
const collaborateTraductions = defineMessages({
  title: {
    id: 'collaborate.title',
    defaultMessage: 'Together we can revalorate and resignify your city.<br/> Using Arte and New Technologies.'
  }
});

const CollaborateHeader = ({messages}) => {
  const classes = useStyles();
return (
  <Box className={classes.collaborateHader}>
    <Box className={classes.gradient}>
    <Container maxWidth='md' className={classes.tile}>
      <Typography gutterBottom align="center" color="white" variant="h2" component="h1"> {messages.collaborate.title}</Typography>
    </Container>
    <Box className={classes.dividerShape}>
      <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={classes.shapeFill}></path>
      </svg>
    </Box>
    </Box>
  </Box>
)};
const SupportStory = ({messages}) => {
  const classes = useStyles();
return (
  <Box className={classes.root}>
  <Box>
    <Container className={classes.collaborate} maxWidth="xl">
    <Grid container spacing={8}>
        <Grid item xs>
          <Blob className={classes.marginLeft}  size="530px" style={{ zIndex: 1, backgroundColor: '#E18C23', background:'linear-gradient(0deg, #E18C23 0%, #A5523E 100%)' }}>
              <Blob size="500px" src={Images.image11.default} />
          </Blob>
            <Typography  className={classes.marginTop} gutterBottom color="white" variant="h2" component="h3" >{messages.collaborate.fund_a_story}</Typography>
            <Typography gutterBottom color="white" variant="h4" >{messages.collaborate.create_new_story}</Typography>
            <Button size="large" className={classes.button1}>{messages.collaborate.read_more_btn}</Button>
        </Grid>
        <Grid item xs className={classes.collaborateGrid2} >
          <Blob className={classes.marginLeft}  size="380px" style={{ zIndex: 1, backgroundColor: '#3C4186', background:'linear-gradient(0deg, #C01227 0%, #3C4186 100%)' }}>
              <Blob size="330px" src={Images.image1.default} />
          </Blob>
            <Typography align="right" gutterBottom color="white" variant="h2" component="h3" className={classes.marginTop} >{messages.collaborate.join_us}</Typography>
            <Typography align="right" gutterBottom color="white" variant="h4" >{messages.collaborate.strategic_partner}</Typography>
            <Typography align="right" gutterBottom color="white" variant="h5" >{messages.collaborate.lookink_for}</Typography>
            <Button size="large" className={classes.button2}>{messages.collaborate.how}</Button>
          </Grid>
      </Grid>
    </Container>

    <Container>
    <Typography  gutterBottom color="white" variant="h1" component="h3" >Innovation + Develop</Typography>
        <Typography  gutterBottom color="white" variant="h4" >We produce, direct and manage extended reality proyect.</Typography>
        <Typography  gutterBottom color="white" variant="p" >We are a community of expert in art, media and contemporary technologies</Typography>
        <br /><br /><br />
        <Grid container spacing={8}>
        <Grid item xs>
          <Image src={Images.image1.default}/>
          <Typography  className={classes.marginTop} gutterBottom color="white" variant="h2" component="h3" >Storytelleing</Typography>
          <Typography  gutterBottom color="white" variant="p" > Quis <b>Booksonwall Poesia & Stories</b> ultrices leo ullamcorper non. Nullam nec urna odio. Aliquam vitae orci nec dui dapibus dignissim. Vivamus et dapibus arcu. In ultrices, nulla eu vulputate semper, metus ligula interdum dolor, vitae maximus erat quam in mauris. Aenean id aliquet leo, ac fermentum augue. Ut dapibus interdum cursus. Ut dapibus interdum cursus. </Typography>
          <Button size="large" className={classes.button1}>{messages.collaborate.read_more_btn}</Button>
        </Grid>
        <Grid item xs>
          <Image src={Images.image1.default} />
          <Typography  className={classes.marginTop} gutterBottom color="white" variant="h2" component="h3" >Education</Typography>
          <Typography  gutterBottom color="white" variant="p" > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel euismod tellus. Proin faucibus, arcu vel pellentesque maximus, ex arcu euismod erat, id pretium ex risus quis velit. Curabitur vitae felis tincidunt, mollis lectus id, dictum dolor. Mauris in metus sapien. Cras pharetra consectetur purus non iaculis. Integer odio quam, varius condimentum lectus a, placerat facilisis magna. Mauris condimentum nibh ut metus pharetra pharetra. Mauris tristique ut purus ac mollis. Cras scelerisque orci est, </Typography>

          <Button size="large" className={classes.button1}>{messages.collaborate.read_more_btn}</Button>
        </Grid>
        <Grid item xs>
          <Image src={Images.image1.default} />
          <Typography  className={classes.marginTop} gutterBottom color="white" variant="h2" component="h3" >Exploration</Typography>
          <Typography  gutterBottom color="white" variant="p" > Cras pharetra consectetur purus non iaculis. Integer odio quam, varius condimentum lectus a, placerat facilisis magna. Mauris condimentum nibh ut metus pharetra pharetra. Mauris tristique ut purus ac mollis. Cras scelerisque orci est, quis ultrices leo ullamcorper non. Nullam nec urna odio. Aliquam vitae orci nec dui dapibus dignissim. Vivamus et dapibus arcu. In ultrices, nulla eu vulputate semper, metus ligula interdum dolor. </Typography>
          <Button size="large" className={classes.button1}>{messages.collaborate.read_more_btn}</Button>
        </Grid>
      </Grid>
    </Container>

  </Box>
</Box>
)};

class Help extends Component {
  constructor(props) {
    super(props)

    this.state = {
        collaborateTraductions:collaborateTraductions,
        markdown: null,
        support: null,
      }
  }
  componentDidMount() {
    // update authenticated state on logout
    fetch(collaborate).then(res => res.text()).then(text => this.setState({ markdown: text }));
  }

  render() {
    const {messages} = this.props.intl;
    return (
      <Box id="collabora">
        <CollaborateHeader messages={messages}/>
        <SupportStory messages={messages} />
    </Box>
    )
  }
};

export default injectIntl(Help);
