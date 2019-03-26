import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isString } from 'lodash';
import { Row } from 'antd';

class BadRequestNotificationBody extends Component {
  static propTypes = {
    errors: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.string,
    ]),
  };

  render() {
    const { errors } = this.props;

    if (isEmpty(errors))
      return (
        <Fragment>
          <Row style={{ color: '#989898' }}>Erro</Row>
        </Fragment>
      );

    if (isString(errors))
      return (
        <Fragment>
          <Row style={{ color: '#989898' }}>{errors}</Row>
        </Fragment>
      );

    const items = isEmpty(errors)
      ? []
      : errors.map((error, index) => (
          // eslint-disable-next-line
          <Fragment key={index}>
            <Row style={{ color: '#989898' }}>{error.ErrorMessage}</Row>
          </Fragment>
        ));

    return items;
  }
}

export default BadRequestNotificationBody;
