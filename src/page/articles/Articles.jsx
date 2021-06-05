import React, { Component } from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import {
    CardContent,
    CardActionArea,
    CardMedia,
    Typography,
    Card,
    CardActions,
    Box,
    Button,
    Grid,
    Backdrop,
    CircularProgress,
    Container,
    makeStyles
  } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'
import ToggleButton from '@material-ui/lab/ToggleButton';

import Home from "../../assets/images/pages/home.jpg";

import { injectIntl} from 'react-intl';
const apiURL = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  articles:{
    padding: '80px 40px'
  },
  card: {
    minWidth: 420,
    maxWidth: 620,
    background: 'transparent',
    borderRadius: 10,
    flexGrow: 2,
    margin: 20
  },
  media: {
    height: 360,
    borderRadius: 10,
  },
  CardContent: {
    padding: '30px 20px 10px',
    background: 'transparent',
  },
  CardActions:{
    padding: '10px 20px 20px',
    background: 'transparent'
  },
  CardActionArea:{
    borderRadius: 10,
    background: 'transparent',
    '&:hover': {
      background: 'transparent'
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#99FF44',
  },
  homeHader:{
    backgroundColor: '#ccc',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
    backgroundImage: `url(${Home})`,
    padding: 0,
    margin: '0 0 80px 0'
  },
  homeHaderGradient:{
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    background: theme.palette.secondary.mainGradient,
    minHeight: '30vh',
    minWidth: '100vw'
  },
  dividerShape: {
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    transform: 'rotate(0deg)',
    bottom: 0
  },
  shapeFill: {
   fill: '#fafafa',
  },
  dividerSvg: {
    position: 'relative',
    display: 'block',
    width: 'calc(101% + 1.3px)',
    height: '35px',
  },
  button: {
    margin: '20px 0',
    border: '0px #D9D2C6 solid',
    padding: '10px 20px',
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: 'white',
          border: '0px solid',
          borderColor: theme.palette.secondary.main,
      }
    },
}));


const ArticlesHeader = ({messages}) => {
  const classes = useStyles();
  return (
    <Box className={classes.homeHader}>
    <Box className={classes.homeHaderGradient}>
      <Container maxWidth='xs' className={classes.tileHead}>
        <Typography gutterBottom color="textSecondary" variant="h1" >{messages.menu.articles}</Typography>
      </Container>
      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
             <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={classes.shapeFill}></path>
         </svg>
      </Box>
    </Box>
    </Box>
  )
};

