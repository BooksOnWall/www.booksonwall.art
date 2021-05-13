import React from "react";
import {IconButton, List, ListItem, ListItemText, Menu, makeStyles, MenuItem} from '@material-ui/core';
import { CircleFlag } from 'react-circle-flags';

const languageOptions = [
  'en',
  'es',
  'pt',
  'it',
  'fr'
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primar,
  },
  list:{
    margin: 0,
    padding: 0,
  },
  menulist:{
    marginTop: 48,
    padding: 0,
    marginLeft: -15,
  },
  menuItem: {
    borderRadius: 400,
    color: '#000',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: 13,
    padding: "8px 14px",
},
  menuItemItem: {
    padding: 15
  },
menuItemText:{
  padding:0
},
menuList: {
  padding: 0,
  margin: 5,
},
}));

const LanguageSwitch = ({locale, switchLang}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onLocaleChange = (lang) => {
    switchLang(lang);
    handleClose();
  }
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>

    <List className={classes.list} disablePadding component="nav" aria-label="Language">
      <ListItem
        button
        aria-haspopup="true"
        aria-controls="Language"
        aria-label="Languages"
        className={classes.menuItem}
        >
        <ListItemText className={classes.menuItemText} onClick={handleClickListItem} primary={<CircleFlag countryCode={ (locale !== "en") ? locale : "gb" } height="20"/>} secondary={languageOptions[locale]} />
      </ListItem>
    </List>

    <Menu
      id="Language"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      name="language"
      onClose={handleClose}
      className={classes.menulist}
      elevation={1}
      >
      {languageOptions.map((option, index) => (
        <MenuItem
          key={"lang"+index}
          name={option}
          value={option}
          selected={option === locale}
          onClick={(e) => onLocaleChange(option)}
          className={classes.menuItemItem}
          >
          <CircleFlag countryCode={ (option !== "en") ? option : "gb" } height="20"/>
        </MenuItem>
      ))}
    </Menu>
    </>
  );
};

export default LanguageSwitch;
