import React, { useEffect } from 'react';
import Landing from './Landing';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { url } from 'inspector';
import Slider from './Slider';
import axios from 'axios';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		nav: {
			background: 'black',
			height: 500,
			width: 500,
			margin: 'auto',
			padding: 20,
		},
	})
);

const App = () => {
	const classes = useStyles();

	useEffect(() => {
		axios
			.get('/api/climbs')
			.then((res) => {
				const routes = res.data.routes;
				console.log(routes[0]);
			})
			.catch((err) => {
				console.log(err);
			});
		// .then(() => {
		// 	console.log(climbs.length);
		// });
	}, []);

	return (
		<div>
			<Landing />
			<Container maxWidth="lg">
				<Slider />
			</Container>
		</div>
	);
};

export default App;
