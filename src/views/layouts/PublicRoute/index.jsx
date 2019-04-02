import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PublicLayout from './PublicLayout';

class PublicRoute extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.instanceOf(React.Component),
      PropTypes.func,
    ]),
  };

  state = {};

  render() {
    const { component, location, children, ...rest } = this.props; // eslint-disable-line
    return (
      <Route
        render={(props) => (
          <PublicLayout component={component} {...props} {...rest} />
        )}
      />
    );
  }
}

export default PublicRoute;
