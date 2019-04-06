/* eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Divider, Dropdown, Avatar, Menu, Icon } from 'antd';

import {
  userActions,
  userSelectors,
  userUtils,
} from '../../../../../../state/ducks/user';
import logo from '../../../../../../assets/images/logo/colorful-logo.svg';
import NotificationsPopover from './components/NotificationsPopover';

import './style.less';

class ApplicationHeader extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
  };

  state = {};

  handleMenuClick = (event) => {
    if (event.key === 'logout') this.handleLogoutClick();
  };

  handleLogoutClick = () => {
    const { handleLogout } = this.props.actions;
    const { removeLocalStorageUser } = userUtils;

    removeLocalStorageUser();
    handleLogout();
  };

  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  toggle = () => {
    const { isCollapsed, onCollapse } = this.props;
    onCollapse(!isCollapsed);
    this.triggerResizeEvent();
  };

  renderCurrentUserMenu = () => {
    return (
      <Menu className="header-menu" onClick={this.handleMenuClick}>
        <Menu.Item key="settings" style={{ width: '100%' }}>
          <Link to="/configurations/account">
            <Icon type="setting" />
            Configurações
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" style={{ width: '100%' }}>
          <Icon type="logout" />
          Sair
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { isMobile, isCollapsed, userData: { User = {} } } = this.props;

    return (
      <div className="header">
        {isMobile && [
          <Link to="/orders" className="header-logo" key="logo">
            <img src={logo} alt="Logo" width="25" />
          </Link>,
          <Divider type="vertical" key="divider" />,
        ]}
        <Icon
          className="trigger"
          type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className="right">
          <NotificationsPopover />
          <Dropdown overlay={this.renderCurrentUserMenu()}>
            <span className="action account">
              <Avatar size="small" className="avatar" icon="user" />
              <span className="name">{User.Name}</span>
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userData: userSelectors.makeSelectUserData(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ApplicationHeader);
