import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ClimbsDisplay from './ClimbsDisplay';
import Slider from './Slider';
// import theme from '../UI/theme';

import MapWrapper from './LocationMap';

const useStyles = makeStyles((theme: Theme) => createStyles({
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row-reverse',
	},
	buttons: {
		padding: '5px',
		marginRight: '10px',
	}
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
	
	return (
		<div>
			<Slider></Slider>
		<label for="type">Type:</label>	
			<select id="type" name="type">
				<option value="Trad">Trad</option>
				<option value="Sport">Sport</option>
				<option value="Boulder">Boulder</option>
				<option value="All">All</option>
		</select>
			<div className={classes.buttonContainer}>
				<button className={classes.buttons} type="submit" value="list" onClick={handleViewChange}>
					List View
				</button>
				<button className={classes.buttons} type="submit" value="map" onClick={handleViewChange}>
					Map View
				</button>
			</div>
			<Container>
				{isListView ? <ClimbsDisplay routes={routes}/> : <MapWrapper routes={routes}/>}
			</Container>
		</div>
	);
}

export default Search;
