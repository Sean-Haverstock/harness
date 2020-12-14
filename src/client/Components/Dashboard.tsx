import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Exercise from './Exercise'
import FullCrimp from './FullCrimp';
import Chart from 'chart.js';
import theme from '../UI/theme';
import MaxPullChart from './MaxPullChart';
import { Doughnut } from 'react-chartjs-2'

const useStyles = makeStyles({
	dashboardContainer: {
    padding: '20px',
    display: 'grid',
    height: '90vh',
		gridTemplateColumns: '.5fr 1.5fr 1.5fr',
    gridTemplateRows: '.2fr 1.8fr',
    gridTemplateAreas: 
      `"header header header"
       "aside exercise chart"`,
    backgroundColor: '#002f6c',
    columnRuleColor: '#002f6c',
    columnGap: '10px',
    rowGap: '10px',
    ["@media (min-height:800px)"]: {
      
    }

  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridArea: 'header',
    // border: '2px solid #002f6c',
    borderRadius: '3px',
    backgroundColor: '#f6f9fc',
  },
  header: {
    paddingLeft: '15px',
    backgroundColor: '#f6f9fc',
    flexGrow: 3,
  },
  selection: {
    backgroundColor: '#f6f9fc',
    flexGrow: 1,
  },
  aside: {
    gridArea: 'aside',
    // border: '2px solid #002f6c',
    borderRadius: '3px',
    backgroundColor: '#f6f9fc',
  },
  exercise: {
    gridArea: 'exercise',
    // border: '2px solid #002f6c',
    borderRadius: '3px',
    backgroundColor: '#f6f9fc',
  },
  chart: {
    gridArea: 'chart',
    // border: '2px solid #002f6c',
    borderRadius: '3px',
    backgroundColor: '#f6f9fc',
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [exercise, setExercise] = useState('hc20mm')

  function handleExercise(e){
    e.preventDefault();
    setExercise(e.target.value);
  }
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.headerContainer}>
        <h1 className={classes.header}>Welcome, Sean. </h1>
        <p>What do you want to train today? </p>
        <div className={classes.selection}>
          <label className={classes.fields} for="exercise">
						<Typography display="inline">Exercise:  </Typography>
					</label>
					<select
						className={classes.fields}
						id="exercise"
            name="exercise"
            onChange={handleExercise}
					>
            <option value="hc20mm">Max-Pull: HC20mm</option>
						<option value="oh20mm">Max-Pull: OH20mm</option>
						<option value="fc10mm">Max-Pull: FC10mm</option>
          </select>
        </div>
      </div>
      
      <aside className={classes.aside}>Sidebar</aside>
      <div className={classes.exercise} id="exercise">
        {exercise === 'hc20mm' ? <Exercise /> : <FullCrimp />}
        </div>
      <div className={classes.chart} id="chart"><Doughnut /></div>
    </div>
  )
}
