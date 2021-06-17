import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import {
    CardContent,
    CardActionArea,
    CardMedia,
    Card,
    CardActions,
    Typography,
    Grid,
    Container,
    Backdrop,
    CircularProgress,
    Box,
    Button,
    makeStyles
  } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { injectIntl } from 'react-intl';
import {useReactive} from "../../utils/reactive";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'material-ui-image';

const useStyles =  makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
  },
  services: {
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

const Services = (props) => {
  const classes = useStyles();
  const [services, setServices] = useState([]);
  const { isLarge, isMedium } = useReactive();
  const formatHeader = (isLarge) ? 'large' : (isMedium) ? 'medium' : 'small';
  const format = 'thumbnail';
  const [unique, setUnique] = useState();
  const [loading, setLoading] = useState(false);
  const {locale, messages} = props.intl;
  const apiURL = process.env.REACT_APP_API;
  const insert = props.insert;
  let history=useHistory();
  useEffect(() => {
    const getServices = async () => {
      try {
        setLoading(true);
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
    getServices();
  }, [apiURL, locale]);
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{messages.menu.services}</title>
      <meta name="description" content="This is service page" />
      <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.services} />
    </Helmet>
    <Backdrop className={classes.backdrop} open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Box className={classes.root}>
    {unique &&
      <>
      {unique && unique.image_header && <Image aspectRatio={5/1} src={apiURL+unique.image_header.formats[formatHeader].url} />}
      <ScrollIntoViewIfNeeded active={true}>
        <Container>
        <h1>{unique.Name}</h1>
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={unique.header} />
        </Container>
      </ScrollIntoViewIfNeeded>
      </>

    }

    <Grid container spacing={3} className={classes.services}>
          {services && services.map((s,i) => (
            <Grid item xs={12/1} md={12/3} xl={12/6} key={'ss'+i}>
              <Card className={classes.card} elevation={0} key={'article'+i}>
                <CardActionArea className={classes.CardActionArea} onClick={() => history.push("/"+messages.menu.service+"/"+s.name) } >
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
                  <Button className={classes.button} size="small"  onClick={() => history.push("/"+messages.menu.service+"/"+s.name)} >{messages.stories.read_more_btn}</Button>
               </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
    {insert && <Button onClick={() => history.push("/"+messages.menu.services)} size="large" className={classes.button3}>See more</Button>}
  </Box>
  </>
  )
}
export default injectIntl(Services);
