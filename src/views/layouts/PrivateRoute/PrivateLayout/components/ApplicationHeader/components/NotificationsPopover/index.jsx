/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Popover, Badge, Icon, List } from 'antd';

import './style.less';

class NotificationsPopover extends Component {

  renderHeader = () => {
    const { t } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        Notificações
      </div>
    );
  };

  renderFooter = () => {
    const { t } = this.props;
    return (
      <div className="footer">
        <Link to="/notifications">Ver todas</Link>
      </div>
    );
  };

  render() {
    const { t, items, total } = this.props;

    return (
      <Popover
        content={
          <div className="notifications">
            <List
              header={this.renderHeader()}
              footer={this.renderFooter()}
              dataSource={[]}
              // renderItem={this.renderListItem}
            />
          </div>
        }
        placement="bottomRight"
        trigger={['click']}
      >
        <span className="action account">
          <Badge count={total}>
            <Icon
              type="bell"
              style={{ fontSize: '14px', padding: '6px', color: '#656565' }}
            />
          </Badge>
        </span>
      </Popover>
    );
  }
}

export default NotificationsPopover;
