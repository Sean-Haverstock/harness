import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Exercise from './Exercise'
import FullCrimp from './FullCrimp';
import theme from '../UI/theme';
import MaxPullChart from './MaxPullChart';

const useStyles = makeStyles({
	dashboardContainer: {
    // padding: '20px',
    display: 'grid',
    height: '90vh',
		gridTemplateColumns: '.5fr 1.5fr 1.5fr',
    gridTemplateRows: '.1fr 1.9fr',
    gridTemplateAreas: 
      `"header header header"
       "aside exercise chart"`,
    backgroundColor: theme.palette.primary.main,
    columnRuleColor: theme.palette.primary.main,
    // columnGap: '10px',
    // rowGap: '10px',
    ["@media (max-width:640px)"]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '.2fr .8fr 1fr 1fr',
      gridTemplateAreas:
       `"header"
        "aside"
        "exercise"
        "chart"`,
    }

  },
  topBar: {
    gridArea: 'header',
    borderRadius: '3px',
    backgroundColor: theme.palette.primary.dark,
  },
  header: {
    // backgroundColor: theme.palette.primary.light,
    margin: `${theme.spacing(1, 4)}`,
    // boxShadow: '1px 1px 3px #002f6c',
    // borderRadius: '3px'
  },
  aside: {
    minWidth: '200px'
    color: 'white',
    gridArea: 'aside',
    // border: '2px solid #002f6c',
    borderRadius: '3px',
    backgroundColor: theme.palette.primary.main,
  },
  exerciseContainer: {
    gridArea: 'exercise',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: '3px',
    backgroundColor: theme.palette.secondary.light,
  },
  chartContainer: {
    gridArea: 'chart',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: '3px',
    backgroundColor: theme.palette.secondary.light,
  },
  content: {
    backgroundColor: theme.palette.primary.light,
    margin: `${theme.spacing(1, 4)}`,
    boxShadow: '1px 1px 3px #002f6c',
    borderRadius: '3px'
  },
  text: {
    fontFamily: 'Roboto',
  }
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
      <div className={classes.topBar} />
      
      <aside className={classes.aside}>Sidebar</aside>
      
      <div className={classes.exerciseContainer} id="exercise">
        <header className={classes.header}>
            <Typography className={classes.text} variant='h4' color='secondary'>Hello, Sean</Typography>
        </header>
        <div className={classes.content}>
          <Exercise />
        </div>
      </div>
      
      <div className={classes.chartContainer} id="chart">
        <div className={classes.content}>
          <MaxPullChart className={classes.content}/>
        </div>
        <div className={classes.content}>
          <MaxPullChart className={classes.content}/>
        </div>
      </div>
    </div>
  )
}
