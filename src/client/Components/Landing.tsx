import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
	createStyles({
		header: {
			// backgroundImage: 'url(../../public/assets/images/lunag-crop.jpg)',
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
			{/* <img src={lama} className={classes.header} /> */}
		</div>
	);
};

export default Landing;
