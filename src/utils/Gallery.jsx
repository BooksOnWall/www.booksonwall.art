import React from 'react';

import {
    makeStyles
  } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { injectIntl } from 'react-intl';
import Image from 'material-ui-image';

const useStyles = makeStyles({
  root: {
    maxWidth: '100vw',
  },
  gridList: {
    width: 500,
    height: 450,
  },
});

const Gallery =({images}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
     <GridList cellHeight={160} className={classes.gridList} cols={3}>
       {images.map((tile, i ) => (
         <GridListTile key={tile.id} cols={tile.cols || 1}>
           <Image src={tile.formats.small.url} alt={tile.Name} />
         </GridListTile>
       ))}
     </GridList>
   </div>
  )
}
export default injectIntl(Gallery);
