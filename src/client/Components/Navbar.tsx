import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Link } from 'react-router-dom';
import { Link as NavLink } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	})
);

export default function NavBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Container maxWidth="lg">
					<Toolbar variant="regular">
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
						>
							<MenuIcon />
						</IconButton>
						<Link to="/">
							<Typography variant="h6" className={classes.title}>
								<NavLink color="inherit" href="/">
									Home
								</NavLink>
							</Typography>
						</Link>
						<Link to="/map">
							<Typography variant="h6" className={classes.title}>
								<NavLink color="inherit" href="/map">
									Map
								</NavLink>
							</Typography>
						</Link>

						{/* <Link to="/login">
							<Typography variant="h6" className={classes.title}>
								<NavLink color="inherit" href="/login">
									Login
								</NavLink>
							</Typography>
						</Link> */}

						<Link to="/login">
							<NavLink color="inherit" href="/login">
								<Button color="inherit">Login</Button>
							</NavLink>
						</Link>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}
