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
    backgroundColor: theme.palette.background.paper,
  },
  menuItem: {
    borderRadius: 8,
    color: '#000',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: 13,
    padding: 8,
},
menuListItem: {
  borderRadius: 0,
  color: '#000',
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: 13,
  '&:hover': {
      background: 'rgba(0, 0, 0, 0.03)',
      color:  '#333',
    }
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

    <List component="nav" aria-label="Language" className="lenguage">
      <ListItem
        button
        aria-haspopup="true"
        aria-controls="Language"
        aria-label="Languages"
        className={classes.menuItem}
        >
        <ListItemText onClick={handleClickListItem} primary={<IconButton><CircleFlag countryCode={ (locale !== "en") ? locale : "gb" } height="20"/></IconButton>} secondary={languageOptions[locale]} />
      </ListItem>
    </List>

    <Menu
      id="Language"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      name="language"
      onClose={handleClose}
      className="language"
      >
      {languageOptions.map((option, index) => (
        <MenuItem
          key={"lang"+index}
          name={option}
          value={option}
          selected={option === locale}
          onClick={(e) => onLocaleChange(option)}
          className={classes.menuItem}
          >
          <IconButton><CircleFlag countryCode={ (option !== "en") ? option : "gb" } height="20"/></IconButton> {option}
        </MenuItem>
      ))}
    </Menu>
    </>
  );
};

export default LanguageSwitch;
