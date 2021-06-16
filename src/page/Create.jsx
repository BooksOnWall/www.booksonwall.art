import React from 'react';
import {
    Typography,
    Box,
    Button,
    Container,
    Grid,
    makeStyles
  } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { Images } from './../assets/images/pages';
import { injectIntl, defineMessages } from 'react-intl';
import {Helmet} from "react-helmet";
import {useReactive} from "../utils/reactive";
import clsx from 'clsx';
import { Blob } from 'react-blob';

const createTraductions = defineMessages({
  community: {
    id: 'create.community',
    defaultMessage: "Community"
  },
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
    defaultMessage: "Do you want to be part of a team of multidisciplinary, innovative and passionate creators?"
  },
  join_us:{
    id: 'create.join_us',
    defaultMessage: "Join Us"
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
  },
  your_place:{
    id:'create.your_place',
    defaultMessage: 'The community of BooksOnWall is your place!'
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
bgHeader:{
  backgroundSize: 'contain',
  backgroundPositionY: 'top',
  backgroundPositionX: 'right',
},
bgLarge: {
  backgroundImage: `url(${Images.image23.default})`,
},
bgMedium:{
  backgroundImage: `url(${Images.image19.default})`, //cambiar
},
bgSmall:{
  backgroundImage: `url(${Images.image20.default})`, //cambiar
},
wrapper: {
  display: 'flex',
  justifyContent: 'space-around',
  zIndex: 999,
},
stories: {
  padding:'20vh 6vw 0',
  display: 'flex',
  flexWrap: 'wrap',
  flexGrow: 1,
  minHeight: '80vh'
},
workshop: {
  minHeight: '60vh',
  display: "flex",
  alignItems: "center",
  padding:'0 6vw 20vh',

},
bePart: {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minHeight: '68vh',
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
},
weAreBg: {
  background:theme.palette.primary.mainGradient ,
  display:"flex",
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent:'space-between',
},
weAreBgLarge: {
  backgroundImage: `url(${Images.image17.default})`, //cambiar
},
weAreBgMedium:{
  backgroundImage: `url(${Images.image19.default})`, //cambiar
},
weAreBgSmall:{
  backgroundImage: `url(${Images.image20.default})`, //cambiar
},
container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    maxWidth: 1080,
},
buton: {
  fontSize: 18,
  margin: '40px 0',
  padding: '10px 20px',
  color: theme.palette.primary.main,
  border: '2px #D9D2C6 solid',
  '&:hover': {
      background: '#C33949',
      color: '#D9D2C6',
      border: '2px #C33949 solid',
    }
},
buton2: {
  fontSize: 18,
  margin: '20px 0',
  padding: '10px 20px',
  color: theme.palette.secondary.main,
  border: '2px #D9D2C6 solid',
  '&:hover': {
      background: '#186858',
      color: 'white',
      border: '2px #186858 solid',
    }
  },
buton4: {
    fontSize: 18,
    margin: '40px 0',
    padding: '10px 20px',
    color: '#D9D2C6',
    border: '2px #186858 solid',
    background: '#186858',
    '&:hover': {
      color: '#D9D2C6',
      border: '2px #186858 solid',
      }
    },
buton3: {
  fontSize: 18,
  margin: '20px 0',
  padding: '10px 20px',
  color: '#3C4186',
  border: '2px #D9D2C6 solid',
  '&:hover': {
      background: '#3C4186',
      color: 'white',
      border: '2px #3C4186 solid',
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
},
yourPlace:{
  marginTop: 100,
},
poligons1:{
  minWidth: 510,
  minHeight: 520,
  position: 'absolute',
  zIndex: '-2',
  left: 0,
},
poligons2:{
  position: 'absolute',
  top: -300,
  zIndex: '-3',
  width: '100vw',
}
}));

