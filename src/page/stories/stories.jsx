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
    maxWidth: 600,
    minHeight: 400,
    minWidth: 300,
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    flex: "2 1 auto"
  },
  actionArea:{
    display: 'flex',
    padding: '0 180px 150px 30px',
    borderRadius: 20,
    minHeight: 590,
    },
  media: {
    minHeight: 250,
    minWidth: 250,
    maxWidth: 400,
    maxHeight: 400,
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    rotate: '-3deg',
    flex: '2 1 auto'
  },
  content:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    background: '#fff',
    width: '80%',
    maxWidth: 360,
    minWidth: 260,
    position: 'absolute',
    top: 260,
    left: '25%',
    borderRadius: 8,
    padding: 20
  },
  actions:{
    padding: '25px 0 0'
  },
  readMore:{
  }
});
const DividerTop =() => {
  const classes = useStyles();
  return (
    <Box className={classes.dividerShape} >
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={classes.shapeFill} ></path>
        </svg>
    </Box>
  )
};
const StoriesList = ({stories, apiURL, goToStory, messages }) => {
  const classes = useStyles();
  return stories.map((story, i) => (
    <Card elevation={0}  className={classes.root} key={'story'+i}>
    <CardActionArea className={classes.actionArea}>
       <CardMedia
         onClick={(e) => goToStory(story.name)}
         className={classes.media}
         image={apiURL + story.header_image.formats.medium.url}
         title={story.name}
       />
       <CardContent className={classes.content}>
         <Typography gutterBottom color="textPrimary" variant="h3" component="h2">{story.name}</Typography>
         <Typography variant="body2" color="textPrimary" component="p">{story.story_header}</Typography>
         <CardActions className={classes.actions}>
          <Button elevation={0} variant="outlined" color="primary" size="small" onClick={(e) => goToStory(story.name)} >{messages.stories.read_more_btn}</Button>
         </CardActions>
       </CardContent>
     </CardActionArea>
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
      <Box id={messages.menu.stories} className="stories">
      <Box id="storiesTitle">
        <Typography variant="h1" color="secondary" component="h2" style={{textTransform:'uppercase'}}> {messages.menu.stories}</Typography>
      </Box>
        <Box className='map' >{stories.length > 0 ? <ExploreMap stories={stories} /> : ''}
        </Box>
        <Box className='mapbg'><Mapbg /></Box>

        <Box id="storyList">
          <StoriesList messages={messages} goToStory={this.goToStory} stories={stories} apiURL={apiURL}/>
        </Box>
      </Box>
    )
  }
};

export default injectIntl(Stories);
