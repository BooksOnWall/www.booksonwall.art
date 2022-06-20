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
    Container,
    Grid,
    makeStyles
  } from '@material-ui/core';

import { injectIntl, defineMessages  } from 'react-intl';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {useReactive} from "../../utils/reactive";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Helmet} from "react-helmet";
import ExploreMap from '../map/exploreMap';
import { ReactComponent as Mapbg } from './../../assets/images/svg/map.svg';
import clsx from 'clsx';

const apiURL = process.env.REACT_APP_API;

const storiesTraductions = defineMessages({
  read_more_btn: {
    id: 'stories.read_more_btn',
    defaultMessage: 'Read more'
  },
  story_about: {
    id: 'stories.story_about',
    defaultMessage: 'BooksOnWall Ar is a library of stories, tales or immersive narratives that happen around the world and here are some of them that you can experience with the application. We also hope to be able to tell a story in your city soon. Would you like to create one?'
  },
  by_booksonwall: {
    id: 'stories.by_booksonwall',
    defaultMessage: 'By BooksOnWall'
  },
  see_all: {
    id: 'stories.see_all',
    defaultMessage: 'See All'
  },
  inmersive_storytelling: {
    id: 'stories.inmersive_storytelling',
    defaultMessage: 'Immersive storytelling through the city, urban art and culture.',
  },
  learn_how: {
    id: 'stories.learn_how',
    defaultMessage: 'Learn How',
  }
});

