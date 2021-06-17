import React, {useState, useEffect} from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { Button, Box, Container, Typography, Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import  ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import Image from 'material-ui-image';
import {Helmet} from "react-helmet";
import {useReactive} from "../utils/reactive";
import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
  },
  media: {
    height: 140,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#99FF44',
  },
  partner:{

  },
  partnerHeader:{
    minHeight: '10h',
    marginBottom: 100
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

const Partner = (props) => {
  const classes = useStyles();
  const [partner, setPartner] = useState();
  const { isLarge, isMedium } = useReactive();
  const format = (isLarge) ? 'large' : (isMedium) ? 'medium' : 'small';
  const [loading, setLoading] = useState(false);
  const {messages, locale} = props.intl;

  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=partner&lang=' + locale;
    const getPartner = async () => {
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
              setPartner(data[0]);
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
    getPartner();
  }, [locale]);

  return (
    <>
    <Helmet>
       <meta charset="utf-8" />
       <title>{messages.menu.partner}</title>
       <meta name="description" content="This is partner page" />
       <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.partner} />
    </Helmet>
    <Backdrop className={classes.backdrop} open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>
    {partner &&
      <Box className={classes.partner}>
      <ScrollIntoViewIfNeeded active={true}>
        <Box className={classes.partnerHeader} >
          {partner && partner.image_header && <Image aspectRatio={5/1} src={apiURL + partner.image_header.formats[format].url} />}
        </Box>
      </ScrollIntoViewIfNeeded>
      <Container>
        {partner && <Typography variant="h1" component="h1">{partner.title}</Typography>}
        {partner && partner.header && <ReactMarkdown  rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} className={classes.bodyMarkdown} children={partner.header} />}
        <Button onClick={() => props.history.push('/'+messages.menu.connect)} className={classes.button} color="primary">{messages.menu.connect}</Button>
      </Container>

      </Box>
    }
    </>
  )
}
export default injectIntl(Partner);
