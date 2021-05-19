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
  titleTop: {
     maxWidth: 1280,
     padding: '8vh'
  },
  title: {
     maxWidth: 1280,
     padding: '0 8vh'
  },
  collaborateHader: {
    display: 'flex',
    flexFlow: 'column wrap',
    minHeight: '36vh',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#ccc',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
    backgroundImage: `url(${Images.image22.default})`,
  },
  button1: {
    margin: '30px 0',
    color: '#186858',
    border: '2px #D9D2C6 solid',
    '&:hover': {
        background: '#186858',
        color: 'white',
          border: '2px #186858 solid',
      }
  },
  button2: {
    margin: '40px 0',
    color: theme.palette.primary.main,
    border: '2px #D9D2C6 solid',
    '&:hover': {
        background: '#C33949',
        color: 'white',
          border: '2px #C33949 solid',
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
      background: theme.palette.primary.darkGradient,
      display: "flex",
      height: '36vh',
      flexDirection: 'column',
      width: '100vw',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
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
        marginTop: '28vh',
        alignItems: "flex-end",
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-end',
        justifyContent: 'flex-end,'
  },
  marginTop: {
    marginTop: '10vh',
  },
  blob: {
    background: theme.palette.primary.mainGradient,
    marginLeft: '-5vw',
    marginBottom: '50px',
  },
  blobB: {
    background: theme.palette.primary.darkGradient,
    marginBottom: '30px',
  },
  servicesTitleWrap:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 80
  },
  servicesWrap:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  servicesGrid:{
    justifyContent: 'space-evenly'
  },
  serviceImage:{
    borderRadius: 10,
  }
}));

const collaborateTraductions = defineMessages({
  title: {
    id: 'collaborate.title',
    defaultMessage: 'Together we can revalorate and resignify your city. Using Arte and New Technologies.'
  },
   fund_a_story: {
    id: 'collaborate.fund_a_story',
    defaultMessage: 'Fund a story'
  },
  create_new_story: {
    id: 'collaborate.create_new_story',
    defaultMessage: "Let's create a new story together in your city. Help us finance a BooksOnWall story and promote culture, heritage, territorial identity and technological innovation."
  },
  join_us: {
  id: 'collaborate.join_us',
  defaultMessage: 'Be a partner'
},
  strategic_partner: {
    id: 'collaborate.strategic_partner',
    defaultMessage: 'We are looking for strategic partners who want to participate and contribute to the growth of BooksOnWall.'
  },
  looking_for: {
    id: 'collaborate.looking_for',
    defaultMessage: 'A unique connection with the creative industries: literary creation, audiovisual, music, plastic and visual arts with the city and its historical, cultural and social contents.',
  },
  read_more_btn:{
  id: 'collaborate.read_more_btn',
  defaultMessage: 'Read More',
},
how: {
  id: 'collaborate.how',
  defaultMessage: 'How to become a partner'
},
we_produce:{
  id: 'collaborate.we_produce',
  defaultMessage: 'We produce, direct and manage extended reality proyect.'
},
we_are:{
  id: 'collaborate.we_are',
  defaultMessage: 'We are a community of expert in art, media and contemporary technologies'
}
});

