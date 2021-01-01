import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		margin: 40,
		height: 20,
		display: 'flex',
		alignItems: 'center',
	},
	button: {
		alignSelf: 'flex-start',
	},
});

export default function VerticalSlider() {
	const classes = useStyles();
	const [test, setTest] = useState('');
	const [grade, setGrade] = useState([0, 100]);

	// const handleChange = (event, newValue) => {
	// 	setValue(newValue);
	// };

	function labeltext(index) {
		console.log('index: ', index);
		console.log(marks[index].label);
		return `${marks[index].label}`;
	}

	function getClimbs(e) {
		// console.log(e);
	}

	function handleChange(value) {
		console.log('value', value);
	}

	return (
		<React.Fragment>
			<div className={classes.root}>
				<Typography id="horizontal-slider" gutterBottom>
					Select Grade
				</Typography>
				<Slider
					aria-label="slider"
					orientation="horizontal"
					defaultValue={[8, 24]}
					aria-labelledby="horizontal-slider"
					// aria-valuetext="test"
					getAriaLabel={labeltext}
					step={4}
					marks={marks}
					valueLabelDisplay="auto"
					onChange={handleChange}
				/>
				<Button onClick={getClimbs}>Send!</Button>
			</div>
		</React.Fragment>
	);
}

const marks = [
	{
		value: 0,
		label: '5.6',
	},
	{
		value: 4,
		label: '5.7',
	},
	{
		value: 8,
		label: '5.8',
	},
	{
		value: 12,
		label: '5.9',
	},
	{
		value: 16,
		label: '5.10a',
	},
	{
		value: 20,
		label: '5.10b',
	},
	{
		value: 24,
		label: '5.10c',
	},
	{
		value: 28,
		label: '5.10d',
	},
	{
		value: 32,
		label: '5.11a',
	},
	{
		value: 36,
		label: '5.11b',
	},
	{
		value: 40,
		label: '5.11c',
	},
	{
		value: 44,
		label: '5.11d',
	},
	{
		value: 48,
		label: '5.12a',
	},
	{
		value: 52,
		label: '5.12b',
	},
	{
		value: 56,
		label: '5.12c',
	},
	{
		value: 60,
		label: '5.12d',
	},
	{
		value: 64,
		label: '5.13a',
	},
	{
		value: 68,
		label: '5.13b',
	},
	{
		value: 72,
		label: '5.13c',
	},
	{
		value: 76,
		label: '5.13d',
	},
	{
		value: 80,
		label: '5.14a',
	},
	{
		value: 84,
		label: '5.14b',
	},
	{
		value: 88,
		label: '5.14c',
	},
	{
		value: 92,
		label: '5.14d',
	},
	{
		value: 96,
		label: '5.15a',
	},
	{
		value: 100,
		label: '5.15b',
	},
];
