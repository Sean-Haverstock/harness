import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Search from "./Search";
import Login from "./Login";
import theme from "../UI/theme";
import Dashboard from "./Dashboard";
import DashboardTemp from "./DashboardTemp";
import MobileNav from "./MobileNav";
import SignUp from "./SignUp";
import SignUpForm from "./SignUpForm";

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
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
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/search" component={Search} />/
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;
