import React, { useState } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { green, red } from "@material-ui/core/colors";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import Rating from "@material-ui/lab/Rating";
import theme from "../UI/theme";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
      backgroundColor: "#f7f7f7",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    S: {
      backgroundColor: red[500],
    },
    T: {
      backgroundColor: green[500],
    },
    B: {
      backgroundColor: "black",
    },
  })
);

const StyledTypography = withStyles({
  h6: {
    fontFamily: "Roboto",
    color: theme.palette.primary.main,
  },
  subtitle2: {
    paddingTop: "3px",
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
        avatar={
          <Avatar aria-label="recipe" className={classes.T}>
            {cssType}
          </Avatar>
        }
        title={<StyledTypography variant="h6">{name}</StyledTypography>}
      />
      <CardMedia className={classes.media} image={img} title={name} />
      <CardContent>
        <StyledTypography variant="subtitle2" color="textSecondary">
          {type}
        </StyledTypography>
        <StyledTypography variant="subtitle2" color="textSecondary">
          Rating: {rating}
        </StyledTypography>
        <span>
          <StyledTypography variant="subtitle2" color="textSecondary">
            Stars:{" "}
            {stars === 0 ? (
              "not yet rated"
            ) : (
              <Rating value={stars} size="small" precision={0.5} readOnly />
            )}
          </StyledTypography>
        </span>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        />
      </CardActions>
    </Card>
  );
}

export default ClimbCard;