const News = ({messages, insert, articles, goToArticle, selected , hasCategory }) => {
  const classes = useStyles();

  if(articles) console.log(articles[0]);

  return  (
    <>
    {insert &&
      <Carousel className="carou"
      autoPlay={false}
      >
    <Grid container spacing={0} className="BannerGrid">
    {articles.map((article, i) => (
    <Grid item xs={12/4} key={'gg'+i}>
    <Card className={classes.card} elevation={0} key={'article'+i}>
    <CardActionArea className={classes.CardActionArea}>
       <CardMedia
         onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)}
         className={classes.media}
         image={apiURL + article.header_image.formats.medium.url}
         title={article.title}
       />
       <CardContent className={classes.CardContent} >
         <Typography gutterBottom variant="h6" component="h3">
           {article.title}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
           {article.article_header}
         </Typography>
       </CardContent>
     </CardActionArea>
     <CardActions className={classes.CardActions}>
      <Button className={classes.button} variant='contained' size="small" color="secondary" onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)} >{messages.stories.read_more_btn}</Button>
     </CardActions>
    </Card>
    </Grid>
  ))}
 </Grid>
  </Carousel>

  }
  {!insert &&
    <>
    {articles.map((article, i) => (
    <Grid item xs>
    <Card className={classes.card} elevation={0} key={'article'+i}>
    <CardActionArea className={classes.CardActionArea}>
       <CardMedia
         onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)}
         className={classes.media}
         image={apiURL + article.header_image.formats.medium.url}
         title={article.title}
       />
       <CardContent className={classes.CardContent} >
         <Typography gutterBottom variant="h6" component="h3">
           {article.title}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
           {article.article_header}
         </Typography>
       </CardContent>
     </CardActionArea>
     <CardActions className={classes.CardActions}>
     <Button className={classes.button} variant='contained' size="small" color="secondary" onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)} >{messages.stories.read_more_btn}</Button>
     </CardActions>
    </Card>
    </Grid>

  ))}
  </>
  }
  </>
  )
};
const Categories = ({messages, categories, selectCategory, selected}) => {
  return (
    <>
        {(categories) ? categories.map((cat, i) => <ToggleButton key={'cat'+i} onClick={(e) => selectCategory(e)}  style={{margin: '7px'}} color="primary" name={cat} >{cat}</ToggleButton>): ''}
    </>
  )
};
const ScrollToTop = ({insert}) => {
  return (
    <ScrollIntoViewIfNeeded active={!insert}></ScrollIntoViewIfNeeded>
  )
}
const ArticleList = ({loading, messages, history, articles, categories, selected, insert, goToArticle,hasCategory,selectCategory }) => {
  const classes = useStyles();
  return (
    <>
    <Backdrop styles={{zIndex: 1004, color: '#99FF44'}} open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>

    {articles && !insert &&
      <Box className={classes.articles}>

      <ScrollToTop insert={insert}/>
      {!insert && <Box style={{ alignItems: 'flex-start', display: 'flex', padding:' 80px 40px'}}>
        <Categories selected={selected} categories={categories} messages={messages} selectCategory={selectCategory}/>
      </Box>}
      <Box style={{justifyContent: 'space-around', display: 'flex',padding:' 20px 40px'}}>
        <Grid container spacing={3}>

          <News hasCategory={hasCategory} selected={selected} articles={articles} messages={messages} goToArticle={goToArticle}/>

        </Grid>
      </Box>
      {insert && <Button onClick={()=> history.push('/'+messages.menu.articles)}>See more</Button>}
      </Box>
    }
    {articles && insert &&
        <News hasCategory={hasCategory} insert={insert} selected={selected} articles={articles} messages={messages} goToArticle={goToArticle}/>
    }
    </>
  );
}
class Articles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiURL: apiURL,
      insert: this.props.insert,
      limit: this.props.limit,
      lang: this.props.intl.locale,
      articles: null,
      categories: null,
      loading: false,
      locale: this.props.intl.locale,
      selected: [],
    }
  }
  hasCategory = (e) => {
    const {selected} = this.state;
    let categories = e.categories;
    let hasIt = false;
    if(selected && selected.length > 0) {
      if (categories && categories.length > 0) {
        categories.filter(cat => (selected.indexOf(cat) === 0) ? hasIt = true : null);
      }
    } else {
      hasIt = true;
    }
    return hasIt;
  }
  selectCategory = (b) => {
    const cat = b.name;
    let {selected} = this.state;
    selected = (selected.indexOf(cat) === 0) ?  selected.filter(item => (item !== cat)) : [cat];
    this.setState({selected: selected});
  }
  goToArticle = (url) => {
    this.props.history.push('/'+ url);
  }
  loadArticles = async (filter, rows, index, sort, order) => {
    console.log("load articles");
    const { apiURL, locale, insert, limit } = this.state;
    const fetchURL = (insert) ? apiURL + '/articles?_limit='+limit+'&_sort=updated_at:desc&lang='+ locale: apiURL + '/articles?_limit=-1&_sort=updated_at:desc&lang='+ locale;
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
          console.log(data);
          const categories = [];
          data.map((art,i) => {
            art.categories.map(cat => {
              const exist = categories.filter(ct =>(ct === cat))[0];
              if(exist === undefined) {
                categories.push(cat);
              }
              return cat;
            })
            return art.categories;
          });
          console.log(categories);
          this.setState({articles: data, categories: categories, loading: false});
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });
  }
  componentDidMount = async () => {
    // update authenticated state on logout
    try {
      await this.loadArticles();
    } catch(e) {
      console.log(e.message);
    }
  }
  render() {
    const {articles, categories, selected, insert, loading} = this.state;
    const {messages} = this.props.intl;
    // date: '22 dec 2017',
    // title: 'BooksOnWall has started !',
    // header: 'My header',
    // content: 'My beautiful content',
    // categories: ['Press'],
    // author: 'Tom Bouillut',
    // images: [],
    return (
        <>
          {!insert && <ArticlesHeader messages={messages} /> }
          <ArticleList
            loading={loading}
            articles={articles}
            messages={messages}
            history={this.props.history}
            categories={categories}
            selected={selected}
            insert={insert}
            goToArticle={this.goToArticle}
            hasCategory={this.hasCategory}
            selectCategory={this.selectCategory}
          />
        </>
    )
  }
}
export default injectIntl(Articles);
