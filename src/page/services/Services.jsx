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
  header: {
    paddingBottom: 30
  },
  services: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: 10,
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
  headerImage:{
    minHeight: '20vh',
    maxHeight: '55vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: 80,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end'
    },
    headerImageContainer:{
      minHeight: '20vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    dividerShape: {
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: 'rotate(0deg)',
    },
    shapeFill: {
     fill: '#fafafa',
    },
    dividerSvg: {
      position: 'relative',
      display: 'block',
      width: 'calc(100% + 1.3px)',
      height: '110px',
    },
  dividerCard:{ margin: '20px 0'},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#91201F',
  },
  bodyMarkdown:{
      '& blockquote p':{
        fontSize: theme.typography.h3.fontSize,
        fontFamily: theme.typography.subtitle1.fontFamily,
        maxWidth: theme.typography.subtitle1.maxWidth,
        lineHeight: theme.typography.subtitle1.lineHeight
      },
      '& p': {
        fontSize: theme.typography.body1.fontSize,
        fontFamily: theme.typography.body1.fontFamily,
        maxWidth: theme.typography.body1.maxWidth,
        lineHeight: theme.typography.body1.lineHeight
      },
      '& li': {
        fontSize: theme.typography.body1.fontSize,
        fontFamily: theme.typography.body1.fontFamily,
        maxWidth: theme.typography.body1.maxWidth,
        lineHeight: theme.typography.body1.lineHeight
      },
      '& h1':{
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: theme.typography.h1.fontSize,
        color: theme.palette.primary.main
      },
      '& h2':{
        fontFamily: theme.typography.h2.fontFamily,
        fontSize: theme.typography.h2.fontSize,
        color: theme.palette.primary.main
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
}));

const Services = (props) => {
  const classes = useStyles();
  const [services, setServices] = useState([]);
  const { islarge, isMedium, isSmall } = useReactive();
  const formatHeader = (isSmall) ? 'small' : (isMedium) ? 'medium' : (islarge) ? 'large': 'xlarge';
  const format = (isSmall) ? 'small' : (isMedium) ? 'medium' : (islarge) ? 'large': 'large';
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
              let p = data[0];
              p.image_header.formats['xlarge']=[];
              p.image_header.formats['xlarge'].url = p.image_header.url;

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
        <CircularProgress
        size={90}
        thickness={8}
        />
    </Backdrop>
    <Box className={classes.root}>

    {unique &&
      <Box className={classes.header}>
      {(unique.image_header) ? <Box className={classes.headerImage} style={{ backgroundImage: `url(${apiURL + unique.image_header.formats[formatHeader].url})`, }}>
      <Box className={classes.dividerShape}>
        <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
            <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
        </svg>
      </Box>
      </Box> : ''}

      <ScrollIntoViewIfNeeded active={true}>
        <Container maxWidth="xl">
        <Typography gutterBottom variant="h1" component='h1'>{unique.title}</Typography>
            <ReactMarkdown className={classes.bodyMarkdown} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={unique.header} />
        </Container>
      </ScrollIntoViewIfNeeded>
      </Box>
    }

    <Container maxWidth="xl">
    <Grid container spacing={3} className={classes.services} style={{paddingTop:50}}>
          {services && services.map((s,i) => (
            <Grid item xs={12/1} md={12/2} xl={12/3} key={'ss'+i}>
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
                  <Button className={classes.button} size="small" color='primary'  onClick={() => history.push("/"+messages.menu.service+"/"+s.name)} >{messages.stories.read_more_btn}</Button>
               </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
    {insert && <Button onClick={() => history.push("/"+messages.menu.services)} size="large" className={classes.button3}>See more</Button>}
  </Container>
  </Box>
  </>
  )
}
export default injectIntl(Services);
