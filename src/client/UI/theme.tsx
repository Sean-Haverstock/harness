import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#002f6c',
			light: '#f5f5f6',
			dark: '#000640',
			contrastText: '#fff',
		},
		secondary: {
			light: 	'#e1e2e1',
			main: '#000640',
		}
	},
	typography: {
		fontFamily: `'Roboto', 'Permanent Marker', 'Pacifico', 'Dancing Script', 'cursive',`,
		fontWeightLight: 300,
	},
});

export default theme;
