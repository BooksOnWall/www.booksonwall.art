import React, { Component } from 'react';

import {
    Box
  } from '@material-ui/core';

import ToggleButton from '@material-ui/lab/ToggleButton';

import Image from 'material-ui-image';
import  ReactMarkdown from 'react-markdown';
import ImageGallery from 'react-image-gallery';

import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;

const ImgGallery = ({images, apiURL, setImages}) => {
  let set = [];
  if(images.length > 0) {
    images.map((img,i) => {
      let imgs = img;
      set.push({
        original: apiURL + imgs.formats.medium.url,
        thumbnail: apiURL + imgs.formats.thumbnail.url,
        fullscreen: apiURL + imgs.formats.large.url,
      });
      return true;
    });
  }
  return (set.length === 0) ? '' : <ImageGallery items={set} setImages={setImages}/> ;
};
const Categories = ({messages, categories}) => {
  return categories.map((cat,i) => <ToggleButton key={'cat'+i}>{cat}</ToggleButton>)

}
class Article extends Component {
  constructor(props) {
    super(props)
    const {messages, locale} = this.props.intl;
    const name = this.props.history.location.pathname.replace("/"+messages.menu.article+"/", "");

    this.state = {
      name: name,
      article: null,
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
    const {article, apiURL} = this.state;
    const {messages} = this.props.intl;
    const images = (article) ? article.images : null;
    return (article) ? (
      <Box className="main" >
      {(article.header_image) ? <Image src={apiURL + article.header_image.formats.medium.url}  /> : ''}
        <h5>{article.title}</h5>
        <Box>{article.updated_at}</Box>
        <Categories messages={messages} categories={article.categories}/>
        <Box placeholder>
            <ReactMarkdown children={article.header} />
        </Box>
        <ImgGallery images={images} apiURL={apiURL}/>
        <Box placeholder>
          <ReactMarkdown children={article.content} />
        </Box>
      </Box>
    ) : null
  }
}
export default injectIntl(Article);
