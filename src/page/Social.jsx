import React, { Component } from 'react';

import {
    Button,
    makeStyles
  } from '@material-ui/core';

// Social icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TelegramIcon from '@material-ui/icons/Telegram';
import VideocamIcon from '@material-ui/icons/Videocam';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
const SocialBar = ({goTo}) => {
  const classes = useStyles();
  return (
    <>
    <Button
      variant="contained"
      className={classes.button}
      color="secondary"
      href="https://www.facebook.com/BooksOnWall"
      startIcon={<FacebookIcon />}
      onClick={goTo}>Facebook </Button>

  <Button
      variant="contained"
      color="secondary"
      href="https://www.instagram.com/booksonwall"
      startIcon={<InstagramIcon />}
      onClick={goTo}>Instagram </Button>
    <Button
      variant="contained"
      color="secondary"
      href="https://twitter.com/hashtag/booksonwall"
      startIcon={<TwitterIcon />}
      onClick={goTo}>Twitter </Button>
    <Button
      variant="contained"
      color="secondary"
      href="https://www.youtube.com/channel/UCNWiz7RDGgoM3HHgoYPAS3w"
      icon="youtube"
      startIcon={<YouTubeIcon />}
      onClick={goTo}>Youtube </Button>
    <Button
      variant="contained"
      color="secondary"
      href="https://web.telegram.org/#/im?p=g355580041"
      startIcon={<TelegramIcon />}
      onClick={goTo}>Telegram </Button>
    <Button
      variant="contained"
      color="secondary"
      startIcon={<VideocamIcon />}
      href="https://meet.jit.si/BooksOnwall"
      onClick={goTo}>Jitsi Video Conferencing </Button>
    <Button
      variant="contained"
      color="secondary"
      startIcon={<GitHubIcon />}
      href="https://github.com/BooksOnWall"
      onClick={goTo}>Github </Button>
    </>
  )
};
class Social extends Component {
  constructor(props) {
    super(props)

    this.state = { activeIndex: 0 , }
  }
  componentDidMount() {
    // update authenticated state on logout
  }
  goTo = (e) => window.location.href = e.currentTarget.href
  handleClick = (e, i) => {
    this.setState({activeIndex: i.index});
  }

  render() {
    return (
      <SocialBar goTo={this.goTo}/>
    )
  }
}
export default Social;
