import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MapWrapper from './LocationMap';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import ClimbsDisplay from './ClimbsDisplay';
import theme from '../UI/theme';
import { TextField } from '@material-ui/core';


const useStyles = makeStyles({
		mainContainer: {
			backgroundColor: theme.palette.primary.light,
		},
		header: {
			margin: 'auto',
			maxWidth: '1200px',
			padding: '20px',
		},
		head: {
			fontFamily: 'Roboto',
			textAlign: 'center'
		},
		formContainer: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			margin: 'auto',
			maxWidth: '1200px',
			padding: '20px',
			["@media (max-width:700px)"]: {
				flexDirection: 'column'
			},
		},
		form: {

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
	const grades = ['5.5', '5.6', '5.7', '5.8', '5.9', '5.10a', '5.10b', '5.10c', '5.10d', '5.11a', '5.11b', '5.11c', '5.11d', '5.12a', '5.12b', '5.12c', '5.12d', '5.13a', '5.13b', '5.13c', '5.13d', '5.14a', '5.14b', '5.14c', '5.14d']

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
			
			<Container className={classes.header}>
				<Typography className={classes.head} variant="h4">
					Explore America's Climbing Routes
				</Typography>
				<TextField
				// placehoder='Search climb by name'
				>

				</TextField>
			</Container>
			<Container className={classes.formContainer}>
				
				<form className={classes.form}>
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
						{/* map over array of grades for drop down menu options */}
						{grades.map(grade => {
							return <option value={grade}>{grade}</option>
						})}
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
				</Container>		
			<Container className={classes.header}>
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
