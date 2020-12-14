import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#01579B',
			light: '#4f83cc',
			dark: '#002f6c',
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: `'Roboto', 'Permanent Marker', 'Pacifico', 'Dancing Script', 'cursive',`,
		fontWeightLight: 300,
	},
});

export default theme;
