import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';

import { Layout, Menu, Icon } from 'antd';

import { layoutUtils } from '../../../../../../state/ducks/layout';

import './style.less';
// import { getHomeRoute } from '../../../../../../utils';

const { Sider } = Layout;
const { SubMenu } = Menu;

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

  renderIcon = (iconName) => <Icon type={iconName} />;

  renderMenuLink = (item) => {
    const { location, isMobile, onCollapse } = this.props;
    const { path, target, name } = item;

    return (
      <Link
        to={path}
        target={target}
        replace={path === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {this.renderIcon(item.icon)}
        <span>{name}</span>
      </Link>
    );
  };

  renderSubMenuOrItem = (item) => {
    //    const { discriminators: menuDiscriminators } = item;

    // if (!menuDiscriminators.includes(userDiscriminator)) return null;
    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = this.renderMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
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

      return null;
    }
    return <Menu.Item key={item.path}>{this.renderMenuLink(item)}</Menu.Item>;
  };

  renderMenuItems = (items) => {
    if (!items) return [];
    console.log(items);
    return items
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => this.renderSubMenuOrItem(item))
      .filter((item) => item);
  };

  render() {
    const {
      isCollapsed,
      onCollapse,
      logo,
      menuData,
      // userData: { discriminator },
    } = this.props;

    const selectedKeys = this.getSelectedMenuKeys();

    return (
      <Sider
        theme="dark"
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        className="sider"
        width={272}
      >
        <Link to="/home">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h1>Logo</h1>
          </div>
        </Link>
        <Menu
          theme="dark"
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
