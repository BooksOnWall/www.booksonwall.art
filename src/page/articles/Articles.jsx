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
    makeStyles
  } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { injectIntl} from 'react-intl';



const apiURL = process.env.REACT_APP_API;


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 180,
    background: 'transparent',
    borderRadius: 20,
  },
  media: {
    height: 340,
    borderRadius: 20,
  },
  CardContent: {
    padding: '30px 40px 10px',
    background: 'transparent',
  },
  CardActions:{
    padding: '10px 40px 20px',
    background: 'transparent'
  },
  CardActionArea:{
    borderRadius: 20,
    background: 'transparent',
    '&:hover': {
      background: 'transparent'
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#99FF44',
  },
}));
const News = ({messages, articles, goToArticle, selected , hasCategory }) => {
  const classes = useStyles();
  if(articles) console.log(articles[0]);
  return  (articles) ? articles.map((article, i) => (
    <Grid item xs>
    <Card className={classes.root} elevation={0} key={'article'+i}>
    <CardActionArea className={classes.CardActionArea}>
       <CardMedia
         onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)}
         className={classes.media}
         image={apiURL + article.header_image.formats.medium.url}
         title={article.title}
       />
       <CardContent className={classes.CardContent} >
         <Typography gutterBottom variant="h4" component="h3">
           {article.title}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
           {article.article_header}
         </Typography>
       </CardContent>
     </CardActionArea>
     <CardActions className={classes.CardActions}>
      <Button size="small" color="primary" onClick={(e) => goToArticle(messages.menu.article+'/'+article.title)} >{messages.stories.read_more_btn}</Button>
     </CardActions>
    </Card>
    </Grid>

  )) : '';
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
    <ScrollIntoViewIfNeeded active={!insert}>
    </ScrollIntoViewIfNeeded>
  )
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
          <Backdrop styles={{zIndex: 1004, color: '#99FF44'}} open={loading} >
            <CircularProgress color="inherit" />
          </Backdrop>
          {articles &&
            <>
            <ScrollToTop insert={insert}/>
            <Box style={{ alignItems: 'flex-start', display: 'flex', padding:' 80px 40px'}}>
              <Categories selected={selected} categories={categories} messages={messages} selectCategory={this.selectCategory}/>
            </Box>
            <Box style={{justifyContent: 'space-around', display: 'flex',padding:' 20px 40px'}}>
            <Grid container spacing={3}>
              <News hasCategory={this.hasCategory} selected={selected} articles={articles} messages={messages} goToArticle={this.goToArticle}/>
            </Grid>
            </Box>
            {insert && <Button style={{float: 'right'}} onClick={()=> this.props.history.push('/'+messages.menu.articles)}>See more</Button>}
            </>
          }

        </>
    )
  }
}
export default injectIntl(Articles);
