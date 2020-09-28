import React from 'react';
import Header from './Header';
import lama from '../../../public/assets/images/lunag-crop.jpg';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(() =>
	createStyles({
		header: {
			backgroundImage: 'url(../../../)',
			height: '100%',
			width: '100%',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'absolute',
			zIndex: 0,
			top: 0,
			left: 0,
		},
	})
);

const Landing = () => {
	const classes = useStyles();
	return (
		<div>
			<Header />
			<div>
				<img src={lama} className={classes.header} />
			</div>
		</div>
	);
};

export default Landing;
