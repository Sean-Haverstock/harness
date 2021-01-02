import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { Link as NavLink, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Login from "./Login";

const useStyles = makeStyles({
  modal: {
    width: "500px",
    height: "500px",
  },
});
function Success() {
  const classes = useStyles();
  return (
    <div className={classes.modal}>
      <Typography color="primary" align="center" variant="body1">
        Registration Success! Please Login.
      </Typography>
      <Login />
    </div>
  );
}

export default Success;
