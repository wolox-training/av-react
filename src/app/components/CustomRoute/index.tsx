import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';

import { PATHS } from '~constants/paths';

interface Props extends RouteProps {
  authenticated?: boolean;
  component: React.ComponentType<RouteComponentProps>;
  protect?: boolean;
}

function CustomRoute({ authenticated, component: Component, protect, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={componentProps => {
        if (!protect && authenticated) {
          return <Redirect to={PATHS.home} />;
        }

        if (protect && !authenticated) {
          return <Redirect to={PATHS.login} />;
        }

        return <Component {...componentProps} />;
      }}
    />
  );
}

export default CustomRoute;
