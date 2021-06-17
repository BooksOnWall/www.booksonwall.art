import React, { Component } from 'react';
import {
    Grid,
    Card,
    Box,
    Button,
    ButtonGroup
  } from '@material-ui/core';
import Image from 'material-ui-image';
import { injectIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

const apiURL = process.env.REACT_APP_API;

const Connect = ({facebook, twitter, instagram, website, telegram }) => (
  <ButtonGroup vertical>
    {(website && website !== '') ? <Button primary content="Website" icon="world" src={website}/> : ''}
    {(facebook) ? <Button primary content="Facebook" icon="facebook" src={facebook}/> : ''}
    {(instagram) ? <Button primary content="Instagram" icon="instagram" src={instagram}/> : ''}
    {(twitter) ? <Button primary content="Twitter" icon="twitter" src={twitter}/> : ''}
    {(telegram) ? <Button primary content="Telegram" icon="telegram" src={telegram}/> : ''}
  </ButtonGroup>
);
const Skills = ({skills}) => (
  <h5>Skills</h5>
);
const Projects = ({projects}) => (
  <h5>Projects</h5>
);
const MemberDescription = ({facebook, twitter, website, instagram, telegram, skills, projects}) => (
  <Box placeholder>
      <Grid columns={3} stackable textAlign='center'>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Skills skills={skills} />
          </Grid.Column>
          <Grid.Column>
            <Projects projects={projects} />
          </Grid.Column>
          <Grid.Column>
            <Connect facebook={facebook} website={website} instagram={instagram} twitter={twitter} telegram={telegram}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Box>
);
class Member extends Component {
  constructor(props) {
    super(props)
    const path = this.props.history.location.pathname;
    const name = path.replace('/Community/Member/', '');
    if(name && name==='undefined') return this.backOff();
    (name && name !=='undefined') ? console.log(name) : console.log('error', 'name is empty')

    this.state = {
        name: name,
        member: null,
        apiURL: apiURL,
      }
  }
  backOff = () => this.props.history.push('/Community')
  loadMember = async (filter, rows, index, sort, order) => {
    const {name, apiURL} = this.state;
    console.log("load member");
    const fetchURL = apiURL + '/Members?name='+name;
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
          this.setState({member: data[0], loading: false});
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
    await this.loadMember();
  }
  render() {
    const {apiURL, name,  member} = this.state;
    return (member) ? (
      <Box className="main">
      <Card.Group itemsPerRow={1}>
       <Card>
         <Card>
           {(member.avatar) ? <Image src={apiURL + member.avatar.formats.thumbnail.url}  circular /> : ''}
         </Card>
         <Card.Meta>{name}</Card.Meta>
         <Card.Content ><ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} source={member.bio} /></Card.Content>
         <Card.Content ><ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} source={member.cv} /></Card.Content>
         <Card.Description>
            <MemberDescription
              website={member.website}
              facebook={member.facebook}
              twitter={member.twitter}
              instagram={member.instagram}
              telegram={member.telegram}
              skills={member.skills}
              projects={member.projects} />
          </Card.Description>
         <Card.Content extra></Card.Content>
       </Card>
     </Card.Group>
      </Box>
    ) : '';
  }
}
export default injectIntl(Member);
