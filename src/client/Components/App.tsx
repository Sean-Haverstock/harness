import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Navbar from './Navbar';
import Search from './Search';
import { ThemeProvider } from '@material-ui/core';
import SignIn from './Login';
import theme from '../UI/theme';
import Dashboard from './Dashboard';
import DashboardTemp from './DashboardTemp';
import MobileNav from './MobileNav';

const App = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 640;
	useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
	}, []);
	
	return (
		<Router>
			<div>
				<ThemeProvider theme={theme}>
					{width < breakpoint ? <MobileNav /> : <Navbar />}
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={SignIn} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/search" component={Search} />/
					</Switch>
				</ThemeProvider>
			</div>
		</Router>
	);
};

export default App;
