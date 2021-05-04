import React, { Component } from 'react';
import {
    Badge,
    Card,
    Box
  } from '@material-ui/core';

import Image from 'material-ui-image';
import ReactMarkdown from 'react-markdown';

const apiURL = process.env.REACT_APP_API;

export default class Project extends Component {
  constructor(props) {
    super(props)
    const path = this.props.history.location.pathname;
    const name = path.replace('/Projects/', '');
    if(name && name==='undefined') return this.backOff();
    (name && name !=='undefined') ? console.log(name) : console.log('error', 'name is empty')
    this.state = {
        project: null,
        name: name,
        apiURL: apiURL,
      }
  }
  backOff = () => this.props.history.push('/Projects')
  componentDidMount = () => {

  }
  goTo = (e, b) => {
    console.log(b);
    return window.location.href = b.src
  }
  loadProject = async (filter, rows, index, sort, order) => {
    const {name, apiURL} = this.state;
    console.log("load project");
    const fetchURL = apiURL + '/Projects?name='+name;
    this.setState({loading: true});
    console.log("URL",fetchURL );

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
          console.log(data[0]);
          this.setState({project: data[0], loading: false});
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });
  }
  componentDidMount = async () => {
    await this.loadProject();
  }
  render() {
    const {project, name, apiURL} = this.state;
    return (project) ? (
      <Box placeholder>
        <h5>{name}</h5>
            <Card >
              <Card><Image src={apiURL + project.h5_image.formats.small.url} /></Card>
              <Card.Content >
                <h5>{project.name}</h5>
                <ReactMarkdown source={project.description} />
              </Card.Content>
              <Card.Meta><Badge>Started:</Badge>{project.start_date} <Badge>Complete:</Badge>{project.end_date} </Card.Meta>
              <Card.Description>
                <Badge >Project stage:</Badge> {project.project_step}
              </Card.Description>
            </Card>
      </Box>
    ) : '';
  }
}
