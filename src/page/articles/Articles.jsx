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
    Divider,
    makeStyles
  } from '@material-ui/core';
import  ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { useReactive } from '../../utils/reactive';
import loadable from '@loadable/component';
import {Helmet} from "react-helmet";
import ToggleButton from '@material-ui/lab/ToggleButton';

import { injectIntl} from 'react-intl';
const apiURL = process.env.REACT_APP_API;

const ArticlesMap = loadable(() => import('../map/articlesMap'));

const useStyles = makeStyles((theme) => ({
  articles:{
    padding: 'px 0px'
  },
  card: {
    background: 'transparent',
    borderRadius: 10,
    flexGrow: '2 1 25%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: 10
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
  dividerCard:{ margin: '20px 0'},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#99FF44',
  },
  homeHeader:{
    color: 'white',
    padding: 0,
  },
  homeHeaderGradient:{
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    minHeight: '10vh',
    minWidth: '100vw',
    padding: '80px 40px',
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
    margin: '0',
    border: '0px #D9D2C6 solid',
    padding: '8px 15px',
    color: theme.palette.primary.main,
    '&:hover': {
        background: theme.palette.primary.main,
        color: 'white',
          border: '0px solid',
          borderColor: theme.palette.secondary.main,
      }
    },
  bannerGrid:{
    display: 'flex'
  },
  category:{
    color: '#fff',
    padding: '3px 12px',
    margin: 5,
    borderRadius: 20,
    background:theme.palette.secondary.main,
    "&:hover":{
      background:theme.palette.secondary.dark,
    }
  },
}));


const ArticlesHeader = ({messages, insert, articles}) => {
  const classes = useStyles();
  return (
    <Box className={classes.homeHeader}>
    {!insert &&
      <>
       <ArticlesMap articles={articles} mode={"Light"}/>
       <Box className={classes.homeHeaderGradient}>
         <Container maxWidth='false' className={classes.tileHead}>
           <Typography color="textPrimary" variant="h5" component="h1">{messages.menu.articles}</Typography>
         </Container>
       </Box>
      </>
    }
    </Box>
  )
};

