import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';

import { Layout, Menu, Icon } from 'antd';

import { layoutUtils } from '../../../../../../state/ducks/layout';

import './style.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

let firstMount = true;

class ApplicationMenu extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    onCollapse: PropTypes.func.isRequired,
    logo: PropTypes.string.isRequired,
    menuData: PropTypes.array.isRequired,
    // userData: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  componentDidMount() {
    firstMount = false;
  }

  getMenuMatchKeys = (flatMenuKeys, paths) =>
    paths.reduce(
      (matchKeys, path) =>
        matchKeys.concat(
          flatMenuKeys.filter((item) => pathToRegexp(item).test(path)),
        ),
      [],
    );

  getFlatMenuKeys = (menu) =>
    menu.reduce((keys, item) => {
      keys.push(item.path);
      if (item.children) {
        return keys.concat(this.getFlatMenuKeys(item.children));
      }
      return keys;
    }, []);

  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
      menuData,
    } = this.props;

    return this.getMenuMatchKeys(
      this.getFlatMenuKeys(menuData),
      layoutUtils.urlToList(pathname),
    );
  };

  renderIcon = (iconName) => <Icon type={`${iconName}`} />;

  renderMenuLink = (item) => {
    const icon = this.renderIcon(item.icon);
    const { path, target, name } = item;

    const { location } = this.props;

    return (
      <Link
        to={path}
        target={target}
        replace={path === location.pathname}
        onClick={(e) => this.onClickSubMenuItem(e)}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  onClickSubMenuItem = (e) => {
    console.log(e);

    const { isMobile, onCollapse } = this.props;

    return isMobile
      ? () => {
          onCollapse(true);
        }
      : undefined;
  };

  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  renderSubMenuOrItem = (item) => {
    const childrenItems = this.renderMenuItems(item.children);

    if (item.children && item.children.some((child) => child.name)) {
      return (
        <SubMenu
          key={item.path}
          title={
            item.icon ? (
              <span>
                {this.renderIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : (
              item.name
            )
          }
        >
          {childrenItems}
        </SubMenu>
      );
    }

    return <Menu.Item key={item.path}>{this.renderMenuLink(item)}</Menu.Item>;
  };

  renderMenuItems = (items) => {
    if (!items) {
      return [];
    }

    return items
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => this.renderSubMenuOrItem(item))
      .filter((item) => item);
  };

  render() {
    const {
      isCollapsed,
      onCollapse,
      isMobile,
      logo,
      menuData,
      // userData: { discriminator },
    } = this.props;

    const selectedKeys = this.getSelectedMenuKeys();

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        breakpoint="lg"
        onCollapse={(collapse) => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme="dark"
        className="sider fixSiderbar"
      >
        <div className="logo">
          <Link to="/orders">
            <img src={logo} alt="Logo" />
            <h1>SOLUTION</h1>
          </Link>
        </div>

        <Menu
          theme="dark"
          defaultOpenKeys={['/products']}
          inlineCollapsed={false}
          mode="inline"
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.renderMenuItems(menuData)}
        </Menu>
      </Sider>
    );
  }
}

export default ApplicationMenu;
