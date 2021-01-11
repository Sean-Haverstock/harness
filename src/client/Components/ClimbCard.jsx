import React, { useState } from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import Rating from '@material-ui/lab/Rating';
import theme from '../UI/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
      backgroundColor: '#f7f7f7',
      margin: 'auto',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

const StyledTypography = withStyles({
  h6: {
    fontFamily: 'Roboto',
    color: theme.palette.primary.main,
  },
  subtitle2: {
    paddingTop: '3px',
  },
})(Typography);

function ClimbCard({ name, img, cssType, type, rating, stars }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={<StyledTypography variant='h6'>{name}</StyledTypography>}
        avatar={
          cssType === 'S' ? (
            <img
              src='../../public/assets/images/noun_quickdraw_581935.png'
              alt='Quickdraw'
              style={{ width: '20px', height: '20px' }}
            />
          ) : (
            <img
              src='../../public/assets/images/noun_Spring loaded camming device_1567689.png'
              alt='Cam'
              style={{ width: '20px', height: '20px' }}
            />
          )
        }
      />
      <CardMedia className={classes.media} image={img} title={name} />
      <CardContent>
        <StyledTypography variant='subtitle2' color='textSecondary'>
          {type}
        </StyledTypography>
        <StyledTypography variant='subtitle2' color='textSecondary'>
          Rating: {rating}
        </StyledTypography>
        <span>
          <StyledTypography variant='subtitle2' color='textSecondary'>
            Stars:{' '}
            {stars === 0 ? (
              'not yet rated'
            ) : (
              <Rating value={stars} size='small' precision={0.5} readOnly />
            )}
          </StyledTypography>
        </span>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        />
      </CardActions>
    </Card>
  );
}

export default ClimbCard;
