import React, { Component } from 'react';
import {
    Typography,
    Box,
    Button,
    Container,
    Grid,
    makeStyles
  } from '@material-ui/core';

import { Images } from './../assets/images/pages';
import { injectIntl, defineMessages } from 'react-intl';
import { Blob } from 'react-blob';

const createTraductions = defineMessages({
  community_we_are: {
    id: 'create.community_we_are',
    defaultMessage: "We are artists who love working with other artists"
  },
  community_we_create: {
    id: 'create.community_we_create',
    defaultMessage: "We create stories with original routes inspired by various elements of local culture. Each story requires the collaboration of numerous professions such as writers, scriptwriters, Grafitti artist, sculptors, graphic designers, animators, musicians, storytellers, audiovisual designers, communicators and managers. Together we process, design, create and optimize all types of content that make up the experience."
  },
  joinus_header: {
    id: 'create.joinus_header',
    defaultMessage: "Do you want to be part of a team of multidisciplinary, innovative and passionate creators? Then BooksOnWall is your place!"
  },
  wokshop_header: {
    id: 'create.wokshop_header',
    defaultMessage: "The world is full of sto…t in a very special way"
  },
  wokshop_subheader: {
    id: 'create.wokshop_subheader',
    defaultMessage: "Let's create an augmented story together!"
  },
  workshop_by_step: {
    id: 'create.workshop_by_step',
    defaultMessage: "Do you want to create a …roject step after step."
  },
  workshop_stories: {
    id: 'create.workshop_stories',
    defaultMessage: "Workshops to create a BooksOnWall Story"
  },
  meet_comunity: {
    id: 'create.meet_comunity',
    defaultMessage: "Meet the community"
  },
  know_more: {
    id: 'create.know_more',
    defaultMessage: "know more here"
  }
});

const useStyles = makeStyles((theme) => ({
root: {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  background: 'transparent',
  width: '100vw',
},
wrapper: {
  display: 'flex',
  justifyContent: 'space-around',
  zIndex: 999,
},
stories: {
  padding:'0 6vw',
  display: 'flex',
  flexGrow: 1,
},
workshop: {
  minHeight: '110vh',
  display: "flex",
  alignItems: "center",
},
bePart: {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '40vh',
},
weAre: {
  display:"flex",
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent:'space-between',
  color: 'white',
  backgroundSize: 'cover',
  backgroundPositionY: 'top',
  backgroundPositionX: 'right',
  backgroundImage: `url(${Images.image13.default})`,
},
weAreBg: {
  background:'linear-gradient(0deg, rgba(190,66,81,.88) 0%, rgba(224,161,3,.88) 100%) ',
  display:"flex",
  minHeight: '120vh',
  flexDirection: 'column',
  justifyContent:'space-between',
},
container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
},
buton: {
  margin: '20px 0',
  color: '#C33949',
  border: '1px #D9D2C6 solid',
  '&:hover': {
      background: '#C33949',
      color: 'white',
        border: '1px #C33949 solid',
    }
},
buton2: {
  margin: '40px 0',
  color: '#186858',
  border: '1px #186858 solid',
  '&:hover': {
      background: '#186858',
      color: 'white',
        border: '1px #186858 solid',
    }
  },
buton4: {
    margin: '40px 0',
    color: '#D9D2C6',
    border: '1px #D9D2C6 solid',
    '&:hover': {
        background: '#186858',
        color: '#D9D2C6',
          border: '1px #186858 solid',
      }
    },
buton3: {
  margin: '20px 0',
  color: '#3C4186',
  border: '1px #3C4186 solid',
  '&:hover': {
      background: '#3C4186',
      color: 'white',
        border: '1px #3C4186 solid',
    }
},
dividerShape: {
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  alignSelf: "flex-end"
},
shapeFill: {
 fill: '#fafafa',
},
dividerSvg: {
position: 'relative',
display: 'block',
width: 'calc(100% + 1.3px)',
height: '120px',
transform: 'rotateY(180deg)'
},
dividerShape2: {
  width: '100%,',
  overflow: 'hidden',
  lineHeight: '0',
  transform: 'rotate(180deg)',
},
shapeFill2: {
 fill: '#fafafa',
},
dividerSvg2: {
position: 'relative',
display: 'block',
width: 'calc(100% + 1.3px)',
height: '150px',
},
top:{
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  alignContent: 'flex-end',
},
bottom: {
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  alignContent: 'flex-end',
}
}));

