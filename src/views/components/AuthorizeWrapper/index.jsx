import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { userSelectors } from '../../../state/ducks/user';

class AuthorizeWrapper extends Component {
  static propTypes = {
    claims: PropTypes.array.isRequired,
    render: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    onChallengeFailed: PropTypes.func,
  };

  componentDidMount() {
    const {
      claims,
      onChallengeFailed,
      user: { UserType },
    } = this.props;

    const found = claims.some((item) => UserType === item);

    if (!found && onChallengeFailed) onChallengeFailed();
  }

  componentDidUpdate(prevProps) {
    const {
      claims,
      onChallengeFailed,
      user: { token, UserType },
    } = this.props;

    const {
      user: { token: prevToken },
    } = prevProps;

    if (token !== prevToken && onChallengeFailed) {
      const found = claims.some((item) => UserType === item);

      if (!found) onChallengeFailed();
    }
  }

  render() {
    const {
      claims,
      render: renderProp,
      user: { UserType },
    } = this.props;

    const found = claims.some((item) => UserType === item);

    if (found) {
      return renderProp();
    }

    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  user: userSelectors.makeSelectUserData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AuthorizeWrapper);