const WorkShop = ({messages}) => {
  const classes = useStyles();
  let history= useHistory();
  const {isLarge, isMedium } = useReactive();
  const bg = (isLarge) ? 'bgLarge' : (isMedium) ? 'bgMedium' : 'bgSmall';
  return (
  <>
    <Box className={classes.root}>
    <Box className={clsx(classes.bgHeader, classes[bg])} >
    <Box id={messages.create.workshop} >
      <Container className={classes.stories} maxWidth="xl">
          <Grid container spacing={8} >
            <Grid item className={classes.top} xs={12} sm={6}>
              <Typography gutterBottom variant="h2" >{messages.create.wokshop_header}</Typography>
              <Typography gutterBottom variant="h3" >{messages.create.wokshop_subheader}</Typography>
              <Button onClick={() => history.push("/"+messages.menu.connect+"#"+messages.menu.register)} className={classes.buton2}>{messages.menu.joinus}</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
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
              <Button onClick={() => history.push("/"+messages.menu.service+"/"+messages.menu.story)} className={classes.buton3}>{messages.create.know_more}</Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
    </Box>

 </>
)};
const Community = ({history, messages}) => {
  const classes = useStyles();
  const {isLarge, isMedium } = useReactive();
  const bg = (isLarge) ? 'weAreBgLarge' : (isMedium) ? 'weAreBgMedium' : 'weAreBgSmall';

  return (
    <Box id={messages.create.community} className={clsx(classes.weAre, classes[bg])}  >
      <Box className={classes.weAreBg} >
      <Box className={classes.dividerShape2} >
        <svg className={classes.dividerSvg2} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,153 C0,153 11,50 83.5,50 C156,50 131.001,153 172,153 C213,153 201,10 263.5,10 C326,10 323,153 372.5,153 C422,153 393,30 446.5,30 C500,30 458,153 519.5,153 C581,153 540,50 590.5,50 C641,50 604.001,123 648,123 C692,123 660,50 704.5,50 C749,50 722,153 773,153 C824,153 803,0 841.5,0 C880,0 869,153 926,153 C983,153 962,50 1014.5,50 C1067,50 1023,153 1082,153 C1141,153 1117,90 1153.5,90 C1190,90 1200,153 1200,153 L1200,226 L0,226 L0,153 Z" className={classes.shapeFill2} ></path>
        </svg>
      </Box>
      <Container className={classes.container} >
        <Typography color="textSecondary" align="center" gutterBottom variant="h2" >{messages.create.community_we_are}</Typography>
        <Typography  color="textSecondary" align="center" gutterBottom variant="h3" >{messages.create.community_we_create}</Typography>
        <Button className={classes.buton4} onClick={(e) => history.push('/'+messages.menu.community)}>{messages.create.meet_comunity}</Button>
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
  let history = useHistory();
  return (
  <Box id={messages.create.join_us}>
    <Container className={classes.bePart} maxWidth="md">
      <Typography align="center" gutterBottom color="white" variant="h1" >{messages.create.joinus_header}</Typography>
      <Typography className={classes.yourPlace} align="center"  color="primary" variant="h3" >{messages.create.your_place}</Typography>
      <Button onClick={() => history.push("/"+messages.menu.connect+"#"+messages.menu.register)} className={classes.buton}>{messages.create.join_us}</Button>
    </Container>
  </Box>
)};
const Create = (props) => {
    const {messages} = props.intl;
    const {hash} = useLocation();
    return (
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages.menu.create}</title>
        <meta name="description" content="This is create page" />
        <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.create} />
      </Helmet>
      <Box id="create" className="main" >
      <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.workshop)}>
        <WorkShop messages={messages} history={props.history}/>
      </ScrollIntoViewIfNeeded>
      <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.community)}>
        <Community messages={messages} history={props.history}/>
      </ScrollIntoViewIfNeeded>
      <ScrollIntoViewIfNeeded active={(hash && hash.substring(1) === messages.menu.joinus)}>
        <JoinUs messages={messages} history={props.history}/>
      </ScrollIntoViewIfNeeded>
      </Box>
      </>
    )
};

export default injectIntl(Create);
