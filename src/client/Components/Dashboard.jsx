import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Exercise from "./Exercise";
import theme from "../UI/theme";
import MaxPullChart from "./MaxPullChart";

const useStyles = makeStyles({
  dashboardContainer: {
    display: "grid",
    height: "90vh",
    gridTemplateColumns: ".5fr 1.5fr 1.5fr",
    gridTemplateRows: ".1fr 1.9fr",
    gridTemplateAreas: `"header header header"
       "aside exercise chart"`,
    backgroundColor: theme.palette.primary.bgdark,
    columnRuleColor: theme.palette.primary.main,
    "@media (max-width:850px)": {
      gridTemplateColumns: ".2fr 1.8fr",
      gridTemplateRows: ".2fr 1.6fr 1.6fr",
      gridTemplateAreas: `"header header"
       "aside exercise"
        "aside chart"`,
      height: "auto",
    },
    "@media (max-width:640px)": {
      gridTemplateColumns: "1fr",
      gridTemplateRows: ".25fr 1.5fr 1.5fr .75fr",
      gridTemplateAreas: `"header"
        "exercise"
        "chart"
        "aside"`,
      height: "auto",
      overflow: "auto",
    },
  },
  topBar: {
    gridArea: "header",
    borderRadius: "3px",
    backgroundColor: theme.palette.primary.dark,
  },
  header: {
    margin: `${theme.spacing(1, 4)}`,
  },
  aside: {
    minWidth: "200px",
    color: "white",
    gridArea: "aside",
    borderRadius: "3px",
    backgroundColor: theme.palette.primary.main,
  },
  exerciseContainer: {
    gridArea: "exercise",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: "3px",
    backgroundColor: theme.palette.secondary.bgdark,
  },
  chartsContainer: {
    gridArea: "chart",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: "3px",
    backgroundColor: theme.palette.secondary.bgdark,
    overflow: "hidden",
    "@media (max-width:800px)": {
      overflow: "visible",
    },
  },
  content: {
    flex: 1,
    backgroundColor: theme.palette.primary.bglight,
    margin: `${theme.spacing(1, 4)}`,
    boxShadow: "1px 1px 3px #002f6c",
    borderRadius: "3px",
  },
  chartContainer: {
    position: "relative",
    height: "100%!important",
    flex: 1,
    backgroundColor: theme.palette.primary.bglight,
    margin: `${theme.spacing(1, 4)}`,
    boxShadow: "1px 1px 3px #002f6c",
    borderRadius: "3px",

    "@media (max-width:800px)": {
      overflow: "visible",
    },
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [exercise, setExercise] = useState("hc20mm");

  function handleExercise(e) {
    e.preventDefault();
    setExercise(e.target.value);
  }
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.topBar} />

      <aside className={classes.aside}>
        <Typography>Sidebar</Typography>
      </aside>

      <div className={classes.exerciseContainer} id='exercise'>
        <div className={classes.content}>
          <header className={classes.header}>
            <Typography variant='h4' color='secondary'>
              Hello, Sean
            </Typography>
          </header>
        </div>
        <div className={classes.content}>
          <Exercise />
        </div>
      </div>

      <div className={classes.chartsContainer} id='chart'>
        <div className={classes.chartContainer}>
          <MaxPullChart />
        </div>
        <div className={classes.chartContainer}>
          <MaxPullChart />
        </div>
      </div>
    </div>
  );
}
