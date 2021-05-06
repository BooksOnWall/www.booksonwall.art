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

import Avatar from '../../assets/images/avatar/';
import ImageGallery from 'react-image-gallery';

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
          {story.story_header}
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
    const name = this.props.history.location.pathname.replace("/stories/", "");
    console.log(name);
    // const credits = require(story.credits);
    this.state = {
      apiURL:apiURL,
      name: name,
      stories: null,
        story: null,
        credits: null,
        gallery: null,
        sponsors: null, //story.credits.sponsors,
        md : null,
      }
  }
  loadStory = async (name, rows, index, sort, order) => {
    console.log("load story");
    const { apiURL } = this.state;
    const fetchURL = apiURL + '/stories';
    this.setState({loading: true});
    console.log("URL",fetchURL );

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
      console.log(data);
        if(data) {
          console.log(data);
          const story = data.filter(story => (story.name === this.state.name))[0];
          this.setState({stories: data, loading: false, story: story});
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
    // update authenticated state on logout
    //
    await this.loadStory();
  }
  render() {
    const {story, apiURL} = this.state;
    return (story) ?  (
      <Box className="main">
        <StoryGallery gallery={story.gallery} story={story} apiURL={apiURL}/>
        <StoryHeader story={story}/>
        <Box>{story.story_content}</Box>
        <Sponsors sponsors={story.sponsors} story={story}/>
        <Credits credits={story.credits} story={story}/>
      </Box>
    ) : '';
  }
}
export default injectIntl(Story);
