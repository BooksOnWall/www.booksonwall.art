import React, { useState, useEffect } from 'react';

import {
    Container,
    Grid,
    Typography,
    Backdrop,
    CircularProgress,
    Box,
    makeStyles
  } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import {useReactive} from "../../utils/reactive";
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { injectIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import Image from 'material-ui-image';
import Gallery from "../../utils/Gallery";
import Projects from "../projects/Projects";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
  },
  media: {
    height: 140,
  },
  homeHaderBg:{
    padding:0,
  },
  service:{
    minWidth: '100vw',
    minHeight: '90vh'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#99FF44',
  },
}));

const Service = (props) => {
  const classes = useStyles();
  const [unique, setUnique] = useState();
  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const { isLarge, isMedium } = useReactive();
  const format = (isLarge) ? 'large' : (isMedium) ? 'medium' : 'small';
  const {locale, messages} = props.intl;
  const apiURL = process.env.REACT_APP_API;
  let history = useHistory();
  const {pathname} = useLocation();
  useEffect(() => {
    const name = pathname.replace("/"+messages.menu.service+"/", "");
    const getService = async () => {
      try {
        setLoading(true);
        const fetchURL = apiURL + '/services?Name='+name+'&lang='+locale;
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
              setService(data[0]);
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
    const getUnique = async () => {
      try {
        setLoading(true);
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
    getUnique();
    getService();
  }, [apiURL, locale, pathname, messages.menu]);
  return (
    <>
    <ScrollIntoViewIfNeeded active={true}></ScrollIntoViewIfNeeded>
    <Backdrop className={classes.backdrop}  open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>
    {service &&
      <Box className={classes.connect}>

      {service && service.header_image && <Image src={apiURL+service.header_image.formats[format].url} />}

      <Box className={classes.homeHaderBg}>
      <Box className={classes.gradine}>
        {unique && service &&
          <Container maxWidth="xl">
          <Typography gutterBottom color="textSecondary" variant='h2'> {unique.Name}</Typography>
            <Grid container spacing={10} >
              <Grid item xs={12} md={3} xl={3}>
                <ReactMarkdown children={unique.header} />
              </Grid>
              <Grid item xs={12} md={3} xl={3}>
                <ReactMarkdown children={service.header} />
              </Grid>
              <Grid item xs={12} md={3} xl={3}>
                <ReactMarkdown children={service.activity} />
              </Grid>
              <Grid item xs={12} md={3} xl={3}>
                <ReactMarkdown children={service.ressources} />
              </Grid>
              <Grid item xs={12} md={3} xl={3}>
                <ReactMarkdown children={service.fullOptions} />
              </Grid>
            </Grid>
            <Gallery images={service.images} />
          </Container>
        }
      </Box>
      </Box>
      </Box>
    }
    {service && <Projects history={history} service={service} insert limit={10}/>}
    </>
  )
}
export default injectIntl(Service);
