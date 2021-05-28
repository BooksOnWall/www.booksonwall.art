import React, { Component } from 'react';
import {
    CardContent,
    CardMedia,
    Typography,
    Card,
    Box,
    makeStyles
  } from '@material-ui/core';

import { injectIntl } from 'react-intl';
import Image from 'material-ui-image';
import  ReactMarkdown from 'react-markdown';
import ImageGallery from 'react-image-gallery';
import Avatar from '../../assets/images/avatar/';


const apiURL = process.env.REACT_APP_API;
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const StoryHeader = ({story, md}) => {
  return (
    <Card >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {story.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <ReactMarkdown children={story.story_header} />
        </Typography>
      </CardContent>
  </Card>
  );
}
const StoryGallery = ({gallery, apiURL}) => {
  let set = [];
  gallery.map((img,i) => set.push({
    original : apiURL + img.formats.large.url,
    thumbnail: apiURL + img.formats.thumbnail.url
  }));
  return (
    <ImageGallery items={set} />
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
          <CardMedia
            className={classes.media}
            image={(!Avatar[part])? Avatar['default_avatar']: Avatar[part]}
            title={part}
            />
          <CardContent >
            {part}
          </CardContent>
        </Card>
      )) : '' ;
}


const Credits = ({credits}) => (
  <Box>
    <h5>Credits</h5>
    {(credits) ? credits.map((cred, i) => (
      <Box key={'cat'+i}>
        <h6>{cred.category}</h6>
        <Participants participant={cred.participant} />
      </Box>
    )):''}
  </Box>
);
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
    const fetchURL = apiURL + '/stories?name='+name+'&lang='+lang;
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
    console.log(story);
    return (story) ?  (
      <Box className="main">
        {story.header_image && <Image src={apiURL + story.header_image.formats.medium.url} />}
        <StoryHeader story={story}/>
        <StoryGallery gallery={story.gallery} story={story} apiURL={apiURL}/>
        <Box><ReactMarkdown children={story.story_content} /></Box>
        <Sponsors sponsors={story.sponsors} story={story}/>
        <Credits credits={story.credits} story={story}/>
      </Box>
    ) : '';
  }
}
export default injectIntl(Story);
