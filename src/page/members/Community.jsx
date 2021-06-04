import React, { Component  } from 'react';
import { injectIntl } from 'react-intl';
import CommunityMap from './communityMap';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Backdrop,
    Breadcrumbs,
    makeStyles
  } from '@material-ui/core';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import CircularProgress from '@material-ui/core/CircularProgress';

const apiURL = process.env.REACT_APP_API;

const Skills = ({skills, select, isSelected, selected}) => {
  return (
    <Breadcrumbs className="skills">
      {(skills) ? skills.map((skill, i)=> (
        <ToggleButton
          value={skill}
          selected={isSelected(skill)}
          variant="contained"
          color="primary"
          key={'tag'+i}
          onClick={select}
          >
          {skill}
        </ToggleButton>
        )): ''}
    </Breadcrumbs>
  );
};
const useStyles = makeStyles({
  root: {
    flex: 1,
    maxWidth: '180px',
    minWidth: '180px',
    margin: '5px',
  },
  media: {
    height: 180,
  },
});
const Members = ({ style, members, selected, hasSkill,goToMember, apiURL}) => {
  const classes = useStyles();
  return (selected && selected.length > 0)
  ? (
    // return filtered map of members
    (members) ? members.map((member,i) => (
      (hasSkill(member)) ?
      <Card className={classes.root} color="primary" key={i} >
        {(member.avatar) ? <CardMedia
          className={classes.media}
          image={apiURL + member.avatar.formats.thumbnail.url}
          title={member.name}
        /> : ''}
          <CardContent onClick={(e) => goToMember('/Community/Member/'+ member.name)}>
            {member.name}
          </CardContent>
      </Card>
      : ''
    )) : ''

  ) :(
    // return all
    (members) ? members.map((member, i) => (
      <Card className={classes.root} key={i} >
        {(member.avatar) ? <CardMedia
          className={classes.media}
          image={apiURL + member.avatar.formats.thumbnail.url}
          title={member.name}
        /> : ''}
        <CardContent onClick={(e) => goToMember('/Community/Member/'+ member.name)}>
          {member.name}
        </CardContent>
      </Card>
    )) : ''

  );
};


class Community extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: false, insert: this.props.insert ,apiURL: apiURL, skills: null , selected: [], members: null, locale: this.props.intl.locale }
  }

  componentDidMount = async () => {
    // update authenticated state on logout
    await this.loadMembers();
  }
  select = (e) => {
    let {selected} = this.state;
    // if tag is present then remove it
    console.log(e.currentTarget.value);
    const isSelected = selected.filter(item => {
      return (item === e.currentTarget.value);
    });
    (isSelected && isSelected.length > 0) ? selected = selected.filter(item => (item !== e.currentTarget.value)) : selected =[e.currentTarget.value];
    // else add it in selected array
    this.setState({selected: selected})
  }
  isSelected = (skill) => {
    let {selected} = this.state;
    const isSelected = selected.filter(item => (item === skill));
    return (isSelected && isSelected.length > 0) ? true : false;
  }
  hasSkill = (e) => {
    const {selected} = this.state;
    let skills = e.skills;
    let hasIt = false;
    if (skills && skills.length > 0) {
      skills.filter(skill => (selected.indexOf(skill) === 0) ? hasIt = true : '');
    }
    return hasIt;
  }
  goToMember = (b) => {
    this.props.history.push(b.src)
  }
  loadMembers = async (filter, rows, index, sort, order) => {
    console.log("load members");
    const { apiURL } = this.state;
    const fetchURL = apiURL + '/members?_limit=-1&_sort=created_at:desc&lang=en';
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
          let skills = [];
          data.map((member, i) => {
              const mskills = member.skills;
              mskills.map((skill, i) => {
                if(skills.filter(mskill => (mskill === skill)).length === 0)  {
                  skills.push(skill);
                }
                return skill;
              });
              return true;
          });
          this.setState({members: data, skills: skills, loading: false});
        } else {
          console.log('No Data received from the server');
        }
    })
    .catch((error) => {
      // Your error is here!
      if(error) console.log(JSON.stringify(error));
    });
  }
  render() {
    const {skills, selected, members, apiURL, insert, loading} = this.state;
    const {messages} = this.props.intl;
    return (
      <>
      <Backdrop styles={{zIndex: 1003, color: '#99FF44'}} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box className="main" >
        <ScrollIntoViewIfNeeded active={(!insert)}></ScrollIntoViewIfNeeded>
        {members &&
          <>
          <CommunityMap members={members} selected={selected} hasSkill={this.hasSkill} history={this.props.history}/>
          <Typography variant="h2" align="center" color="primary" component="h2" style={{textTransform:'uppercase'}} >{messages.menu.community}</Typography>
          <Skills skills={skills} select={this.select} isSelected={this.isSelected} selected={selected}/>
          <Box style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent : 'space-between',
              justifyContent: 'center'
               }}>
             <Members  selected={selected} members={members} hasSkill={this.hasSkill} goToMember={this.goToMember} apiURL={apiURL}/>
          </Box>
          </>
        }
      </Box>
      </>
    )
  }
};

export default injectIntl(Community);
