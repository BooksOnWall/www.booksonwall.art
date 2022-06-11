import React, { useState, useEffect } from 'react';

import {
    Container,
    Typography,
    Backdrop,
    CircularProgress,
    Box,
    Button,
    Divider,
    makeStyles
  } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import {useReactive} from "../../utils/reactive";
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { injectIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Gallery from "../../utils/Gallery";
import {Helmet} from "react-helmet";

const useStyles = makeStyles((theme) => ({

  headerImage:{
    minHeight: '45vh',
    maxHeight: '55vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: 80,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end'
    },
    headerImageContainer:{
      minHeight: '40vh',
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
    button1: {
      margin: 10,
      marginTop: 20,
      color: theme.palette.primary.main,
      border: '2px #D9D2C6 solid',
      padding: '5px 10px',
      '&:hover': {
          background: '#C33949',
          color: 'white',
            border: '2px #C33949 solid',
        },
      },
      ImgGallery:{
        flexGrow: 1,
        justifyContent: 'center',
        padding: ' 0 10px',
        marginTop: 90,
        marginBottom: 70,
      },
}));


const Service = (props) => {
  const classes = useStyles();
  const [unique, setUnique] = useState();
  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const { isSmall, isLarge, isMedium, isRetina, is4k } = useReactive();
  const format = (is4k) ? 'xLarge' : (isRetina)? 'xLarge' :(isLarge) ? 'large' : (isMedium) ? 'medium' : 'small';
  const btnSmall = (isSmall) ? true : false ;
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
              let res = data[0];
              res.header_image.formats['xLarge'] = [];
              res.header_image.formats['xLarge'].url = res.header_image.url;
              setService(res);
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
    <Helmet>
       <meta charset="utf-8" />
       <title>{messages.menu.partner}</title>
       <meta name="description" content="This a service page" />
       <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.service} />
    </Helmet>
    <Backdrop className={classes.backdrop}  open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>

    {service &&
      <Box className={classes.connect}>

      <ScrollIntoViewIfNeeded active={true}>
        {(service.header_image) ? <Box className={classes.headerImage} style={{ backgroundImage: `url(${apiURL + service.header_image.formats[format].url})`, }}>
        <Box className={classes.dividerShape}>
          <svg className={classes.dividerSvg} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130" preserveAspectRatio="none">
              <path d="M0,63 C0,63 63,0 209,0 C355,0 358.5,63 466,63 C573.5,63 588,23 684,23 C780,23 797,68 972,68 C1147,68 1200,63 1200,63 L1200,136 L0,136 L0,63 Z" className={classes.shapeFill}></path>
          </svg>
        </Box>
        </Box> : ''}
      </ScrollIntoViewIfNeeded>

      {unique && service &&
          <>
          <Container maxWidth="xl">

            <Box>
                <Typography gutterBottom variant='h1' Component="h1">{service.Name}</Typography>
                <Divider />
            </Box>
          <Typography gutterBottom color="primary" variant='subtitle1'> <ReactMarkdown remarkPlugins={[gfm]} children={service.header} /></Typography>
          <Divider />

          <ReactMarkdown className={classes.bodyMarkdown}  remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={service.activity} />
          <ReactMarkdown className={classes.bodyMarkdown}  remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={service.ressources} />
          <ReactMarkdown className={classes.bodyMarkdown}  remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={service.fullOptions} />
          <Gallery images={service.images} />
          </Container>

          </>
        }
        <Container maxWidth="xl">

        <Divider />
        <Button size={(btnSmall) ? 'small' : 'large'} onClick={() => history.push('/'+messages.menu.connect+'#'+messages.menu.contact)} className={classes.button1}>{messages.menu.connect}</Button>
        </Container>
      </Box>
    }

    </>
  )
}
export default injectIntl(Service);
