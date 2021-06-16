import React, {useState, useEffect} from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { Box, Container, Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import {Helmet} from "react-helmet";
import {useReactive} from "../utils/reactive";
import Image from 'material-ui-image';
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
}));

const Terms = (props) => {
  const classes = useStyles();
  const [terms, setTerms] = useState();
  const [loading, setLoading] = useState(false);
  const { isLarge, isMedium } = useReactive();
  const format = (isLarge) ? 'large' : (isMedium) ? 'medium' : 'small';
  const {messages, locale} = props.intl;
  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=terms&lang=' + locale;
    const getTerms = async () => {
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
              setTerms(data[0]);
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
    getTerms();
  }, [locale]);

  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{messages.menu.terms}</title>
      <meta name="description" content="This is terms page" />
      <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.terms} />
    </Helmet>
  <ScrollIntoViewIfNeeded active={true}>
    <Backdrop className={classes.backdrop} open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>
  </ScrollIntoViewIfNeeded>
  {terms &&
    <Box>
      <ScrollIntoViewIfNeeded active={true}>
      {terms && terms.image_header && <Image aspectRatio={5/1} src={apiURL + terms.image_header.formats[format].url} />}
      </ScrollIntoViewIfNeeded>
      <Container>
      {terms && <h1>{terms.title}</h1>}
      {terms && terms.header && <ReactMarkdown children={terms.header} />}
      </Container>
    </Box>
  }
  </>
  )
}
export default injectIntl(Terms);
