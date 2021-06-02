import React, { useState, useEffect } from 'react';

import {
    Container,
    Grid,
    CardMedia,
    Typography,
    Card,
    CardActions,
    Box,
    Button,
    makeStyles
  } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import Image from 'material-ui-image';

const useStyles = makeStyles({
  root: {
    maxWidth: '100vw',
  },
  media: {
    height: 140,
  },
});

const Services = (props) => {
  const classes = useStyles();
  const [services, setServices] = useState([]);
  const [unique, setUnique] = useState();
  const {locale, messages} = props.intl;
  const apiURL = process.env.REACT_APP_API;
  let history=useHistory();
  useEffect(() => {
    const getServices = async () => {
      try {

        const fetchURL = apiURL + '/services?_limit=-1&_sort=published_at:DESC&lang='+locale;
        await fetch(fetchURL, {
          method: "get",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Host': 'backoff.booksonwall.art'
          }
        })
        .then(response => {
          if (response && !response.ok) { throw new Error(response.statusText);}
          return response.json();
        })
        .then(data => {
            if(data) {
              setServices(data.map((c,i) => ({id: c.id, header: c.header, header_image: c.header_image, name:c.Name})));
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
    const getUnique = async () => {
      try {
        const fetchURL = apiURL + '/uniques?type=services&lang='+locale;
        await fetch(fetchURL, {
          method: "get",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Host': 'backoff.booksonwall.art'
          }
        })
        .then(response => {
          if (response && !response.ok) { throw new Error(response.statusText);}
          return response.json();
        })
        .then(data => {
            if(data) {
              setUnique(data[0]);
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
    getUnique();
    getServices();
  }, [apiURL, locale]);
  return (
    <Box className={classes.root}>
    {unique &&
      <Grid item xs sm >
      <h1>{unique.Name}</h1>
      <ReactMarkdown children={unique.header} />
      </Grid>

    }
      {unique && unique.image_header && <Image src={apiURL+unique.image_header} />}
    <Grid container spacing={3}>

          {services && services.map((s,i) => (
            <Grid item xs sm key={"s"+i}>
              {s.header_image && <Image className={classes.serviceImage}  src={apiURL+s.header_image.formats.small.url}/>}
              <br />
              <Typography  gutterBottom variant="h3" component="h2" >{s.name}</Typography>
              <Typography  variant="body1" ><ReactMarkdown children={s.header} /></Typography>
              <br />
              <Button onClick={() => history.push("/"+messages.menu.service+"/"+s.name) } size="large" className={classes.button3}>{messages.collaborate.read_more_btn}</Button>
            </Grid>
          ))}
        </Grid>

  </Box>
  )
}
export default injectIntl(Services);