import React, { Component } from 'react';

import {
    Box,
    Container,
    CardContent,
    CardActionArea,
    CardMedia,
    Typography,
    Card,
    CardActions,
    Button,
    makeStyles
  } from '@material-ui/core';

import { injectIntl, defineMessages  } from 'react-intl';

import ExploreMap from '../map/exploreMap';
import { ReactComponent as Mapbg } from './../../assets/images/svg/map.svg';

const apiURL = process.env.REACT_APP_API;

const storiesTraductions = defineMessages({
  read_more_btn: {
    id: 'stories.read_more_btn',
    defaultMessage: 'Read more'
  },
});

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180,
  },
  readMore:{
    color: '#E18C23'
  }
});

const StoriesList = ({stories, apiURL, goToStory, messages }) => {
  const classes = useStyles();
  return stories.map((story, i) => (
    <Card elevation={0}  className={classes.root} key={'story'+i}>
    <CardActionArea>
       <CardMedia
         onClick={(e) => goToStory(story.name)}
         className={classes.media}
         image={apiURL + story.header_image.formats.medium.url}
         title={story.name}
       />
       <CardContent>
         <Typography gutterBottom variant="h5" component="h2">
           {story.name}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
           {story.story_header}
         </Typography>
       </CardContent>
     </CardActionArea>
     <CardActions>
      <Button size="small" onClick={(e) => goToStory(story.name)} >{messages.stories.read_more_btn}</Button>
     </CardActions>
    </Card>
  ));
};
class Stories extends Component {
  constructor(props) {
    super(props)
    this.state = {
        stories: [],
        apiURL: apiURL,
        support: null,
        locale: this.props.intl.locale
      }
  }
  updateStories = (md) => {
    let {stories} = this.state;
    stories.push(md);
    this.setState({stories: stories});
  }
  loadStories = async (rows, index, sort, order) => {
    console.log("load stories");
    const { apiURL, locale } = this.state;
    const fetchURL = apiURL + '/stories?lang=' + locale;
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
        if(data) {
          this.setState({stories: data, loading: false});
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
    await this.loadStories();
  }
  goToStory = (url) => this.props.history.push('/stories/' + url)
  render() {
    const { stories, apiURL } = this.state;
    const { messages } = this.props.intl
    console.log(messages);
    return (
      <Box>
      <Container>{stories.length > 0 ? <ExploreMap stories={stories} /> : ''}</Container>
      <Box id="stories">
        <StoriesList messages={messages} goToStory={this.goToStory} stories={stories} apiURL={apiURL}/>
      </Box>
      </Box>
    )
  }
};

export default injectIntl(Stories);
