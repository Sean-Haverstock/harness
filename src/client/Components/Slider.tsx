import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
	root: {
		height: 500,
	},
});

function valuetext(value: number) {
	return `${value}°C`;
}

export default function VerticalSlider() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Typography id="vertical-slider" gutterBottom>
				Select Grade
			</Typography>
			<div className={classes.root}>
				<Slider
					orientation="vertical"
					defaultValue={[0, 100]}
					aria-labelledby="vertical-slider"
					getAriaValueText={valuetext}
					marks={marks}
				/>
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
];
