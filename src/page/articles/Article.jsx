import React, { Component } from 'react';

import {
    Box,
    Backdrop,
    CircularProgress,
    Typography,
    Container,
    Divider,
    makeStyles
  } from '@material-ui/core';

import ToggleButton from '@material-ui/lab/ToggleButton';

import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';

import  ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

import ImageGallery from 'react-image-gallery';
import {useReactive} from "../../utils/reactive";
import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;



const useStyles = makeStyles((theme) => ({
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
  categories:{
    padding: 20,
  },
  headerImage:{
    minHeight: '45vh',
    maxHeight: '55vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: 80,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end'
    },
    headerImageContainer:{
      minHeight: '40vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    ImgGallery:{
      flexGrow: 1,
      justifyContent: 'center',
      padding: ' 0 10px',
      marginTop: 90,
      marginBottom: 70,
    },
    dividerShape: {
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: 'rotate(0deg)',
    },
    shapeFill: {
     fill: '#fafafa',
    },
    dividerSvg: {
      position: 'relative',
      display: 'block',
      width: 'calc(100% + 1.3px)',
      height: '110px',
    },

  bodyMarkdown:{
      '& blockquote p':{
        fontSize: theme.typography.h3.fontSize,
        fontFamily: theme.typography.subtitle1.fontFamily,
        maxWidth: theme.typography.subtitle1.maxWidth,
        lineHeight: theme.typography.subtitle1.lineHeight
      },
      '& p': {
        fontSize: theme.typography.body1.fontSize,
        fontFamily: theme.typography.body1.fontFamily,
        maxWidth: theme.typography.body1.maxWidth,
        lineHeight: theme.typography.body1.lineHeight
      },
      '& li': {
        fontSize: theme.typography.body1.fontSize,
        fontFamily: theme.typography.body1.fontFamily,
        maxWidth: theme.typography.body1.maxWidth,
        lineHeight: theme.typography.body1.lineHeight
      },
      '& h1':{
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: theme.typography.h1.fontSize,
        color: theme.palette.primary.main
      },
      '& h2':{
        fontFamily: theme.typography.h2.fontFamily,
        fontSize: theme.typography.h2.fontSize,
        color: theme.palette.primary.main
      },
      '& h3':{
        fontFamily: theme.typography.h3fontFamily,
        fontSize: theme.typography.h3.fontSize,
      },
      '& h4':{
        fontFamily: theme.typography.h4.fontFamily,
        fontSize: theme.typography.h4.fontSize,
      },
      '& h5':{
        fontFamily: theme.typography.h5.fontFamily,
        fontSize: theme.typography.h5.fontSize,
      },
      '& h6':{
        fontFamily: theme.typography.h6.fontFamily,
        fontSize: theme.typography.h6.fontSize,
      }
    },
}));

const ImgGallery = ({images, apiURL, setImages}) => {
  let set = [];
  const { isLarge, isMedium, isSmall } = useReactive();
  const format = (isSmall) ? 'small': (isMedium) ? 'medium' : (isLarge) ? 'large' : 'large';
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
  return (set.length === 0) ? '' : <ImageGallery  infinite="true" items={set} setImages={setImages}/> ;
};
const Categories = ({messages, categories}) => {
  const classes = useStyles();
  return categories.map((cat,i) => <ToggleButton  className={classes.category} key={'cat'+i}>{cat}</ToggleButton>)
}

const ArticlePage = ({article, messages, locale, history, images}) => {
  const classes = useStyles();
  const { isLarge, isMedium, isSmall } = useReactive();
  const format = (isSmall) ? 'small' : (isMedium) ? 'medium' : (isLarge) ? 'large' : 'xlarge';


  const config = {
    // Youtube RegEx example
    'www.youtube.com': {
      tag: 'iframe',
      width: 560,
      height: 315,
      disabled: false,
      replace: [
        ['watch?v=', 'embed/'],
        ['http://', 'https://'],
      ],
      thumbnail: {
        format: 'http://img.youtube.com/vi/{id}/0.jpg',
        id: '.+/(.+)$'
      },
      removeAfter: '&'
    },
    'youtu.be': {
      width: 560,
      height: 315,
      disabled: false,
      oembed: 'https://www.youtube.com/oembed'
    }
  };
  return (
    <Box className="main" >
      <ScrollIntoViewIfNeeded active={true}>
      {(article.header_image) ? <Box className={classes.headerImage} style={{ backgroundImage: `url(${apiURL + article.header_image.formats[format].url})`, }}>
      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
            <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
        </svg>
      </Box>
      </Box> : ''}

      </ScrollIntoViewIfNeeded>
      <Container>
      <Box>
          <Typography gutterBottom variant='h1' Component="h1">{article.title}</Typography>
          <Box placeholder>
            <Typography gutterBottom variant='subtitle1' color="secondary"  Component="h2"><ReactMarkdown remarkPlugins={[gfm]} children={article.header} /> </Typography>
          </Box>
          <Typography gutterBottom variant='h6' color="primary" Component="p">{article.updated_at}</Typography>
          <Divider />
      </Box>
      <Box>
      <Box className={classes.ImgGallery} >
      <ImgGallery className={classes.ImgGallery}  images={images} apiURL={apiURL}/>
      </Box>
      <Box placeholder>
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}  className={classes.bodyMarkdown} children={article.content} />
      </Box>
      </Box>
      <Divider />
      <Box className={classes.categories}>
      <Categories   messages={messages} categories={article.categories}/>
      </Box>

      </Container>
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
          let p = data[0];
          p.header_image.formats['xlarge']=[];
          p.header_image.formats['xlarge'].url = p.header_image.url;
          this.setState({loading: false, article: p});
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
    console.log('article');
    if(this.state.name === "") this.props.history.push('/'+this.props.intl.messages.menu.articles);
    await this.loadArticle();
  }
  render() {
    const {article, loading, name} = this.state;
    const {messages, locale} = this.props.intl;
    const images = (article) ? article.images : null;
    console.log('name', name);
    return (
      <>
      <Backdrop open={loading} >
        <CircularProgress
        size={90}
        thickness={8}
        />
      </Backdrop>
      {article && <ArticlePage images={images} messages={messages} history={this.props.history} article={article} locale={locale} />
      }
    </>
    )
  }
}
export default injectIntl(Article);