const WorkShop = ({messages}) => {
  const classes = useStyles();
  return (
  <>
    <Box className={classes.root}>
      <Container className={classes.stories} maxWidth="xl">
          <Grid container spacing={8} >
            <Grid item className={classes.top} item xs={6}>
              <Typography gutterBottom color="white" variant="h2" >{messages.create.wokshop_header}</Typography>
              <Typography gutterBottom color="white" variant="h3" >{messages.create.wokshop_subheader}</Typography>
              <Button size="large" className={classes.buton2}>{messages.menu.joinus}</Button>
            </Grid>
            <Grid item  item  xs={6}>
              <Blob size="50vh" style={{ zIndex: 1, backgroundColor: '#339D66', background:'linear-gradient(0deg, #339395 0%, #339D66 100%)', maxWidth: '750px', maxHeight: '750px' }}>
                  <Blob size="90%" src={Images.image11.default}  />
              </Blob>
            </Grid>
          </Grid>
      </Container>

   <Container  className={classes.workshop} maxWidth="xl">
    <Grid container spacing={8}>
        <Grid item xs={12} sm={6} >
          <Blob size="50vh" style={{ zIndex: 1, backgroundColor: '#424675', background:'linear-gradient(0deg, #893E4E 0%, #424675 100%)', maxWidth: '750px', maxHeight: '750px'  }}>
            <Blob size="90%" src={Images.image1.default}/>
          </Blob>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.bottom}>
          <Typography gutterBottom color="white" align="right" variant="h2" >{messages.create.workshop_stories}</Typography>
          <Typography gutterBottom color="white" align="right" variant="h3" >{messages.create.workshop_by_step}</Typography>
          <Button size="large" className={classes.buton3}>{messages.create.know_more}</Button>
        </Grid>
      </Grid>
    </Container>
  </Box>
 </>
)};
const Community = ({history, messages}) => {
  const classes = useStyles();
  return (
    <Box className={classes.weAre} >
      <Box className={classes.weAreBg} >
      <Box className={classes.dividerShape2} >
        <svg className={classes.dividerSvg2} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,153 C0,153 11,50 83.5,50 C156,50 131.001,153 172,153 C213,153 201,10 263.5,10 C326,10 323,153 372.5,153 C422,153 393,30 446.5,30 C500,30 458,153 519.5,153 C581,153 540,50 590.5,50 C641,50 604.001,123 648,123 C692,123 660,50 704.5,50 C749,50 722,153 773,153 C824,153 803,0 841.5,0 C880,0 869,153 926,153 C983,153 962,50 1014.5,50 C1067,50 1023,153 1082,153 C1141,153 1117,90 1153.5,90 C1190,90 1200,153 1200,153 L1200,226 L0,226 L0,153 Z" className={classes.shapeFill2} ></path>
        </svg>
      </Box>
      <Container className={classes.container} >
        <Typography color="white" align="center" gutterBottom variant="h2" >{messages.create.community_we_are}</Typography>
        <Typography color="white"  align="center" gutterBottom variant="h3" >{messages.create.community_we_create}</Typography>
        <Button size="large" className={classes.buton4} onClick={(e) => history.push('/Community')}>{messages.create.meet_comunity}</Button>
      </Container>
      <Box className={classes.dividerShape} >
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z" className={classes.shapeFill} ></path>
        </svg>
      </Box>
      </Box>

    </Box>
)};
const JoinUs = ({messages}) => {
  const classes = useStyles();
  return (
  <Box>
    <Container className={classes.bePart} maxWidth="md">
      <Typography align="center" gutterBottom color="white" variant="h2" >{messages.create.joinus_header}</Typography>
      <Button size="large"  className={classes.buton}>{messages.create.joinus}</Button>
    </Container>
    </Box>
)};
class Create extends Component {
  render() {
    const {messages} = this.props.intl;
    return (
      <Box id="create" className="main" >
        <WorkShop messages={messages} history={this.props.history}/>
        <Community messages={messages} history={this.props.history}/>
        <JoinUs messages={messages} history={this.props.history}/>
      </Box>
    )
  }
};

export default injectIntl(Create);
