import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PrivateLayout from './PrivateLayout';

class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.instanceOf(React.Component),
      PropTypes.func,
    ]),
  };

  state = {};

  renderComponentChildren = () => {
    const { location, children, component } = this.props; // eslint-disable-line
    switch (location.pathname) {
      case '/products/sales-products':
        return children[0].component;
      case '/products/available-products':
        return children[1].component;
      case '/products/shipped-by-sellers':
        return children[2].component;
      default:
        return component;
    }
  };

  render() {
    const { component, location, children, ...rest } = this.props; // eslint-disable-line
    return (
      <Route
        render={(props) => (
          <PrivateLayout
            component={component || this.renderComponentChildren()}
            {...props}
            {...rest}
          />
        )}
      />
    );
  }
}

export default PrivateRoute;
