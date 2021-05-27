import React, { Component } from 'react';
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
    makeStyles
  } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { injectIntl, defineMessages } from 'react-intl';

// const articleTraductions = defineMessages({
//   read_more_btn: {
//     id: 'article.read_more_btn',
//     defaultMessage: 'Read more'
//   }
// });

const apiURL = process.env.REACT_APP_API;

const replaceAll = (string, search, replace) =>  {
  return string.split(search).join(replace);
}
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 180,
  },
  media: {
    height: 300,
  },
});
const News = ({messages, articles, goToArticle, selected , hasCategory }) => {
  const classes = useStyles();
  if(articles) console.log(articles[0]);
  return  (articles) ? articles.map((article, i) => (
    <Grid item xs>
    <Card className={classes.root} elevation={0} key={'article'+i}>
    <CardActionArea>
       <CardMedia
         onClick={(e) => goToArticle(article.title)}
         className={classes.media}
         image={apiURL + article.header_image.formats.medium.url}
         title={article.title}
       />
       <CardContent>
         <Typography gutterBottom variant="h4" component="h3">
           {article.title}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
           {article.article_header}
         </Typography>
       </CardContent>
     </CardActionArea>
     <CardActions>
      <Button size="small" color="primary" onClick={(e) => goToArticle(article.name)} >{messages.stories.read_more_btn}</Button>
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
class Articles extends Component {
  constructor(props) {
    super(props)


    this.state = {
      apiURL: apiURL,
      articles: null,
      categories: null,
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
  goToArticle = (name) => {
    const src = replaceAll(name, " ", "_");
    this.props.history.push('/News/'+ src);
  }
  loadArticles = async (filter, rows, index, sort, order) => {
    console.log("load articles");
    const { apiURL, locale } = this.state;
    const fetchURL = apiURL + '/Articles?lang='+ locale;
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
    const {articles, categories, selected} = this.state;
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
          <Box style={{ alignItems: 'flex-start', display: 'flex', padding:' 80px 40px'}}>
            <Categories selected={selected} categories={categories} messages={messages} selectCategory={this.selectCategory}/>
          </Box>
          <Box style={{justifyContent: 'space-around', display: 'flex',padding:' 20px 40px'}}>
          <Grid container spacing={3}>
            <News hasCategory={this.hasCategory} selected={selected} articles={articles} messages={messages} goToArticle={this.goToArticle}/>
          </Grid>
          </Box>
        </>
    )
  }
}
export default injectIntl(Articles);
