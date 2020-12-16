/* eslint-disable no-tabs */
import React, { Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';

const state = {
	labels: ['Max Pull lbs.', 'Remaining bodyweight'],
	datasets: [
		{
			label: 'Weight in lbs.',
			backgroundColor: ['#009624', '#9b0000'],
			hoverBackgroundColor: ['#64dd17', '#d50000'],
			data: [131, 24],
		},
	],
};

// eslint-disable-next-line react/prefer-stateless-function
export default class MaxPullChart extends React.Component {
	render() {
		return (
			<Fragment>
				<Doughnut
					data={state}
					options={{
						title: {
							display: true,
							text: '1-Arm Max Force in Pounds',
							fontSize: 20,
						},
						legend: {
							display: true,
							position: 'bottom',
						},
					}}
				/>
			</Fragment>
		);
	}
}
