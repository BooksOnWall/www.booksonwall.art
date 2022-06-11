import React, {useState, useEffect} from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import {  Button, Box, Container,  Backdrop, CircularProgress, Divider, makeStyles } from '@material-ui/core';
import  ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

import {Helmet} from "react-helmet";
import {useReactive} from "../utils/reactive";
import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
  },
  headerImage:{
    top: 0,
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#91201F',
    },
  bodyMarkdown:{
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
  button: {
    margin: '30px 0',
    color: theme.palette.primary.main,
    border: '2px #D9D2C6 solid',
    padding: '10px 20px',
    '&:hover': {
        background: theme.palette.primary.main,
        color: 'white',
          border: '2px solid',
          borderColor: theme.palette.primary.main,
      }
    },
}));

const Support = (props) => {
  const classes = useStyles();
  const [support, setSupport] = useState();
  const [loading, setLoading] = useState(false);
  const { isSmall, isMedium } = useReactive();
  const formatHeader = (isSmall) ? 'small' : (isMedium) ? 'medium':  'large';
  const {messages, locale} = props.intl;
  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=support&lang=' + locale;
    const getSupport = async () => {
      try {
        setLoading(true);
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
              setSupport(data[0]);
              setLoading(false);
            } else {
              console.log('No Data received from the server');
            }
        })
        .catch((error) => {
          // Your error is here!
          if(error) console.log(JSON.stringify(error));
        });
      } catch(e) {
        console.log(e.message);
      }
    }
    getSupport();
  }, [locale]);
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{messages.menu.support}</title>
      <meta name="description" content="This is support page" />
      <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.support} />
    </Helmet>
    <Backdrop className={classes.backdrop} open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>
    {support &&
      <Box>
      <ScrollIntoViewIfNeeded active={true}>
          {(support.image_header) ? <Box className={classes.headerImage} style={{ backgroundImage: `url(${apiURL + support.image_header.formats[formatHeader].url})`, }}>
          <Box className={classes.dividerShape}>
            <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
                <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
            </svg>
          </Box>
          </Box> : ''}
      </ScrollIntoViewIfNeeded>
        <Container>
        {support && <h1>{support.title}</h1>}
        {support && support.header && <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} className={classes.bodyMarkdown} children={support.header} />}
        <Divider />
        <Button onClick={() => props.history.push('/'+messages.menu.connect)} className={classes.button} color="primary">{messages.menu.connect}</Button>
        </Container>
      </Box>
    }

    </>
  )
}
export default injectIntl(Support);
