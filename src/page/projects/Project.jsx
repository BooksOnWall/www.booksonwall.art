import React, { Component } from 'react';
import {
    Badge,
    Card,
    Box
  } from '@material-ui/core';
  import { useLocation, useHistory } from 'react-router-dom';
  import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import Image from 'material-ui-image';
import ReactMarkdown from 'react-markdown';
import { injectIntl } from 'react-intl';
const apiURL = process.env.REACT_APP_API;

class Project extends Component {
  constructor(props) {
    super(props)
    const {messages, locale} = this.props.intl;
    const name = props.history.location.pathname.replace("/"+messages.menu.project+"/", "");

    this.state = {
        project: null,
        name: name,
        locale: locale,
        apiURL: apiURL,
      }
  }
  backOff = () => this.props.history.push('/Projects')
  componentDidMount = () => {
    this.loadProject();
  }
  goTo = (e, b) => {
    console.log(b);
    return window.location.href = b.src
  }
  loadProject = async (filter, rows, index, sort, order) => {
    const {name, apiURL, locale} = this.state;
    console.log("load project");
    const fetchURL = apiURL + '/projects?public=true&name='+encodeURIComponent(name)+'&lang='+locale;
    this.setState({loading: true});
    console.log("URL",fetchURL );
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
            this.setState({project: data[0], loading: false});
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
  componentDidMount = async () => {
    await this.loadProject();
  }
  render() {
    const {project, name, apiURL} = this.state;
    return (project) ? (
      <Box >
          <ScrollIntoViewIfNeeded active={true}>
          {project.header_image && <Image src={apiURL + project.header_image.formats.small.url} />}
          </ScrollIntoViewIfNeeded>
          <h5>{name}</h5>
          <ReactMarkdown children={project.description} />
      </Box>
    ) : '';
  }
}
export default injectIntl(Project)
