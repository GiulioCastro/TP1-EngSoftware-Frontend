import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";

ReactDOM.render(
	<Router>
		<Switch>
			{routes.map((route, idx) => (
				<Route
					key={idx}
					path={route.path}
					exact={route.exact}
					component={(props => (
						<route.layout {...props}>
							<route.component {...props}  />
						</route.layout>
					))}
				/>
			))}
			<Route component={() => <Redirect to="/houses" />} />
		</Switch>
	</Router>,
	document.getElementById('root')
);