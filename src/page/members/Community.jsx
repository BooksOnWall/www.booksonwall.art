import React, { Component  } from 'react';
import { injectIntl } from 'react-intl';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Backdrop,
    Container,
    Breadcrumbs,
    Button,
    Divider,
    Avatar,
    Grid,
    makeStyles
  } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Helmet} from "react-helmet";
import Patrick from "../../assets/images/avatar/patrick 3.png";
import CommunityMap from './communityMap';

const apiURL = process.env.REACT_APP_API;
const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    background: 'transparent',
    minWidth: 180,
    maxWidth: 320,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  media: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar:{
    minHeight: 180,
    minWidth: 180,
  },
  patrick:{
    opacity: .4,
    height: 180,
    width: 180,
  },
  memberName:{
    fontFamily: theme.typography.button.fontFamily,
    fontSize: theme.typography.body2.fontSize,
  },
  skills:{
    padding: '70px 10vw',
    maxWidth: '100vw',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    '& ol':{
      justifyContent: 'center'
    }
  },
  skill:{
    padding: '5px 13px',
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
    margin: 4,
    borderRadius:30,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
    '$selected':{
      color: theme.palette.common.white,
      background: theme.palette.secondary.main,
    }
  },
  overrides: {

  },
  button1: {
    margin: 10,
    color: theme.palette.primary.main,
    border: '2px #D9D2C6 solid',
    padding: '10px 20px',
    '&:hover': {
        background: '#C33949',
        color: 'white',
          border: '2px #C33949 solid',
      }
  },
  button2: {
    margin: 10,
    color: theme.palette.secondary.main,
    border: '2px #D9D2C6 solid',
    '&:hover': {
        background: theme.palette.secondary.main,
        color: 'white',
        border: '2px solid',
        borderColor: theme.palette.secondary.main
      }
    },
}));
const CommunityHeader =({messages, theme}) => {
  const classes = useStyles();
  let history = useHistory();
  return(
    <Box>
    <Container maxWidht="xl"  style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant="h2" align='center' color="textPrimary" component="h1" style={{textTransform:'uppercase', paddingTop: '8vh'}}> {messages.menu.community}</Typography>
      <Typography gutterBottom variant="h3" align='center' color="primary" component="p"> {messages.create.community_we_are}</Typography>
      <Typography variant="subtitle1" align='center' color="textPrimary" component="p"> {messages.create.community_we_create}</Typography>
      <Box style={{ paddingTop: 60, paddingBottom: 60}}>
        <Grid container spacing={8}   justifyContent="center" alignItems="center">
          <Button onClick={() => history.push('/'+messages.menu.info+'#'+messages.menu.manifest)} className={classes.button2} size="large" >{messages.menu.manifest}</Button>
          <Button onClick={() => history.push('/'+messages.menu.connect+'#'+messages.menu.register)} className={classes.button2} size="large" >{messages.menu.joinus}</Button>
          <Button onClick={() => history.push('/'+messages.menu.projects)} className={classes.button2} size="large" >{messages.menu.projects}</Button>
        </Grid>
      </Box>
    </Container>
    <Divider/>
    </Box>
  )
};

const Skills = ({skills, select, isSelected, selected, locale}) => {
  const classes = useStyles();
  const tagTranslations = require('../../i18n/locales/skills-'+locale+'.json');

  return (
    <Grid exclusive={true} className={classes.skills}>
      {(skills) ? skills.map((skill, i)=> {
        let index = skill.replace(/\s/g, '_');
        index = index.toLowerCase();
        return (
        <ToggleButton
          value={skill}
          selected={isSelected(skill)}
          variant="contained"
          key={'tag'+i}
          onClick={select}
          className={classes.skill}
          >
          {tagTranslations[index]}
        </ToggleButton>
      )}): ''}
    </Grid>
  );
};
const Members = ({ style, members, selected, hasSkill,goToMember, apiURL}) => {
  const classes = useStyles();
  return (selected && selected.length > 0)
  ? (
    // return filtered map of members
    (members) ? members.map((member,i) => (
      (hasSkill(member)) ?
      <Grid item key={i} >
        <Card className={classes.root} elevation={0} key={i} >
            <CardMedia  className={classes.media}>
                {(member.avatar) ?
                  <Avatar className={classes.avatar} title={member.name} src={apiURL + member.avatar.formats.thumbnail.url} /> : <Avatar className={classes.patrick}  src={Patrick} />
                }
            </CardMedia>
            <CardContent onClick={(e) => goToMember('/Community/Member/'+ member.name)}>
              <Typography variatn="Button" className={classes.memberName}  >{member.name}</Typography>
            </CardContent>
        </Card>
        </Grid>
      : ''
    )) : ''

  ) :(
    // return all
    (members) ? members.map((member, i) => (
      <Grid item>
      <Card className={classes.root} elevation={0}  key={i} >
        <CardMedia  className={classes.media}>
        {(member.avatar) ?
        <Avatar className={classes.avatar} title={member.name} src={apiURL + member.avatar.formats.thumbnail.url} /> : <Avatar className={classes.patrick}  src={Patrick} /> }</CardMedia>
        <CardContent className={classes.media} onClick={(e) => goToMember('/Community/Member/'+ member.name)}>
          <Typography variant="button" className={classes.memberName}  aling='center'>{member.name}</Typography>
        </CardContent>
      </Card>
      </Grid>
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
    console.log('selected', selected);
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
    const { apiURL } = this.state;
    const fetchURL = apiURL + '/members?_limit=-1&_sort=created_at:desc&lang=en';
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
    const {messages, locale} = this.props.intl;
    return (
      <>
      {!insert &&
        <Helmet>
          <meta charSet="utf-8" />
          <title>{messages.menu.community}</title>
          <meta name="description" content="This is community page" />
          <link rel="canonical" href={"https://www.booksonwall.art/"+messages.menu.community} />
        </Helmet>
      }
      <Backdrop open={loading} >
        <CircularProgress
        size={90}
        thickness={8}
        />
      </Backdrop>
      <Box className="main" >
        <ScrollIntoViewIfNeeded active={(!insert)}></ScrollIntoViewIfNeeded>
        {members &&
          <>
          <CommunityMap members={members} selected={selected} hasSkill={this.hasSkill} history={this.props.history}/>
          <CommunityHeader messages={messages} members={members} selected={selected}/>
          <Skills locale={locale} skills={skills} select={this.select} isSelected={this.isSelected} selected={selected}/>
          <Divider/>
           <Container maxWidth='false'>
              <Grid container spacing={3} style={{justifyContent: 'center', paddingTop: 40}}>
                  <Members  selected={selected} members={members} hasSkill={this.hasSkill} goToMember={this.goToMember} apiURL={apiURL}/>
             </Grid>
           </Container>
          </>
        }
      </Box>
      </>
    )
  }
};

export default injectIntl(Community);
