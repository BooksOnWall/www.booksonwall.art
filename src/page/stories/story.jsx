import React, { Component } from 'react';
import {
    CardContent,
    CardMedia,
    Typography,
    Card,
    Box,
    Container,
    Backdrop,
    CircularProgress,
    Avatar,
    Grid,
    makeStyles
  } from '@material-ui/core';

import { injectIntl } from 'react-intl';
import {useReactive} from "../../utils/reactive";
import Image from 'material-ui-image';
import  ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import ImageGallery from 'react-image-gallery';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import Patrick from "../../assets/images/avatar/patrick 3.png";


const apiURL = process.env.REACT_APP_API;
const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    minHeight: 300,
    margin: 20,
    background: 'transparent',
  },
  cardAvatar:{
    background:'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  media: {
    height: 140,
  },
  cardContent:{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '20px 60px',
  },
  avatar:{
    height: 140,
    width: 140,
  },
  bodyMarkdown:{
    fontSize: '1.33rem',
    lineHeight: '1.66rem',
    '& li':{
    }
  },
  gridParticipan:{
    display: 'flex',
    justifyContent: 'space-around'
  },
  headerImage:{
    minHeight: '90vh',
    maxHeight: '55vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    },
    dividerShape: {
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: 'rotate(0deg)',
    },
});
const StoryHeader = ({story, md}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent className={classes.cardContent}>
        <Typography color="primary" align="center" variant="h1"  component="h1">{story.name}</Typography>
        <Typography color="textPrimary" align="center" variant="subtitle1" component="h2">Salto, Montevideo Uruguay</Typography>
        <Typography color="primary" align="center" variant="h6" component="h3">By BooksOnWall</Typography>
      </CardContent>
  </Card>
  );
}
const StoryGallery = ({gallery, apiURL}) => {
  let set = [];
  const { isLarge, isMedium, isSmall } = useReactive();
  const format = (isSmall) ? 'large': (isMedium) ? 'medium': (isLarge) ? 'large' : 'large';
  if (gallery) {
    gallery.map((img,i) => set.push({
      original : apiURL + img.formats[format].url,
      thumbnail: apiURL + img.formats.thumbnail.url
    }));
  }

  return (
    <ImageGallery items={set} />
  )
};

const StoryBody = ({story}) => {
const classes = useStyles();
return (
  <Box  ><ReactMarkdown  remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}  className={classes.bodyMarkdown} children={story.story_content} /></Box>
)
};

const Sponsors = ({sponsors}) => {
  const classes = useStyles();
  return (sponsors) ? sponsors.map((org, i) => (
      <Card key={i} >
          <CardMedia
            className={classes.media}
            image={apiURL + org.logo.formats.thumbnail.url}
            title={org.name}
            />
          <CardContent >
            <Typography gutterBottom variant="h5" component="h2">
              {org.name}
            </Typography>
          </CardContent>
        </Card>
    )) : '';
}

const Participants = ({participants}) =>  {
  const classes = useStyles();
  return (participants) ? participants.map((part, i) => (
        <Grid item key={i}   xs={6} md={6} xl={3}>
          <Card elevation={0} className={classes.cardAvatar}>
            {part.avatar ?
              <Avatar className={classes.avatar} title={part.name} src={apiURL+part.avatar.formats.thumbnail.url} /> : <Avatar className={classes.avatar}  src={Patrick} />
            }
            {part.name &&
            <CardContent>
            <Typography variant="button" component="h4">{part.name}</Typography>
            </CardContent>
          }
          </Card>
        </Grid>
      )) : '' ;
}



const Credits = ({credits}) => {
  const classes = useStyles();

return (
  <Box>
    <Typography gutterBottom align="center" variant="h4" component="h4" color='secondary' style={{}}>Credits</Typography>
    {(credits) ? credits.map((cred, i) => (
      <Box className={classes.creditWrapper} key={'cat'+i}>
        <Typography gutterBottom  align="center" variant="h5" color='primary'  component="h4" style={{paddingTop: 80, paddingBottom:30}}>{cred.category}</Typography>
        <Grid container spacing={8} className={classes.gridParticipan}>
          <Participants participants={cred.participant} />
        </Grid>
      </Box>
    )):''}
  </Box>
)
};

const StoryPage = ({story, messages, locale, history}) => {
  const classes = useStyles();
  const { isLarge, isMedium, isSmall } = useReactive();
  const format = (isSmall) ? 'small': (isMedium) ? 'medium': (isLarge) ? 'large' : 'large';
  return (
    <Box className="main">
    <Box className="story">
      <ScrollIntoViewIfNeeded active={true}>
        {(story.header_image) ? <Box className={classes.headerImage} style={{ backgroundImage: `url(${apiURL + story.header_image.formats[format].url})`, }}>
          <StoryHeader story={story}/>
        </Box> : ''}
      </ScrollIntoViewIfNeeded>
      <Container maxWidth="xl">
        <Grid container spacing={10} className={classes.headerIbodyStorymage}>
            <Grid item xs={12} md={6}>
                <StoryBody storybody={story.content} story={story}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <StoryGallery gallery={story.gallery} story={story} apiURL={apiURL}/>
            </Grid>
          </Grid>
      </Container>
      <Container>
      <Grid container spacing={10} className={classes.headerIbodyStorymage}>
          <Grid item xs={12} md={12}>
            <Credits credits={story.credits} story={story}/>
          </Grid>
          <Grid item xs={12} md={12}>
            <Sponsors sponsors={story.sponsors} story={story}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </Box>
  )
}
class Story extends Component {
  constructor(props) {
    super(props)
    const {messages, locale} = this.props.intl;
    const name = this.props.history.location.pathname.replace("/"+messages.menu.story+"/", "");
    console.log(name);
    // const credits = require(story.credits);
    this.state = {
      apiURL:apiURL,
      name: name,
      lang: locale,
      loading: false,
      stories: null,
        story: null,
        credits: null,
        gallery: null,
        sponsors: null, //story.credits.sponsors,
        md : null,
      }
  }
  loadStory = async (rows, index, sort, order) => {
    const { apiURL, name, lang } = this.state;
    const fetchURL = apiURL + '/stories?name='+encodeURIComponent(name)+'&lang='+lang;
    this.setState({loading: true});

    await fetch(fetchURL, {
      crossDomain:true,
      headers: {'Content-Type':'application/json'},
      method: "get"
    })
    .then(response => {
      if (response && !response.ok) { throw new Error(response.statusText);}
      return response.json();
    })
    .then(data => {
        if(data) {
          console.log(data);
          this.setState({loading: false, story: data[0]});
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });
  }
  componentDidMount = async () =>  {
    await this.loadStory();
  }
  render() {
    const {story, loading, locale, messages} = this.state;
    return (
      <>

      <Backdrop styles={{zIndex: 1004, color: '#91201F'}} open={loading} >
      <CircularProgress
      size={90}
      thickness={8}
      />
      </Backdrop>

      {story && <StoryPage story={story} history={this.props.history} messages={messages} locale={locale} />}

      </>
    )
  }
}
export default injectIntl(Story);
