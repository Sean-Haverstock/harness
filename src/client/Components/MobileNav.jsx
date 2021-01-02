import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Link } from "react-router-dom";
import { Link as NavLink } from "@material-ui/core";

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
    flex: 4,
    fontFamily: "Permanent Marker",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(2),
  },
  links: {
    fontFamily: "Roboto",
    marginRight: theme.spacing(2),
  },
  menu: {
    flexBasis: 1,
    paddingRight: theme.spacing(2),
  },
});

export default function MobileNav() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const menuItems = [
    { href: "/search", name: "Search" },
    { href: "/dashboard", name: "Dashboard" },
    { href: "/login", name: "Login" },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.navContainer}>
      <Link to="/">
        <Typography variant="h4" className={classes.harness}>
          <NavLink underline="none" className={classes.harness} href="/">
            HARNESS
          </NavLink>
        </Typography>
      </Link>

      <IconButton
        edge="start"
        size="medium"
        color="primary"
        aria-label="menu"
        onClick={handleClick}
        className={classes.menu}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClick={handleClose}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem key={item.name}>
              <Link to={item.href}>
                <Typography color="primary" align="center" variant="body1">
                  <NavLink
                    underline="none"
                    className={classes.links}
                    color="primary"
                    href={item.href}
                  >
                    {item.name}
                  </NavLink>
                </Typography>
              </Link>
            </MenuItem>
          );
        })}
        {/* <MenuItem>
          <Link to="/search">
            <Typography color="primary" align="center" variant="body1">
              <NavLink
                underline="none"
                className={classes.links}
                color="primary"
                href="/search"
              >
                Search
              </NavLink>
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/dashboard">
            <Typography color="primary" align="center" variant="body1">
              <NavLink
                underline="none"
                className={classes.links}
                color="primary"
                href="/dashboard"
              >
                Dashboard
              </NavLink>
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login">
            <Typography color="primary" align="center" variant="body1">
              <NavLink
                underline="none"
                className={classes.links}
                color="primary"
                href="/login"
              >
                Login
              </NavLink>
            </Typography>
          </Link>
        </MenuItem> */}
      </Menu>
    </div>
  );
}
