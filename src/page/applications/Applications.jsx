import React, { useState, useEffect } from 'react';

import {
    CardContent,
    CardActionArea,
    CardMedia,
    Card,
    CardActions,
    Grid,
    Typography,
    Box,
    Container,
    Backdrop,
    CircularProgress,
    Button,
    makeStyles
  } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { injectIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

import Image from 'material-ui-image';
import {Helmet} from "react-helmet";
import {useReactive} from "../../utils/reactive";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
  },
  applications: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'center',
  },
  media: {
    height: 140,
  },
  card: {
    background: 'transparent',
    borderRadius: 10,
    flexGrow: '2 1 25%',
  },
  CardContent: {
    padding: '30px 20px 10px',
    background: 'transparent',
  },
  CardActions:{
    padding: '10px 20px 20px',
    background: 'transparent'
  },
  CardActionArea:{
    borderRadius: 10,
    background: 'transparent',
    '&:hover': {
      background: 'transparent'
    }
  },
  dividerCard:{ margin: '20px 0'},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#99FF44',
  },
}));

const Applications = (props) => {
  const classes = useStyles();
  const [applications, setApplications] = useState([]);
  const { isLarge, isMedium } = useReactive();
  const format = (isLarge) ? 'large' : (isMedium) ? 'medium' : 'small';
  const [loading, setLoading] = useState(false);
  const [unique, setUnique] = useState();
  const {locale, messages} = props.intl;
  const apiURL = process.env.REACT_APP_API;
  let history=useHistory();
  useEffect(() => {
    const getApplications = async () => {
      try {
        setLoading(true);
        const fetchURL = apiURL + '/projects?_limit=-1&_sort=updated_at:desc&lang='+locale;
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
              setApplications(data.filter((o) => (o.service && o.service.Name === messages.menu.applications)).map((c,i) => ({id: c.id, header: c.header, header_image: c.header_image, name:c.name})));
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
        const fetchURL = apiURL + '/uniques?type=applications&lang='+locale;
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
    getApplications();
  }, [apiURL, locale, messages]);
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{messages.menu.applications}</title>
      <meta name="description" content="This is applications page" />
      <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.applications} />
    </Helmet>
    <Backdrop className={classes.backdrop} open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Box className={classes.root}>
      {unique &&
        <>
        <ScrollIntoViewIfNeeded active={true}>
        <Image src={apiURL+unique.image_header.formats[format].url} />
        </ScrollIntoViewIfNeeded>
        <Container>

        <h1>{unique.Name}</h1>
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={unique.header} />
      </Container>
      </>
      }
      <Grid container spacing={3} className={classes.applications}>
        {applications && applications.map((s,i) => (
          <Grid item xs={12/1} md={12/3} xl={12/6} key={'ss'+i}>
            <Card className={classes.card} elevation={0} key={'article'+i}>
              <CardActionArea className={classes.CardActionArea} onClick={() => history.push("/"+messages.menu.project+"/"+s.name) } >
               <CardMedia
                 className={classes.media}
                 image={(s.header_image) ? apiURL + s.header_image.formats[format].url: null}
                 title={s.name}
               />
               <CardContent className={classes.CardContent} >
                 <Typography gutterBottom variant="h6" component="h3">
                   {s.name}
                 </Typography>
                 <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                   <ReactMarkdown remarkPlugins={[gfm]} children={s.header} />
                 </Typography>
               </CardContent>
             </CardActionArea>
             <CardActions className={classes.CardActions}>
                <Button className={classes.button} size="small"  onClick={() => history.push("/"+messages.menu.project+"/"+s.name)} >{messages.collaborate.read_more_btn}</Button>
             </CardActions>
          </Card>
          </Grid>
        ))}
      </Grid>
  </Box>
  </>
  )
}
export default injectIntl(Applications);
