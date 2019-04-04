import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';

import { userSelectors } from '../../../state/ducks/user';

import PrivateLayout from './PrivateLayout';

class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.instanceOf(React.Component),
      PropTypes.func,
    ]),
    children: PropTypes.array,
    userData: PropTypes.object,
  };

  state = {};

  render() {
    const { component, userData, children, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          isEmpty(userData) ? (
            <Redirect to="/" />
          ) : (
            <PrivateLayout
              component={component}
              {...props}
              {...rest}
              childrenItems={this.props.children ? children : []} // eslint-disable-line
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userData: userSelectors.makeSelectUserData(),
});
const mapDispatchToProps = () => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PrivateRoute);
