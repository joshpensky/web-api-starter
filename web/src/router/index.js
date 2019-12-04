import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import history from './history';
import getRoutes from './getRoutes';

const Router = ({ children }) => {
  const routes = useMemo(() => getRoutes(), []);
  return (
    <BrowserRouter history={history}>
      <Route
        render={({ location }) =>
          children(
            <Switch>
              {routes.map(({ component, exact, path }, i) => (
                <Route key={i} path={path} exact={exact} component={component} />
              ))}
            </Switch>,
            location,
          )
        }
      />
    </BrowserRouter>
  );
};

Router.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Router;
