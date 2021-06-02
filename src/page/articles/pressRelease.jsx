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
    makeStyles
  } from '@material-ui/core';

import ToggleButton from '@material-ui/lab/ToggleButton';
import Image from 'material-ui-image';

import Avatar from '../../assets/images/avatar/';
import articles from './index';

const ArticlesFeed = ({articles}) => {
  const feed = [];
  articles.map((article,i) => {
    let item = {
      key: article.key,
      date: article.date,
      summary: article.title,
      meta: article.categories,
      extraText: article.header,
      image: Avatar[article.author],
      extraImages: article.images,
    };
    feed.push(item);
    return true;
  });
  return true;
}
const Categories =({categories}) => {
  return (categories.length > 0) ? categories.map(cat => <ToggleButton color="primary">{cat}</ToggleButton>) : null;
};
const Articles = ({articles, categories}) => {
  return <ArticlesFeed articles={articles}/>
};
export default class PressRelease extends Component {
  constructor(props) {
    super(props)
    const categories = [];
    articles.map((art,i) => {
      art.categories.map(cat => {
        const exist = categories.filter(ct =>(ct === cat))[0];
        if(exist === undefined) {
          categories.push(cat);
        }
        return cat;
      })
      return art.categories;
    });

    this.state = {
      articles: articles,
      categories: categories,
    }
  }
  componentDidMount() {
    // update authenticated state on logout

  }
  render() {
    const {articles, categories} = this.state;
    return (
      <Articles articles={articles} categories={categories} insert limit={10}/>
    );
  }
}