const useStyles = makeStyles((theme) => ({
  storiesTitleWrap:{
    paddingTop: 40,
    paddingBottom: 40
  },
  storiesTitle:{
    textTransform:'uppercase',
    paddingTop: '4vh'
  },
  storiesSubTitle:{
  },
  storiesBtnWarp:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  storiesBtnGrid: {
    justifyContent:'center'

  },
  storiesBtn:{
    margin: 10
  },
  storiesAbout:{
    paddingTop: 20
  },
  card: {
    background: 'transparent',
    alignItems: 'center',
    borderRadius: 18,
  },
  cardLarge:{
    maxWidth:800,
    margin: 30,
  },
  cadrMedium:{
    maxWidth: 620,
    margin: 20,
  },
  cardSmall:{
    maxWidth: 400,
    margin: 10,

  },
  actionArea:{
    },
  media: {
    minHeight:"100%",
    display: 'flex',
    flexDirection: 'column',
  },
  gridStory:{
    display:'flex',
    justifyContent: 'center'
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
  cardTitle:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  paragraph:{
    marginTop: 30,
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
  },
  mapBg: {
    position: 'absolute',
    zIndex: -999,
    opacity: .3,
    right: '0vw',
    paddingTop: '5vh',
  },
  mapbgLarge: {
    maxWidth:'90vw',
  },
  mapbgMedium: {
    maxWidth:'90vw',
  },
  mapbgSmall: {
    maxWidth:'100vw',
    paddingTop: '-5vh',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#91201F',
  },
  insertBackdrop:{
    zIndex: "inherit",
    position: "relative"
  },
}));
const MapBackground =() => {
  const classes = useStyles();
  const { isLarge, isMedium, isSmall } = useReactive();
  const mapbg = (isLarge) ? 'mapbgLarge': (isMedium) ? 'mapbgMedium': 'mapbgSmall' ;

  return (
    <Box ><Mapbg className={clsx(classes.mapBg, classes[mapbg])} /></Box>
  )
}

const StoriesList = ({stories, apiURL, goToStory, messages, theme }) => {
  const classes = useStyles();
  const { isLarge, isMedium, isSmall } = useReactive();
  const format = (isLarge) ? 'large': (isMedium) ? 'large': (isSmall) ? 'small' : 'thumbnail';
  const hideText = (isSmall) ? true : false ;
  const card = (isSmall) ? 'small' : (isMedium) ? 'cardMedium' : 'cardLarge' ;

  return stories.map((story, i) => (
    <Grid item className={classes.gridStory}>
    <Card elevation={1} className={clsx(classes.card, classes[card])} key={'story'+i}>
       <CardMedia
         onClick={() => goToStory(messages.menu.story+'/'+story.name)}
         className={classes.media}
         image={apiURL + story.header_image.formats[format].url}
         title={story.name}
       >
       <CardContent className={classes.content}>
        <Box className={classes.cardTitle}>
         <Typography gutterBottom color="textSecondary" variant="h2" align="center" component="h2">{story.name}</Typography>
         <Typography color="textSecondary" variant="h6" align="center" component="h2">{messages.stories.by_booksonwall}</Typography>
         </Box>
         {!hideText &&
         <Typography className={classes.paragraph} variant="subtitle1" align="center" color="textSecondary" component="p"><ReactMarkdown  remarkPlugins={[gfm]}  children={story.story_header} /></Typography>
         }
         <CardActions className={classes.actions}>
          <Button className={classes.storyBtn} elevation={0} variant="outlined" color="primary" size="large" onClick={() => goToStory(messages.menu.story+'/'+story.name)} endIcon={<ChevronRightIcon/ >}>{messages.stories.read_more_btn}</Button>
         </CardActions>
       </CardContent>
       </CardMedia>

    </Card>
      </Grid>
  ));
};
const ScrollToTop = ({insert, loading}) => {
  const classes = useStyles();
  return (
    <ScrollIntoViewIfNeeded active={!insert}>
      <Backdrop className={(insert) ? classes.insertBackdrop : classes.backdrop} open={loading} >
          <CircularProgress
          size={90}
          thickness={8}
          />
      </Backdrop>
    </ScrollIntoViewIfNeeded>
  )
}

const  StoriesTitle =({messages, insert}) => {
  let history = useHistory();
  const classes = useStyles();
  return(
    <>
    <Container maxWidth='xl'>
      <Box className={classes.storiesTitleWrap}>
        <Typography className={classes.storiesTitle} variant="h2" color="textPrimary" component="h1" align="center" > {messages.menu.stories}</Typography>
        <Typography gutterBottom className={classes.storiesSubTitle} variant="h3" color="secondary" component="h2" align="center" > {messages.stories.inmersive_storytelling}</Typography>
        {!insert && <Typography gutterBottom className={classes.storiesAbout} variant="subtitle1" color="textPrimary" component="body" align="center"> {messages.stories.story_about}</Typography>}

        <Box className={classes.storiesBtnWarp}>
        <Grid className={classes.storiesBtnGrid} container>
          <Button onClick={() => history.push('/'+messages.menu.stories)} className={classes.storiesBtn} elevation={1} variant="outlined" color="primary" size="large" endIcon={<ChevronRightIcon/ >}>{messages.stories.see_all}</Button>
          {!insert && <> <Button onClick={() => history.push('/'+messages.menu.support)} className={classes.storiesBtn} elevation={1} variant="outlined" color="primary" size="large" endIcon={<ChevronRightIcon/ >}>{messages.menu.support}</Button>
          <Button onClick={() => history.push('/'+messages.menu.service+'/'+messages.menu.story)} className={classes.storiesBtn} elevation={1} variant="outlined" color="primary" size="large" endIcon={<ChevronRightIcon/ >}>{messages.stories.learn_how}</Button> </>}
          </Grid>
        </Box>
      </Box>
      </Container>
</>
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
    console.log('insert',insert);
    const { messages } = this.props.intl;
    return (
      <>
      {!insert &&
        <Helmet>
          <meta charSet="utf-8" />
          <title>{messages.menu.stories}</title>
          <meta name="description" content="This is stories page" />
          <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.stories} />
        </Helmet>
      }
      <ScrollToTop insert={insert} loading={loading}/>

      {stories &&
        <Box id={messages.menu.stories} className="stories">
        {!insert &&
          <Box className='map' >
            {stories.length > 0 ? <ExploreMap stories={stories} /> : ''}
          </Box>
        }
          <StoriesTitle messages={messages} insert={insert} />
          <MapBackground />
          <Box >
            <Grid container spacing={8} alignItems='center'>
            <StoriesList messages={messages} goToStory={this.goToStory} stories={stories} apiURL={apiURL}/>
            </Grid>
          </Box>
        </Box>
      }
      </>
    )
  }
};

export default injectIntl(Stories);
