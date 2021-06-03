import React, {useState, useEffect} from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { Typography,  Box, Container, Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
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
}));

const Terms = (props) => {
  const classes = useStyles();
  const [terms, setTerms] = useState();
  const [loading, setLoading] = useState(false);
  const {messages, locale} = props.intl;
  useEffect(() => {
    const fetchURL = apiURL + '/uniques?type=terms&lang=' + locale;
    const getTerms = async () => {
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
              setTerms(data[0]);
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
    getTerms();
  }, [locale]);

  return (
    <>
  <ScrollIntoViewIfNeeded active={true}></ScrollIntoViewIfNeeded>
  <Backdrop className={classes.backdrop} open={loading} >
    <CircularProgress color="inherit" />
  </Backdrop>
  {terms &&
    <Box>
      <ScrollIntoViewIfNeeded active={true}>
      {terms && terms.image_header && <Image aspectRatio={5/1} src={apiURL + terms.image_header.formats.medium.url} />}
      </ScrollIntoViewIfNeeded>
      <Container>
      {terms && <h1>{terms.title}</h1>}
      {terms && terms.header && <ReactMarkdown children={terms.header} />}
      for desing fontFamily
      <div >
     <Typography variant="h1" component="h2" gutterBottom>
       h1. Heading
     </Typography>
     <Typography variant="h2" gutterBottom>
       h2. Heading
     </Typography>
     <Typography variant="h3" gutterBottom>
       h3. Heading
     </Typography>
     <Typography variant="h4" gutterBottom>
       h4. Heading
     </Typography>
     <Typography variant="h5" gutterBottom>
       h5. Heading
     </Typography>
     <Typography variant="h6" gutterBottom>
       h6. Heading
     </Typography>
     <Typography variant="subtitle1" gutterBottom>
       subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
     </Typography>
     <Typography variant="subtitle2" gutterBottom>
       subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
     </Typography>
     <Typography variant="body1" gutterBottom>
       body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
       unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
       dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
     </Typography>
     <Typography variant="body2" gutterBottom>
       body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
       unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
       dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
     </Typography>
     <Typography variant="button" display="block" gutterBottom>
       button text
     </Typography>
     <Typography variant="caption" display="block" gutterBottom>
       caption text
     </Typography>
     <Typography variant="overline" display="block" gutterBottom>
       overline text
     </Typography>
   </div>

      </Container>
    </Box>
  }
  </>
  )
}
export default injectIntl(Terms);
