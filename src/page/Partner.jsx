import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import {  Box, Container } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import Image from 'material-ui-image';
import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;

const Partner = (props) => {
  const [partner, setPartner] = useState();
  const [activeScroll, setActiveScroll] = useState('top');
  const {messages, locale} = props.intl;
  
  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=partner&lang=' + locale;
    const getPartner = async () => {
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
              setPartner(data[0]);
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
    <Box>
    <ScrollIntoViewIfNeeded active={(activeScroll === 'top')}>
      {partner && partner.image_header && <Image aspectRatio={5/1} src={apiURL + partner.image_header.formats.medium.url} />}
    </ScrollIntoViewIfNeeded>
    <Container>
      {partner && <h1>{partner.title}</h1>}
      {partner && partner.header && <ReactMarkdown children={partner.header} />}
      </Container>
    </Box>
  )
}
export default injectIntl(Partner);
