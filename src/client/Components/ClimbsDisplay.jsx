import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import ClimbCard from './ClimbCard';
import theme from '../UI/theme';

const useStyles = makeStyles({
  root: {
    backgroundImage: `linear-gradient(transparent, ${theme.palette.primary.main})`,
    padding: `${theme.spacing(4)}px`,
  },
  item: {
    padding: `32px`,
  },
});
// eslint-disable-next-line react/prop-types
function ClimbsDisplay(props) {
  console.log(props);
  const classes = useStyles();
  const climbs = props.routes
    // eslint-disable-next-line react/prop-types
    .filter((route) => {
      return route.raw.imgMedium !== '';
    })
    .map((climb) => {
      let type;
      if (climb.type === 'Sport') type = 'S';
      else if (climb.type === 'Trad' || 'Trad, TR') type = 'T';
      else if (climb.type === 'Boulder') type = 'B';
      return (
        <Grid
          key={climb.id}
          spacing={8}
          item
          xs={12}
          sm={6}
          md={4}
          className={classes.item}
        >
          <ClimbCard
            key={climb.id}
            name={climb.name}
            img={climb.raw.imgMedium}
            cssType={type}
            type={climb.type}
            rating={climb.rating}
            stars={climb.stars}
          />
        </Grid>
      );
    });

  return (
    <Grid container justify='center' className={classes.root} spacing={3}>
      {climbs}
    </Grid>
  );
}

export default ClimbsDisplay;
