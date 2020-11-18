import React from 'react';
import { createMuiTheme, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Link } from 'react-router-dom';
import { Link as NavLink } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import theme from '../UI/theme';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	toolbar: {
		display: 'flex',
		alignItems: 'flex-end',
		minHeight: 128,
		backgroundColor: '#fff',
		borderBottom: '8px solid #2962ff',
	},
	links: {
		justifyContent: 'center',
		paddingRight: theme.spacing(2),
		'&:hover': {
			borderTop: '2px solid #2962ff',
			backgroundColor: '#E3F2FD',
		},
	},
	login: {
		marginLeft: 'auto',
	},
});

export default function NavBar() {
	const classes = useStyles();
	const theme = useTheme();
	console.log('theme', theme);
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar} variant="regular">
					<Link to="/">
						<Typography align="right" variant="h6">
							<NavLink
								underline="none"
								className={classes.links}
								color="primary"
								href="/"
							>
								Home
							</NavLink>
						</Typography>
					</Link>
					<Link to="/map">
						<Typography align="center" variant="h6">
							<NavLink
								underline="none"
								className={classes.links}
								color="primary"
								href="/map"
							>
								Map
							</NavLink>
						</Typography>
					</Link>

					<Link to="/search">
						<Typography color="primary" align="center" variant="h6">
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

					<Link to="/login">
						<NavLink
							className={classes.login}
							underline="none"
							color="primary"
							href="/login"
						>
							<Button color="primary">Login</Button>
						</NavLink>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
}
