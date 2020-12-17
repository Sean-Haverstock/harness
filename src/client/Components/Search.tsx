import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import ClimbsDisplay from './ClimbsDisplay';
import MapWrapper from './LocationMap';
import theme from '../UI/theme';


const useStyles = makeStyles({
		mainContainer: {
			backgroundColor: theme.palette.primary.light,
		},
		header: {
			margin: 'auto',
			maxWidth: '1200px',
			padding: '20px',
		},
		formContainer: {
			margin: 'auto',
			maxWidth: '1200px',
			padding: '20px',
		},
		buttonContainer: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		buttons: {
			alignSelf: 'flex-end',
			padding: '5px',
			margin: '10px',
		},
		fields: {
			marginLeft: '15px',
		},
		root: {
			fontFamily: 'Permanent Marker',
			color: theme.palette.primary.dark,
		}
	});


function Search() {
	const [routes, setRoutes] = useState([]);
	const [isListView, setView] = useState(true);
	const [grade, setGrade] = useState('5.6');
	const [type, setType] = useState('');
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
		e.target.value === 'list' ? setView(true) : setView(false);
	};

	function handleTypeSelection(e) {
		e.preventDefault();
		setType(e.target.value);
	}

	function handleGradeSelection(e) {
		e.preventDefault();
		setGrade(e.target.value);
	}

	function handleFindClimbs(e) {
		e.preventDefault();
		console.log('GRADE', grade);
		axios
			.get(`/api/climbs/search`, {
				params: {
					type: type,
					grade: grade,
				},
			})
			.then((res) => {
				let data = res.data.routes;
				setRoutes(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className={classes.mainContainer}>
			<header className={classes.header}>
				<Typography variant="h4">
					Explore America's Climbing Routes
				</Typography>
			</header>
			<div className={classes.formContainer}>
				<form>
					<label className={classes.fields} htmlFor="type">
						<Typography display="inline">Type:</Typography>
					</label>

					<input
						className={classes.fields}
						type="radio"
						id="Trad"
						name="type"
						value="Trad"
						onChange={handleTypeSelection}
					/>
					<label htmlFor="Trad">
						<Typography display="inline">Trad</Typography>
					</label>

					<input
						className={classes.fields}
						type="radio"
						id="Sport"
						name="type"
						value="Sport"
						onChange={handleTypeSelection}
					/>
					<label htmlFor="Sport">
						<Typography display="inline">Sport</Typography>
					</label>

					{/* <input className={classes.fields} type="radio" id="Boulder" name="type" value="Boulder" onChange={handleTypeSelection} />
						<label htmlFor="Boulder"><Typography display='inline'>Boulder</Typography></label> */}
					
					<label className={classes.fields} htmlFor="grade">
						<Typography display="inline">Grade:</Typography>
					</label>
					<select
						className={classes.fields}
						id="grade"
						name="type"
						onChange={handleGradeSelection}
					>
						<option value="5.6">5.6</option>
						<option value="5.7">5.7</option>
						<option value="5.8">5.8</option>
						<option value="5.9">5.9</option>
						<option value="5.10a">5.10a</option>
						<option value="5.10b">5.10b</option>
						<option value="5.10c">5.10c</option>
						<option value="5.10d">5.10d</option>
						<option value="5.11a">5.11a</option>
						<option value="5.11b">5.11b</option>
						<option value="5.11c">5.11c</option>
						<option value="5.11d">5.11d</option>
						<option value="5.12a">5.12a</option>
						<option value="5.12b">5.12b</option>
						<option value="5.12c">5.12c</option>
						<option value="5.12d">5.12d</option>
						<option value="5.13a">5.13a</option>
						<option value="5.13b">5.13b</option>
						<option value="5.13c">5.13c</option>
						<option value="5.13d">5.13d</option>
						<option value="5.14a">5.14a</option>
						<option value="5.14b">5.14b</option>
						<option value="5.14c">5.14c</option>
						<option value="5.14d">5.14d</option>
					</select>

					<button type="submit" className={classes.fields} onClick={handleFindClimbs}>
						Search!
					</button>
				</form>
				<div className={classes.buttonContainer}>
					<button
						className={classes.buttons}
						type="submit"
						value="list"
						onClick={handleViewChange}
					>
						List View
					</button>
					<button
						className={classes.buttons}
						type="submit"
						value="map"
						onClick={handleViewChange}
					>
						Map View
					</button>
				</div>
				</div>		
			<Container>
				{isListView ? (
					<ClimbsDisplay routes={routes} />
				) : (
					<MapWrapper routes={routes} />
				)}
			</Container>
		</div>
	);
}

export default Search;
