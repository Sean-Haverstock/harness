import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Link } from 'react-router-dom';
import { Link as NavLink } from '@material-ui/core';
// import Container from '@material-ui/core/Container';

import theme from '../UI/theme';

const useStyles = makeStyles({
	appBar: {
		backgroundColor: 'white',
	},
	navContainer: {
		margin: 'auto',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		maxWidth: '1000px',
		minHeight: '64px',
		backgroundColor: 'white',
	},
	harness: {
		flex: 5,
		fontFamily: 'Permanent Marker',
		fontWeight: 'bold',
		color: '#002f6c',
		paddingLeft: '1em',
	},
	links: {
		flex: 1,
		fontFamily: 'Roboto',
		marginRight: theme.spacing(2),
	},
});

export default function NavBar() {
	const classes = useStyles();
	const theme = useTheme();
	console.log('theme', theme);
	return (
		<div className={classes.appBar}>
		<div className={classes.navContainer}>
			<Link to="/">
				<Typography variant='h4' className={classes.harness}>
					<NavLink
						underline="none"
						className={classes.harness}
						// color="primary"
						href="/"
					>
						HARNESS
					</NavLink>
				</Typography>	
			</Link>
					
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

			<Link to="/dashboard">
				<Typography color="primary" align="center" variant="body1" >
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
			
			<Link to="/login">
			<Typography color="primary" align="center" variant="body1" >
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
		</div>
		</div>
	);
}

