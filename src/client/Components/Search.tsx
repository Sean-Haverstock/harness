import React, { useEffect, useState } from 'react';
import ClimbCard from './ClimbCard';
import Slider from './Slider';
import { Grid, Container } from '@material-ui/core'
import axios from 'axios';

export default function Search() {
	const [routes, setRoutes] = useState([]);

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

	const climbs = routes.filter(route => {
		
		return route.raw.imgMedium !== "" 
	}).map(climb => {
		console.log('climb', climb.raw.imgMedium)
		let type;
		if (climb.type === "Sport") type = 'S'
		else if (climb.type === "Trad" || "Trad, TR") type = 'T'
		else if (climb.type === "Boulder") type = 'B'
		return(
			<Grid item xs={12} sm={6} md={4} >
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
		)
	})
	console.log(climbs)

	return (
	<div>
		<Slider></Slider>
		<Container>
		<Grid container spacing={2}>
			{climbs}
		</Grid>
		</Container>
	</div>
	)
}
