import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ClimbCard from './ClimbCard';
import Slider from './Slider';
// import theme from '../UI/theme';

import MapWrapper from './LocationMap';

const useStyles = makeStyles((theme: Theme) => createStyles({
	
}));

function Search() {
	const [routes, setRoutes] = useState([]);
	const [isListView, setView] = useState(true);
	const classes = useStyles();

	useEffect(() => {
		axios
			.get('/api/climbs')
			.then((res) => {
				let data = res.data.routes;
				setRoutes(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleViewChange = (e) => {
		e.preventDefault();
		console.log('VALUE', e.target.value);
		e.target.value === 'list' ? setView(true) : setView(false);
	};

	const climbs = routes
		.filter((route) => {
			return route.raw.imgMedium !== '';
		})
		.map((climb) => {
			console.log('climb', climb.id);
			let type;
			if (climb.type === 'Sport') type = 'S';
			else if (climb.type === 'Trad' || 'Trad, TR') type = 'T';
			else if (climb.type === 'Boulder') type = 'B';

			return (
				<Grid key={climb.id} item xs={12} sm={6} md={4}>
					<ClimbCard
						key={climb.id}
						name={climb.name}
						img={climb.raw.imgMedium}
						cssType={type}
						type={climb.type}
						rating={climb.rating}
						stars={climb.stars}
					/>
				</Grid>
			);
		});
	console.log(climbs);

	return (
		<div>
			<Slider></Slider>
			<button type="submit" value="list" onClick={handleViewChange}>
				List View
			</button>
			<button type="submit" value="map" onClick={handleViewChange}>
				Map View
			</button>
			<Container>
				<Grid container spacing={2}>
					{isListView ? climbs : <MapWrapper />}
					{/* {climbs} */}
				</Grid>
			</Container>
		</div>
	);
}

export default Search;
