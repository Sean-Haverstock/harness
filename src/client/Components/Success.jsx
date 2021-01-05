import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { Link as NavLink, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Login from "./Login";
import theme from "../UI/theme";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // width: "auto",
    // height: "auto"
  },
  contents: {
    background: "#fff",
    border: `2px solid ${theme.palette.primary.dark}`,
    borderRadius: "5px",
    padding: "20px 0px",
  },
});
function SuccessModal({ open, onClose }) {
  const classes = useStyles();
  return (
    <Container>
      <Modal
        open={open}
        onClose={onClose}
        className={classes.modal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div className={classes.contents}>
          <span>
            <Typography color='textSecondary' align='center' variant='h6'>
              Registration{" "}
              <strong style={{ color: theme.palette.primary.dark }}>
                Success!{" "}
              </strong>
              Please Login.
            </Typography>
          </span>
          <Login />
        </div>
      </Modal>
    </Container>
  );
}

export default SuccessModal;
