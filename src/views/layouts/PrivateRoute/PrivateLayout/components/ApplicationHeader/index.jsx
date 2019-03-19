/* eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Divider, Dropdown, Avatar, Menu, Icon } from 'antd';

import './style.less';

class ApplicationHeader extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };

  state = {};

  handleMenuClick = (event) => {
    if (event.key === 'logout') this.handleLogoutClick();
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
    const { logo, isMobile, isCollapsed } = this.props;

    return (
      <div className="header">
        {isMobile && [
          <Link to="/orders" className="header-logo" key="logo">
            {/*             <img src={logo} alt="Logo" width="32" />
             */}
          </Link>,
          <Divider type="vertical" key="divider" />,
        ]}
        <span className="trigger" onClick={this.toggle}>
          <Icon type={isCollapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        <div className="right">
          {/*  <NotificationsPopover /> */}

          <Dropdown overlay={this.renderCurrentUserMenu()}>
            <span className="action account">
              <Avatar size="small" className="avatar" icon="user" />
              <span className="name">usuário x</span>
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default ApplicationHeader;
