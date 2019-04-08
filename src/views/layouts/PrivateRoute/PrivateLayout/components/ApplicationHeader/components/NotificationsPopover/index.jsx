/* eslint-disable */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Popover, Badge, Icon, List } from 'antd';

import {
  notificationsActions,
  notificationsSelectors,
} from '../../../../../../../../state/ducks/notifications';

import './style.less';

class NotificationsPopover extends Component {
  componentDidMount = async () => {
    const {
      actions: { listNotifications },
    } = this.props;
    const result = await listNotifications();
    console.log(result.payload);
  };

  renderHeader = () => {
    return <div style={{ textAlign: 'center' }}>Notificações</div>;
  };

  render() {
    const { items, items: { totalNotViewed } } = this.props;
    console.log(items);
    return (
      <Popover
        content={
          <div className="notifications">
            <List
              header={this.renderHeader()}
              // footer={this.renderFooter()}
              dataSource={[]}
              // renderItem={this.renderListItem}
            />
          </div>
        }
        placement="bottomRight"
        trigger={['click']}
      >
        <span className="action account">
          <Badge count={totalNotViewed} style={{ backgroundColor:"#ce5652"}}>
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

const mapStateToProps = createStructuredSelector({
  // total: notificationsSelectors.makeSelectTotal(),
  items: notificationsSelectors.makeSelectNotifications(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(notificationsActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(NotificationsPopover);
