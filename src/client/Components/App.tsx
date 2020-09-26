import * as React from 'react';
import Header from './Header';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import lama from '../../../public/assets/images/lama-lunag.jpg';
import { url } from 'inspector';
import Slider from './Slider';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		nav: {
			background: 'black',
			height: 500,
			width: 500,
			margin: 'auto',
			padding: 20,
		},
		header: {
			backgroundImage: 'url(../../../public/assets/images/lama-lunag.jpg)',
			height: 250,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: '0px -175px',
		},
	})
);

const App = () => {
	const classes = useStyles();
	return (
		<div>
			<Header />
			<div className={classes.header}></div>
			<Slider />
		</div>
	);
};

export default App;
