import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { last, isEmpty } from 'lodash';

import { Row, Breadcrumb } from 'antd';

import { getBreadcrumbMap } from '../../../routes';

import './style.less';

class PrivatePageHeader extends Component {
  static propTypes = {
    content: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    resourceMap: PropTypes.arrayOf(
      PropTypes.shape({
        paramName: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    match: PropTypes.object.isRequired,
    history: PropTypes.object,
  };

  state = {};

  renderBreadcrumbs = () => {
    const { resourceMap, match, history } = this.props;
    const breadcrumbMap = getBreadcrumbMap();
    const urlSnippets = match.url.split('/').filter((i) => i);
    const pathSnippets = history.location.pathname.split('/').filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${urlSnippets.slice(0, index + 1).join('/')}`;
      const path = `/${pathSnippets.slice(0, index + 1).join('/')}`;

      const lastSnippet = last(path.split('/'));
      const isParam = lastSnippet.indexOf(':', 0) === 0;

      let displayValue = 'Resource Name';

      if (isParam) {
        const paramName = lastSnippet.replace(':', '');
        const found =
          !isEmpty(resourceMap) &&
          resourceMap.find((item) => item.paramName === paramName);

        displayValue = found.value || 'Resource Name';
      } else {
        displayValue = breadcrumbMap[path];
      }
      return (
        url !== '/home' && (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{displayValue}</Link>
          </Breadcrumb.Item>
        )
      );
    });

    return [
      <Breadcrumb.Item key="home">
        <Link to="/home">home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
  };

  render() {
    const { title, content } = this.props;

    return (
      <div className="page-header">
        <Row className="header-section">
          <Breadcrumb separator="/">{this.renderBreadcrumbs()}</Breadcrumb>
        </Row>
        <h1 className="header-section title">{title}</h1>
        <div className="header-section">{content}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ location }) => ({ location });

const withConnect = connect(mapStateToProps);

export default compose(
  withRouter,
  withConnect,
)(PrivatePageHeader);
