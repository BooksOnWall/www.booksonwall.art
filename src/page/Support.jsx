import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import {  Box, Container } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import Image from 'material-ui-image';
import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;

const Support = (props) => {
  const [support, setSupport] = useState();
  const [activeScroll, setActiveScroll] = useState('top');
  const {messages, locale} = props.intl;
  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=support&lang=' + locale;
    const getSupport = async () => {
      try {
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
    <Box>
    <ScrollIntoViewIfNeeded active={(activeScroll === 'top')}>
      {support && support.image_header && <Image aspectRatio={5/1} src={apiURL + support.image_header.formats.medium.url} />}
    </ScrollIntoViewIfNeeded>
      <Container>
      {support && <h1>{support.title}</h1>}
      {support && support.header && <ReactMarkdown children={support.header} />}
      </Container>
    </Box>
  )
}
export default injectIntl(Support);
