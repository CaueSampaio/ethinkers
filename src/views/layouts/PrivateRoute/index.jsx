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
    children: PropTypes.array,
  };

  state = {};

  render() {
    const { component, children, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => (
          <PrivateLayout
            component={component}
            {...props}
            {...rest}
            childrenItems={this.props.children ? children : []} // eslint-disable-line
          />
        )}
      />
    );
  }
}

export default PrivateRoute;
