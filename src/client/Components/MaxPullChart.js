import React from 'react';
import Chart from 'chart.js';

const data = {
	datasets: [
		{
			data: [10, 20, 30],
		},
	],

	// These labels appear in the legend and in the tooltips when hovering different arcs
	labels: ['Red', 'Yellow', 'Blue'],
};

var maxPullPie = new Chart(ctx, {
	type: 'pie',
	data: data,
	options: options,
});

function MaxPullChart() {
	return (
		<div>
			<maxPullPie />
		</div>
	);
}

export default MaxPullChart;
