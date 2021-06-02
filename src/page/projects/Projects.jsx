import React, { Component } from 'react';

import {
    CardContent,
    CardActionArea,
    CardMedia,
    Typography,
    Card,
    CardActions,
    Box,
    Button,
    makeStyles
  } from '@material-ui/core';

import { injectIntl } from 'react-intl';
import { useLocation, useHistory } from 'react-router-dom';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
const apiURL = process.env.REACT_APP_API;
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Project = ({projects, goToProject}) => {
  const classes = useStyles();
  return projects.map((proj, i) => (
    <Card className={classes.root} key={'proj'+i}>
    <CardActionArea>
       <CardMedia
         onClick={(e) => goToProject(proj.name)}
         className={classes.media}
         image={(proj.header_image && proj.header_image.formats && proj.header_image.formats.thumbnail ) ? apiURL + proj.header_image.formats.thumbnail.url : null}
         title={proj.name}
       />
       <CardContent>
         <Typography gutterBottom variant="h5" component="h2">
           {proj.name}
         </Typography>

       </CardContent>
       <CardContent>Started:{proj.start_date} Complete:{proj.end_date} </CardContent>
       <CardContent>Project stage:{proj.project_step} </CardContent>
     </CardActionArea>
     <CardActions>
      <Button size="small" color="primary" bgcolor="primary" onClick={(e) => goToProject(proj.name)} >Read More</Button>
     </CardActions>
    </Card>
  ));
};
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
        projects: null,
        apiURL: apiURL,
        messages: this.props.intl.messages,
        locale: (this.props.intl && this.props.intl.locale) ? this.props.intl.locale : this.props.locale,
    };
  }
  backOff = () => this.props.history.push('/Projects')
  componentDidMount = async () => {
    await this.loadProjects();
  }
  loadProjects = async (filter, rows, index, sort, order) => {
    console.log("load projects");
    const { apiURL, locale } = this.state;
    const fetchURL = apiURL + '/Projects?public=true&lang='+locale;
    this.setState({loading: true});

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
          this.setState({projects: data, loading: false});
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });
  }
  goToProject = (name) => {
    const {messages} = this.props.intl;
    this.props.history.push('/'+messages.menu.project+'/'+name)
  }
  render() {
    const {projects, locale,} = this.state;

    return (projects) ? (
      <>
        <ScrollIntoViewIfNeeded active={true}>
        <Typography variant="h4" color='primary'>Projects</Typography>
        </ScrollIntoViewIfNeeded>
        <Box style={{display: 'flex', justifyContent: 'space-around'}}>
          <Project  projects={projects} goToProject={this.goToProject} locale={locale}/>
        </Box>

      </>
    ) : '';
  }
}
export default injectIntl(Projects);
