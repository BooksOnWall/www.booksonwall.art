import React, { Component } from 'react';
import {
    CardContent,
    CardMedia,
    Typography,
    Card,
    Box,
    Container,
    Avatar,
    makeStyles
  } from '@material-ui/core';

import { injectIntl } from 'react-intl';
import Image from 'material-ui-image';
import  ReactMarkdown from 'react-markdown';
import ImageGallery from 'react-image-gallery';
import { useLocation, useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';

const apiURL = process.env.REACT_APP_API;
const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    minHeight: 300,
    margin: 20,
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
  body:{
  }
});
const StoryHeader = ({story, md}) => {
  const classes = useStyles();

  return (
    <Card  className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography color="primary" align="center" variant="h2"  component="h2">{story.name}</Typography>
        <Typography color="textPrimary" align="center" variant="subtitle1" component="h2">Salto, Montevideo Uruguay</Typography>
        <Typography color="textPrimary" align="center" variant="h6" component="h2">By BooksOnWall</Typography>
      </CardContent>
  </Card>
  );
}
const StoryGallery = ({gallery, apiURL}) => {
  let set = [];
  if (gallery) {
    gallery.map((img,i) => set.push({
      original : apiURL + img.formats.large.url,
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
  <Box   className={classes.body}><ReactMarkdown children={story.story_content} /></Box>
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
        <Card key={i} >
          {/* }<CardMedia
            className={classes.media}
            image={(part.avatar) ? apiURL+part.avatar.formats.thumbnail.url: null}
            title={part}
            /> */}

          <CardContent >
            {part.avatar &&
              <Avatar src={apiURL+part.avatar.formats.thumbnail.url} />
            }
            {(part.name) ? part.name : ''}
          </CardContent>
        </Card>
      )) : '' ;
}


const Credits = ({credits}) => {
const classes = useStyles();

return (
  <Box>
    <Typography gutterBottom align="center" variant="h4" component="h4">Credits</Typography>
    {(credits) ? credits.map((cred, i) => (
      <Box key={'cat'+i}>
        <Typography gutterBottom  align="center" variant="h5" component="h4">{cred.category}</Typography>
        <Participants participants={cred.participant} />
      </Box>
    )):''}
  </Box>
)
};


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
    const {story, apiURL} = this.state;
    return (story) ?  (
      <Box className="main">
      <Box className="story">
        <ScrollIntoViewIfNeeded active={true}>
        {story.header_image && <Image aspectRatio={2/1} src={apiURL + story.header_image.formats.medium.url} />}
        </ScrollIntoViewIfNeeded>
          <Box className="bodyStory">
            <StoryHeader story={story}/>
          </Box>
          <StoryGallery gallery={story.gallery} story={story} apiURL={apiURL}/>
          <Container maxWidth="xl" className="bodyStory">
            <Container className="bodyStory">
              <StoryBody storybody={story.content} story={story}/>
            </Container>
            <Sponsors sponsors={story.sponsors} story={story}/>
            <Credits credits={story.credits} story={story}/>
          </Container>
      </Box>
      </Box>
    ) : '';
  }
}
export default injectIntl(Story);