const CollaborateHeader = ({messages}) => {
  const classes = useStyles();
return (
  <Box className={classes.collaborateHader}>
    <Box className={classes.gradient}>
    <Container maxWidth='false'>
      <Typography className={classes.titleTop} gutterBottom variant="h2" component="h1"> {messages.collaborate.title}</Typography>
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
    <Container className={classes.collaborate} maxWidth="false">
    <Grid container spacing={8}>
        <Grid item xs>
          <Blob className={classes.blob} size="530px">
              <Blob size="500px" src={Images.image11.default} />
          </Blob>
            <Typography gutterBottom variant="h2" component="h3" >{messages.collaborate.fund_a_story}</Typography>
            <Typography gutterBottom  variant="h4" component="h4" >{messages.collaborate.create_new_story}</Typography>
            <Button size="large" className={classes.button1}>{messages.collaborate.read_more_btn}</Button>
        </Grid>
        <Grid item xs  className={classes.collaborateGrid2}>
          <Blob  className={classes.blobB} size="380px">
              <Blob size="330px" src={Images.image1.default} />
          </Blob>
            <Typography align="right" gutterBottom variant="h2" component="h3" >{messages.collaborate.join_us}</Typography>
            <Typography align="right" gutterBottom variant="h4" component="h4" >{messages.collaborate.strategic_partner}</Typography>
            <Typography align="right" gutterBottom variant="subtitle1" >{messages.collaborate.looking_for}</Typography>
            <Button size="large" className={classes.button2}>{messages.collaborate.how}</Button>
          </Grid>
      </Grid>
    </Container>
<br /><br /><br />
    <Container maxWidth="xl" className={classes.servicesWrap}>
      <Box className={classes.servicesTitleWrap}>
        <Typography align='center' className={classes.title}  gutterBottom  variant="h1" component="h3" >{messages.menu.develop}</Typography>
        <Typography align='center' className={classes.title}  gutterBottom  variant="h4" >{messages.collaborate.we_produce}</Typography>
        <Typography align='center' className={classes.title} gutterBottom  variant="subtitle1" >{messages.collaborate.we_are}</Typography>
      </Box>
        <br /><br /><br />
        <Grid container spacing={8} className={classes.servicesGrid}>
        <Grid item xs={10} md={4}>
          <Image className={classes.serviceImage}  src={Images.image1.default}/>
          <br />
          <Typography  gutterBottom variant="h3" component="h3" >Storytelleing</Typography>
          <Typography  gutterBottom variant="body1" > Quis <b>Booksonwall Poesia & Stories</b> ultrices leo ullamcorper non. Nullam nec urna odio. Aliquam vitae orci nec dui dapibus dignissim. Vivamus et dapibus arcu. In ultrices, nulla eu vulputate semper, metus ligula interdum dolor, vitae maximus erat quam in mauris. Aenean id aliquet leo, ac fermentum augue. Ut dapibus interdum cursus. Ut dapibus interdum cursus. </Typography>
          <br />
          <Button size="large" className={classes.button2}>{messages.collaborate.read_more_btn}</Button>
        </Grid>
        <Grid item xs={10} md={4}>
          <Image src={Images.image1.default} className={classes.serviceImage} />
          <br />
          <Typography  gutterBottom variant="h3" component="h3">Education</Typography>
          <Typography  gutterBottom variant="body1" > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel euismod tellus. Proin faucibus, arcu vel pellentesque maximus, ex arcu euismod erat, id pretium ex risus quis velit. Curabitur vitae felis tincidunt, mollis lectus id, dictum dolor. Mauris in metus sapien. Cras pharetra consectetur purus non iaculis. Integer odio quam, varius condimentum lectus a, placerat facilisis magna. Mauris condimentum nibh ut metus pharetra. Mauris tristique ut purus ac mollis. Cras scelerisque orci est, </Typography>
          <br />
          <Button size="large" className={classes.button2}>{messages.collaborate.read_more_btn}</Button>
        </Grid>
        <Grid item xs={10} md={4}>
          <Image src={Images.image1.default} className={classes.serviceImage}/>
          <br />
          <Typography  gutterBottom variant="h3" component="h3" >Exploration</Typography>
          <Typography  gutterBottom variant="body" > Cras pharetra consectetur purus non iaculis. Integer odio quam, varius condimentum lectus a, placerat facilisis magna. Mauris condimentum nibh ut metus pharetra pharetra. Mauris tristique ut purus ac mollis. Cras scelerisque orci est, quis ultrices leo ullamcorper non. Nullam nec urna odio. Aliquam vitae orci nec dui dapibus dignissim. Vivamus et dapibus arcu. In ultrices, nulla eu vulputate semper, metus ligula interdum dolor. </Typography>
          <br />
          <Button size="large" className={classes.button2}>{messages.collaborate.read_more_btn}</Button>
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