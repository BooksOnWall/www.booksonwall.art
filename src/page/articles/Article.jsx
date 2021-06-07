import React, { Component } from 'react';

import {
    Box,
    Backdrop,
    CircularProgress,
    Typography,
    Container,
    makeStyles
  } from '@material-ui/core';

import ToggleButton from '@material-ui/lab/ToggleButton';

import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import Image from 'material-ui-image';
import  ReactMarkdown from 'react-markdown';
import ImageGallery from 'react-image-gallery';
import {useReactive} from "../../utils/reactive";
import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  category:{
    color: '#fff',
    padding: '3px 8px',
    margin: 5,
    background:theme.palette.secondary.main,
    "&:hover":{
      background:theme.palette.secondary.dark,
    }
  }
}));

const ImgGallery = ({images, apiURL, setImages}) => {
  let set = [];
  const { isLarge, isMedium, isSmall, isTyny } = useReactive();
  const format = (isLarge) ? 'large': (isMedium) ? 'medium': (isSmall) ? 'small' : 'thumbnail';
  if(images.length > 0) {
    images.map((img,i) => {
      let imgs = img;
      set.push({
        original: apiURL + imgs.formats[format].url,
        thumbnail: apiURL + imgs.formats.thumbnail.url,
        fullscreen: apiURL + imgs.formats[format].url,
      });
      return true;
    });
  }
  return (set.length === 0) ? '' : <ImageGallery items={set} setImages={setImages}/> ;
};
const Categories = ({messages, categories}) => {
  const classes = useStyles();
  return categories.map((cat,i) => <ToggleButton  className={classes.category} key={'cat'+i}>{cat}</ToggleButton>)
}
const ArticlePage = ({article, messages, locale, history, images}) => {
  const { isLarge, isMedium, isSmall, isTyny } = useReactive();
  const format = (isLarge) ? 'large': (isMedium) ? 'medium': (isSmall) ? 'small' : 'thumbnail';
  return (
    <Box className="main" >
      <ScrollIntoViewIfNeeded active={true}>
      {(article.header_image) ? <Image aspectRatio={2/1} src={apiURL + article.header_image.formats[format].url}  /> : ''}
      </ScrollIntoViewIfNeeded>
      <Box>
          <Typography variant='h1' Component="h1">{article.title}</Typography>
          <Typography variant='h6' color="primary" Component="p">{article.updated_at}</Typography>
          <Categories messages={messages} categories={article.categories}/>
      </Box>
      <Box>
      <Box placeholder>
          <ReactMarkdown children={article.header} />
      </Box>
      <ImgGallery images={images} apiURL={apiURL}/>
      <Box placeholder>
        <ReactMarkdown children={article.content} />
      </Box>
      </Box>
    </Box>
  )
}
class Article extends Component {
  constructor(props) {
    super(props)
    const {messages, locale} = this.props.intl;
    const name = this.props.history.location.pathname.replace("/"+messages.menu.article+"/", "");

    this.state = {
      name: name,
      article: null,
      loading: false,
      apiURL: apiURL,
      locale: locale,
    }
  }
  backOff = () => this.props.history.push('/Articles')
  loadArticle = async (rows, index, sort, order) => {
    const { apiURL, name, locale } = this.state;
    const fetchURL = apiURL + '/articles?title='+name+'&lang='+locale;
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
          this.setState({loading: false, article: data[0]});
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
    await this.loadArticle();
  }
  render() {
    const {article, apiURL, loading} = this.state;
    const {messages, locale} = this.props.intl;
    const images = (article) ? article.images : null;
    return (
      <>
      <Backdrop styles={{zIndex: 1004, color: '#99FF44'}} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      {article && <ArticlePage images={images} messages={messages} history={this.props.history} article={article} locale={locale} />

      }
    </>
    )
  }
}
export default injectIntl(Article);
