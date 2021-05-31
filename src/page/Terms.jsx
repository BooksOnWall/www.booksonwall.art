import React, {useState, useEffect} from 'react';
import {  Box } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import Image from 'material-ui-image';
import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;

const Terms = (props) => {
  const [terms, setTerms] = useState();
  const {messages, locale} = props.intl;
  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=terms&lang=' + locale;
    const getTerms = async () => {
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
              setTerms(data[0]);
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
  console.log('terms',terms);
  return (
    <Box>
      {terms && terms.header_image && <Image src={apiURL+terms.header_image.formats.medium.url} />}
      {terms && <h1>{terms.title}</h1>}
      {terms && terms.header && <ReactMarkdown children={terms.header} />}
    </Box>
  )
}
export default injectIntl(Terms);
