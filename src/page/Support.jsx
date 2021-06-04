import React, {useState, useEffect} from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import {  Box, Container,  Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
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

const Support = (props) => {
  const classes = useStyles();
  const [support, setSupport] = useState();
  const [activeScroll, setActiveScroll] = useState('top');
  const [loading, setLoading] = useState(false);
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
console.log('support',support);
  return (
    <>
    <Backdrop className={classes.backdrop} open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>
    {support &&
      <Box>
      <ScrollIntoViewIfNeeded active={(activeScroll === 'top')}>
        {support && support.image_header && <Image aspectRatio={5/1} src={apiURL + support.image_header.formats.medium.url} />}
      </ScrollIntoViewIfNeeded>
        <Container>
        {support && <h1>{support.title}</h1>}
        {support && support.header && <ReactMarkdown children={support.header} />}
        </Container>
      </Box>
    }

    </>
  )
}
export default injectIntl(Support);
