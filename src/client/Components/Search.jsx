import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import ClimbsDisplay from './ClimbsDisplay';
import theme from '../UI/theme';
import MapWrapper from './LocationMap';

const useStyles = makeStyles({
  mainContainer: {
    backgroundImage: `linear-gradient(to top, transparent, ${theme.palette.primary.bglight})`,
    display: 'flex',
    flexDirection: 'column',
    height: '40vh',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '1200px',
    height: '150px',
    paddingTop: '20px',
  },
  head: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: `${theme.palette.primary.main}`,
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    maxWidth: '1200px',
    padding: '20px',
    '@media (max-width:780px)': {
      flexDirection: 'column',
    },
  },
  searchField: {
    alignSelf: 'center',
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
  },
});

function Search() {
  const [routes, setRoutes] = useState([]);
  const [isListView, setView] = useState(true);
  const [grade, setGrade] = useState('5.6');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const classes = useStyles();
  const grades = [
    'Any',
    '5.5',
    '5.6',
    '5.7',
    '5.8',
    '5.9',
    '5.10a',
    '5.10b',
    '5.10c',
    '5.10d',
    '5.11a',
    '5.11b',
    '5.11c',
    '5.11d',
    '5.12a',
    '5.12b',
    '5.12c',
    '5.12d',
    '5.13a',
    '5.13b',
    '5.13c',
    '5.13d',
    '5.14a',
    '5.14b',
    '5.14c',
    '5.14d',
  ];
  const typeOptions = ['Trad', 'Sport', 'Boulder', 'Any'];

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/climbs');
        const data = response.data.routes;
        setRoutes(data);
      } catch (error) {
        console.log(error);
      }
    })();
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

  function handleNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleFindClimbs(e) {
    e.preventDefault();
    axios
      .get(`/api/climbs/search`, {
        params: {
          type,
          grade,
          name,
        },
      })
      .then((res) => {
        const data = res.data.routes;
        setRoutes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={classes.mainContainer}>
      <Container className={classes.header}>
        <Typography className={classes.head} variant='h4'>
          Explore America's Climbing Routes
        </Typography>
        {/* Add Route to API */}
        <TextField
          className={classes.searchField}
          placeholder='Search climbs by name'
          onChange={handleNameChange}
        />
      </Container>
      <Container className={classes.formContainer}>
        <form className={classes.form}>
          <label htmlFor='type'>
            <Typography className={classes.fields} display='inline'>
              Type:
            </Typography>
            <select
              className={classes.fields}
              id='type'
              name='type'
              onBlur={handleTypeSelection}
            >
              {typeOptions.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </label>

          <label className={classes.fields} htmlFor='grade'>
            <Typography display='inline'>Grade:</Typography>
            <select
              className={classes.fields}
              id='grade'
              name='grade'
              onBlur={handleGradeSelection}
            >
              {/* map over array of grades for drop down menu options */}
              {grades.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </label>
          <button
            type='submit'
            className={classes.fields}
            onClick={handleFindClimbs}
          >
            Search!
          </button>
        </form>
        <div className={classes.buttonContainer}>
          <button
            className={classes.buttons}
            type='submit'
            value='list'
            onClick={handleViewChange}
          >
            List View
          </button>
          <button
            className={classes.buttons}
            type='submit'
            value='map'
            onClick={handleViewChange}
          >
            Map View
          </button>
        </div>
      </Container>

      <div>
        {isListView ? (
          <ClimbsDisplay routes={routes} />
        ) : (
          <MapWrapper routes={routes} />
        )}
      </div>
    </div>
  );
}

export default Search;
