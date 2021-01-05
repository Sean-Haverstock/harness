import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Link } from "react-router-dom";
import { Link as NavLink, withTheme } from "@material-ui/core";

import theme from "../UI/theme";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "white",
  },
  navContainer: {
    margin: "auto",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    maxWidth: "1000px",
    minHeight: "64px",
    backgroundColor: "white",
  },
  harness: {
    flex: 5,
    fontFamily: "Permanent Marker",
    fontWeight: "bold",
    color: theme.palette.primary.dark,
    paddingLeft: "1em",
  },
  links: {
    flex: 1,
    fontFamily: "Roboto",
    marginRight: theme.spacing(2),
  },
});

export default function NavBar() {
  const classes = useStyles();
  const links = [
    { href: "/search", name: "Search" },
    { href: "/dashboard", name: "Dashboard" },
    { href: "/login", name: "Login" },
  ];
  return (
    <div className={classes.appBar}>
      <div className={classes.navContainer}>
        <Link to='/'>
          <Typography variant='h4' className={classes.harness}>
            <NavLink underline='none' className={classes.harness} href='/'>
              HARNESS
            </NavLink>
          </Typography>
        </Link>

        {links.map((link) => {
          return (
            <Link to={link.href} key={link.name}>
              <Typography color='primary' align='center' variant='body1'>
                <NavLink
                  underline='none'
                  className={classes.links}
                  color='primary'
                  href={link.href}
                >
                  {link.name}
                </NavLink>
              </Typography>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
