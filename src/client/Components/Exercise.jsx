import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import theme from '../UI/theme';

const useStyles = makeStyles(() =>
	createStyles({
		header: {
      fontFamily: 'Roboto',
      padding: theme.spacing(1)
    },
    text: {
      fontFamily: 'Roboto',
      paddingLeft: theme.spacing(1)
    },
    inputsContainer: {
      // minWidth: '350px',
      paddingBottom: theme.spacing(1)
    },
    inputs: {
      
      maxWidth: '40px'
    }
	})
);

export default function Exercise() {
  const classes = useStyles();
  return (
    <Fragment>
      <Typography className={classes.header} variant='h4' color='secondary'>1-Arm Max ISO Pulls</Typography>
      <Typography className={classes.text} variant='h6' color='secondary'>Description:</Typography>
      <Typography className={classes.text} variant='body2' color='textSecondary' paragraph={true}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, minus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea natus omnis velit error quia saepe quod quas veniam debitis!</Typography>
      {/* <Typography className={classes.text} variant='subtitle2' color='primary'>Edge Size: 20mm</Typography>
      <Typography className={classes.text} variant='subtitle2' color='primary'>Finger Position: Half-Crimp</Typography> */}
      <Grid container className={classes.inputsContainer}>
        {/* <div className={classes.fields}> */}
        <Grid item md={3} sm={6} xs={6}>
          <label className={classes.inputs} htmlFor="Edge Size">
            <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Edge Size: </Typography>
          </label>
        </Grid>
        <Grid item md={3} sm={6} xs={6}>
            <select
          
            id="Edge Size"
            name="type"
                // onChange={handleGradeSelection}
            >
              <option value="20mm">20mm</option>
              <option value="15mm">15mm</option>
              <option value="10mm">10mm</option>
              <option value="8mm">8mm</option>
            </select>
        </Grid>  
        <Grid item md={3} sm={6} xs={6}>
            <label className={classes.inputs} htmlFor="Finger Position">
              <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Finger Position: </Typography>
            </label>
        </Grid>
        <Grid item md={3} sm={6} xs={6}>  
            <select
            
            id="Edge Size"
                  name="type"
                  // onChange={handleGradeSelection}
            >
              <option value="halfCrimp">Half Crimp</option>
              <option value="openHand">Open Hand</option>
              <option value="fullCrimp">Full Crimp</option>
            </select>
         </Grid>
            
        <Grid item md={3} sm={6} xs={6}>
            <label className={classes.inputs} htmlFor="rep1">
              <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 1: </Typography>
            </label>
        </Grid>
        <Grid item md={3} sm={6} xs={6}>   
            <input className={classes.inputs}></input>
        </Grid >
        <Grid item md={3} sm={6} xs={6}>
            <label htmlFor="rep1">
              <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 2: </Typography>
            </label>
        </Grid>   
        <Grid item md={3} sm={6} xs={6}>
            <input className={classes.inputs}></input> 
        </Grid>
        <Grid item md={3} sm={6} xs={6}>
            <label htmlFor="rep1">
              <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 3: </Typography>
            </label>
        </Grid>   
        <Grid item md={3} sm={6} xs={6}>
            <input className={classes.inputs}></input> 
        </Grid>
        <Grid item md={3} sm={6} xs={6}>
            <label htmlFor="rep1">
              <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 4: </Typography>
            </label>
        </Grid>    
        <Grid item md={3} sm={6} xs={6}>    
            <input className={classes.inputs}></input> 
         </Grid>
         <Grid item md={3} sm={6} xs={6}>
            <label htmlFor="rep1">
              <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 5: </Typography>
            </label>
          </Grid>
          <Grid item md={3} sm={6} xs={6}>
            <input className={classes.inputs}></input> 
          </Grid>
          <Grid item md={3} sm={6} xs={6}>
            <label className={classes.inputs} htmlFor="rep1">
              <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Bodyweight: </Typography>
            </label>
        </Grid>  
        <Grid item md={3} sm={6} xs={6}>
          <input className={classes.inputs}></input>
          </Grid> 
      </Grid>
    </Fragment>
  )
}

{/* <input></input>
        <input></input>
        <input></input>
        <input></input>
        <Typography className={classes.text} variant='subtitle1' color='textSecondary'>Body Weight: </Typography>
        <input></input> */}

      //   <div className={classes.fieldsContainer}>
      //   {/* <div className={classes.fields}> */}
      //     <label className={classes.inputs} htmlFor="Edge Size">
      //       <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Edge Size: </Typography>
      //     </label>
      //       <select
      //       className={classes.inputs}
      //       id="Edge Size"
      //       name="type"
      //           // onChange={handleGradeSelection}
      //       >
      //         <option value="20mm">20mm</option>
      //         <option value="15mm">15mm</option>
      //         <option value="10mm">10mm</option>
      //         <option value="8mm">8mm</option>
      //       </select>
      //     {/* </div>

      //     <div className={classes.fields}> */}
      //       <label className={classes.inputs} for="Finger Position">
      //         <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Finger Position: </Typography>
      //       </label>
      //       <select
      //        className={classes.inputs}
      //       id="Edge Size"
      //             name="type"
      //             // onChange={handleGradeSelection}
      //       >
      //         <option value="halfCrimp">Half Crimp</option>
      //         <option value="openHand">Open Hand</option>
      //         <option value="fullCrimp">Full Crimp</option>
      //       </select>
      //     {/* </div>
          
      //     <div className={classes.fields}> */}
      //       <label className={classes.inputs} for="rep1">
      //         <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Bodyweight: </Typography>
      //       </label>
      //       <input className={classes.inputs}></input>
      //     {/* </div>

      //     <div className={classes.fields}> */}
      //       <label className={classes.inputs} for="rep1">
      //         <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 1: </Typography>
      //       </label>
      //       <input className={classes.inputs}></input>
      //     {/* </div>

      //     <div className={classes.fields}> */}
      //       <label for="rep1">
      //         <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 2: </Typography>
      //       </label>
      //       <input className={classes.inputs}></input> 
      //     {/* </div>

      //     <div className={classes.fields}> */}
      //       <label for="rep1">
      //         <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 3: </Typography>
      //       </label>
      //       <input className={classes.inputs}></input> 
      //     {/* </div>
          
      //     <div className={classes.fields}> */}
      //       <label for="rep1">
      //         <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 4: </Typography>
      //       </label>
      //       <input className={classes.inputs}></input> 
      //     {/* </div>

      //     <div className={classes.fields}> */}
      //       <label for="rep1">
      //         <Typography className={classes.text} variant='subtitle2' color='primary' display="inline">Rep 5: </Typography>
      //       </label>
      //       <input className={classes.inputs}></input> 
      //     {/* </div> */}

      // </div>