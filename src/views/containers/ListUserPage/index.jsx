/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Card, List, Icon, Spin, notification } from 'antd';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import {
  userActions,
  userSelectors,
  userUtils,
} from '../../../state/ducks/user';

import './style.less';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class OrderDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
  };

  state = {
    users: [],
  };

  componentWillMount() {
    let totalUsers = [];
    const localUsers = [];
    if(!!JSON.parse(localStorage.getItem('users'))) {
        localUsers.push(JSON.parse(localStorage.getItem('users')));
        localUsers.forEach(user => {totalUsers.push(user)});
    }

    const {
      actions: { getUsers },
    } = this.props;
    getUsers().then((response) => {
      const { payload } = response;
      payload.forEach(item => {totalUsers.push(item)});
      this.setState({
        users: totalUsers,
      });
    });
  }

  showConfirmCancelOrder = () => {
    const {
      match: {
        params: { id },
      },
      actions: { cancelOrder },
      editStatusError,
    } = this.props;
    const data = {
      status: 7,
    };

    confirm({
      title: 'Deseja realmente cancelar o pedido?',
      okText: 'Confirmar',
      content: 'Este pedido sera cancelado.',
      onOk: async () => {
        const result = await cancelOrder(id, data);
        if (!result.error) {
          await notification.success({
            message: 'Sucesso',
            description: 'Pedido cancelado com sucesso',
          });
        } else {
          const { message: errorMessage, errors } = editStatusError;
          notification.error({
            message: errorMessage,
            description: <div {...errors} />,
          });
        }
      },
    });
  };

  render() {
    const { users } = this.state;
    return (
      <>
        {isEmpty(users) ? antIcon : null}
        <List
          className="user-list"
          rowKey={'id'}
          grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
          dataSource={[...users]}
          renderItem={(user) => (
            <List.Item key={user.nome}>
              <Card
                className="user-card"
                size="small"
                title={`${user.firstname} ${user.lastname}`}
              >
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>CPF: {user.cpf}</p>
              </Card>
            </List.Item>
          )}
        />
        <Link to="/">Cadastrar novo usuario</Link>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: userSelectors.makeSelectUsers(),
  isLoading: userSelectors.makeSelectUserLoading(),
  error: userSelectors.makeSelectUserError(),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderDetailsPage);
