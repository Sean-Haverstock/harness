import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Link } from 'react-router-dom';
import { Link as NavLink } from '@material-ui/core';

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
		flexGrow: 5,
		fontFamily: 'Permanent Marker',
		fontWeight: 'bold',
		color: '#002f6c'
	},
	links: {
		flexBasis: 1,
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
					 href="/dashboard"
					>
					 Login
					</NavLink>
				</Typography>
			</Link>
		</div>
		</div>
	);
}

// const useStyles = makeStyles({
// 	root: {
// 		flexGrow: 1,
// 		marginBottom: '20px'
// 	},
// 	appBar: {
// 		boxShadow: "0 4px 2px -2px gray",
// 	},
// 	toolBar: {
// 		display: 'flex',
// 		alignItems: 'flex-end',
// 		backgroundColor: '#fff',
// 		borderBottom: '8px solid #2962ff',
// 	},
// 	links: {
// 		justifyContent: 'right',
// 		marginRight: theme.spacing(2),
// 		'&:hover': {
// 			borderTop: '2px solid #2962ff',
// 			// backgroundColor: '#E3F2FD',
// 		},
// 		// '&:active': {
// 		// 	borderTop: '2px solid #2962ff',
// 		// 	// backgroundColor: '#E3F2FD',
// 		// },
// 	},
// 	login: {
// 		marginLeft: 'auto',
// 	},
// });


{/* <div className={classes.root}>
			<AppBar className={classes.appBar} position="static">
				<Toolbar className={classes.toolBar} variant="regular">
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
					{/* <Link to="/map">
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
					</Link> */}

		// 			<Link to="/search">
		// 				<Typography color="primary" align="center" variant="h6">
		// 					<NavLink
		// 						underline="none"
		// 						className={classes.links}
		// 						color="primary"
		// 						href="/search"
		// 					>
		// 						Search
		// 					</NavLink>
		// 				</Typography>
		// 			</Link>

		// 			<Link to="/login">
		// 				<NavLink
		// 					className={classes.login}
		// 					underline="none"
		// 					color="primary"
		// 					href="/login"
		// 				>
		// 					<Button color="primary">Login</Button>
		// 				</NavLink>
		// 			</Link>
		// 		</Toolbar>
		// 	</AppBar>
		// </div> */}