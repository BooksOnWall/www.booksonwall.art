import React, {useState, useEffect} from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import {  Button, Box, Container,  Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
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
  bodyMarkdown:{
    '& p': {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      maxWidth: theme.typography.body1.maxWidth,
      lineHeight: theme.typography.body1.lineHeight
    },
    '& h2':{
      fontFamily: theme.typography.h2.fontFamily,
      fontSize: theme.typography.h2.fontSize,
      conlo: theme.palette.primary.main
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
        {support && support.header && <ReactMarkdown className={classes.bodyMarkdown} children={support.header} />}
        <Button className={classes.button} color="primary">{messages.menu.connect}</Button>
        </Container>
      </Box>
    }

    </>
  )
}
export default injectIntl(Support);
