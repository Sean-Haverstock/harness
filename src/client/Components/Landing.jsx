import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    video: {
      objectFit: "cover",
      width: "100vw",
      height: "50vh",
      position: "relative",
      top: 0,
      left: 0,
    },
    viewportHeader: {
      position: "relative",
      height: "100vh",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

const Landing = () => {
  const classes = useStyles();
  return (
    <div>
      <video className={classes.video} playsInline muted loop autoPlay>
        <source
          src='https://harnessbucket.s3.amazonaws.com/LamaSummit.mp4'
          type='video/webm'
        />
      </video>
      <header className={classes.viewportHeader} />
    </div>
  );
};

export default Landing;