const News = ({messages, insert, articles, goToArticle, selected , hasCategory }) => {
  const classes = useStyles();
  const { isLarge, isMedium, isSmall } = useReactive();
  const format = (isLarge) ? 'large': (isMedium) ? 'medium': (isSmall) ? 'small' : 'thumbnail';
  return  (
    <>
    {insert &&
    <Grid container spacing={4} style={{padding:40}}>
    {articles.map((article, i) => (
    <Grid item xs={12/1} md={12/2} xl={12/4} key={'gg'+i}>
    <Card className={classes.card} elevation={0} key={'article'+i}>
    <CardActionArea className={classes.CardActionArea} onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)} >
       <CardMedia
         onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)}
         className={classes.media}
         image={apiURL + article.header_image.formats[format].url}
         title={article.title}
       />
       <CardContent className={classes.CardContent} >
         <Typography gutterBottom variant="h4" component="h3">
           {article.title}
         </Typography>
       </CardContent>
     </CardActionArea>
     <CardActions className={classes.CardActions}>
      <Button className={classes.button} size="small" onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)} >{messages.stories.read_more_btn}</Button>
     </CardActions>
    </Card>
    </Grid>
  ))}
 </Grid>
  }
  {!insert &&
    <>
    <Grid container spacing={4} style={{padding:40}}>

    {articles.map((article, i) => (
      <Grid item xs={12/1} md={12/3} xl={12/6} key={'gg'+i}>
      <Card className={classes.card} elevation={0} key={'article'+i}>
        <CardActionArea className={classes.CardActionArea} onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)} >
           <CardMedia
             onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)}
             className={classes.media}
             image={apiURL + article.header_image.formats[format].url}
             title={article.title}
           />
           <CardContent className={classes.CardContent} >
             <Typography gutterBottom variant="h6" component="h3">
               {article.title}
             </Typography>
             <Typography gutterBottom variant="body2" color="textPrimary" component="p">
               <ReactMarkdown remarkPlugins={[gfm]} children={article.header} />
             </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions className={classes.CardActions}>
            <Button className={classes.button} size="small"  onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)} >{messages.stories.read_more_btn}</Button>
         </CardActions>
      </Card>
    </Grid>

  ))}
  </Grid>
  </>
  }
  </>
  )
};
const Categories = ({messages, categories, selectCategory, selected, lang}) => {
  const classes = useStyles();
  const isSelected = (cat) => (selected.length > 0 && selected[0] === cat) ? true : false;
  const categoryTranslations = require('../../i18n/locales/categories-'+lang+'.json');
  const translate = (cat) => {
    let index = cat.replace(/\s/g, '_');
    index = index.toLowerCase();
    return (categoryTranslations[index]) ? categoryTranslations[index] : cat;
  }
  return (
    <>
        {(categories) ? categories.map((cat, i) => <ToggleButton selected={isSelected(cat)} className={classes.category} key={'cat'+i} onClick={(e) => selectCategory(cat)}  style={{margin: '7px'}} color="primary" name={cat} >{translate(cat)}</ToggleButton>): ''}

    </>
  )
};
const ScrollToTop = ({insert}) => {
  return (
    <ScrollIntoViewIfNeeded active={!insert}></ScrollIntoViewIfNeeded>
  )
}
const ArticleList = ({loading, lang, messages, history, articles, categories, selected, insert, goToArticle,hasCategory,selectCategory }) => {
  const classes = useStyles();

  return (
    <>
    <Backdrop open={loading} >
      <CircularProgress
      size={60}
      thickness={8}
      className="CircularProgress"
      />
    </Backdrop>

    {articles && !insert &&
      <Box className={classes.articles}>

      <ScrollToTop insert={insert}/>

        <Divider/>
        <Box style={{ alignItems: 'flex-start', display: 'flex', padding:' 40px 40px 40px',}}>
          <Categories lang={lang} selected={selected} categories={categories} messages={messages} selectCategory={selectCategory}/>
        </Box>
        <Divider/>

      <Box style={{justifyContent: 'space-around', display: 'flex',padding:' 60px 40px'}}>
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
      index: 0,
      sort: 'updated_at:desc',
      filter: this.props.filter,
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
  selectCategory = (cat) => {
    let {selected} = this.state;
    selected = (selected.indexOf(cat) === 0) ?  selected.filter(item => (item !== cat)) : [cat];
    const filter =  (selected && selected.length >0) ? '&categories_contains='+cat : "";
    this.setState({selected: selected});
    this.setState({filter});
    console.log('selected', selected);
    console.log('cat', cat);
    console.log('filter', filter);
    this.loadArticles(filter);
  }
  goToArticle = (url) => {
    this.props.history.push('/'+ url);
  }
  loadArticles = async (find) => {
    const { apiURL, filter , sort, locale, insert, limit, categories } = this.state;

    let fetchURL = (insert) ? apiURL + '/articles?_limit='+limit+'&_sort='+sort+'&lang='+ locale: apiURL + '/articles?_limit=-1&_sort='+sort+'&lang='+ locale;
    console.log('filter',find);
    fetchURL = (find) ? fetchURL+find : (filter) ? fetchURL+filter : fetchURL;
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
          const cats = [];
          if(!categories || categories.length === 0) {
            data.map((art,i) => {
              art.categories.map(cat => {
                const exist = cats.filter(ct =>(ct === cat))[0];
                if(exist === undefined) {
                  cats.push(cat);
                }
                return cat;
              })
              return art.categories;
            });
          }

          this.setState({articles: data, categories: (!categories || categories.length === 0 ) ? cats: categories, loading: false});
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
    const {articles, lang, categories, selected, insert, loading} = this.state;
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
          {!insert &&
            <Helmet>
              <meta charSet="utf-8" />
              <title>{messages.menu.articles}</title>
              <meta name="description" content="This is articles page" />
              <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.articles} />
            </Helmet>
          }
          <ArticlesHeader messages={messages} insert={insert}/>
          <ArticleList
            loading={loading}
            articles={articles}
            messages={messages}
            lang={lang}
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
