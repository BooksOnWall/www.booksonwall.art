import React, { Component } from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import {
    Box,
    CardContent,
    CardMedia,
    Typography,
    Card,
    CardActions,
    Backdrop,
    CircularProgress,
    Button,
    makeStyles
  } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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

const useStyles = makeStyles((theme) => ({
  card: {
    background: 'transparent',
    alignItems: 'center',
    margin: 30,
    maxWidth: 1000,
    minWidth: 320,
    borderRadius: 21,
  },
  actionArea:{
    },
  media: {
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
  },
  content:{
    background: theme.palette.primary.mainGradient,
    padding: 60,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    minHeight: '100%',
    justifyContent: 'center'
  },
  title:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  paragraph:{
    marginTop: 30,
    maxWidth: 620
  },
  actions:{
    padding: '25px 0 0'
  },
  readMore:{
  },
  storyBtn:{
    margin: 20,
    color: "#fff",
    border: '2px solid transparent',
    borderRadius: 8,
    '&:hover':{
      color: '#fff',
      border: '2px solid #fff',
      borderRadius: 8,
    }
  }
}));

const StoriesList = ({stories, apiURL, goToStory, messages }) => {
  const classes = useStyles();
  return stories.map((story, i) => (
    <Card elevation={1} className={classes.card} key={'story'+i}>
       <CardMedia
         onClick={() => goToStory(messages.menu.story+'/'+story.name)}
         className={classes.media}
         image={apiURL + story.header_image.formats.medium.url}
         title={story.name}
       >
       <CardContent className={classes.content}>
        <Box className={classes.title}>
         <Typography  color="textSecondary" variant="h2" align="center" component="h2">{story.name}</Typography>
         <Typography gutterBottom color="textSecondary" align="center" variant="subtitle1" component="subtitle1">Salto, Montevideo Uruguay</Typography>
         <Typography  color="textSecondary" variant="h6" align="center" component="h2">By BooksOnWall</Typography>
         </Box>
         <Typography className={classes.paragraph} variant="body1" align="center" color="textSecondary" component="p">{story.story_header}</Typography>
         <CardActions className={classes.actions}>
          <Button className={classes.storyBtn} elevation={0} variant="outlined" color="primary" size="large" onClick={() => goToStory(messages.menu.story+'/'+story.name)} endIcon={<ChevronRightIcon/ >}>{messages.stories.read_more_btn}</Button>
         </CardActions>
       </CardContent>
       </CardMedia>

    </Card>
  ));
};
const ScrollToTop = ({insert}) => {
  return (
    <ScrollIntoViewIfNeeded active={!insert}>
    </ScrollIntoViewIfNeeded>
  )
}
class Stories extends Component {
  constructor(props) {
    super(props)
    this.state = {
        stories: [],
        insert: this.props.insert,
        limit: this.props.limit,
        apiURL: apiURL,
        support: null,
        loading: false,
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
    const { apiURL, insert, locale, limit } = this.state;
    const fetchURL = (insert) ? apiURL + '/stories?_limit='+limit+'&_sort=updated_at:desc&lang=' + locale: apiURL + '/stories?_limit=-1&_sort=updated_at:desc&lang=' + locale;
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
  goToStory = (url) => {
    console.log('url', url);
    this.props.history.push('/' + url)
  }
  render() {
    const { stories, apiURL, insert, loading } = this.state;
    const { messages } = this.props.intl
    return (
      <>
      <ScrollToTop insert={insert} />
      <Backdrop styles={{zIndex: 1004, color: '#99FF44'}} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      {stories &&
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
      }
      </>
    )
  }
};

export default injectIntl(Stories);
