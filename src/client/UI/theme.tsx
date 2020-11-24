import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#2962ff',
			light: '#768fff',
			dark: '#0039cb',
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: 'Lato',
		fontWeightLight: 300,
	},
});

export default theme;
