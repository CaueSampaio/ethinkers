/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, notification, Input, Button } from 'antd';

import {
  loggedUserActions,
  loggedUserSelectors,
} from '../../../../../state/ducks/loggedUser';
import { userActions, userSelectors } from '../../../../../state/ducks/user';

import PrivatePageSection from '../../../../components/PrivatePageSection';
import PrivatePageHeader from '../../../../components/PrivatePageHeader';
import PasswordFormFields from '../../../../components/PasswordFormFields';

import './style.less';

class AccountPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  state = {};

  onSubmit = (e) => {
    e.preventDefault();

    const {
      form: { validateFields },
      actions: { changeUserPasswordLoggedIn },
    } = this.props;
    validateFields(async (err, values) => {
      if (err) return;
      const params = {
        ...values,
      };
      console.log(params);
      const result = await changeUserPasswordLoggedIn(params);
      if (!result.error) {
        await notification.success({
          message: 'Sucesso',
          description: 'Senha alterada com sucesso',
        });
      } else {
        const { message: errorMessage, errors } = updateError;
        notification.error({
          message: errorMessage,
          description: <BadRequestNotificationBody errors={errors} />,
        });
      }
    });
  };

  render() {
    const {
      form,
      updateIsLoading,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Fragment>
        <PrivatePageHeader title="Alterar Senha" />
        <PrivatePageSection>
          <Row>
            <Col>
              <div className="account-content">
                <Form>
                  <Row>
                    <Form.Item label="Senha Atual">
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        {getFieldDecorator('oldPassword', {
                          rules: [
                            {
                              required: true,
                              message: 'Por favor insira seu email.',
                            },
                          ],
                        })(<Input type="password" />)}
                      </Col>
                    </Form.Item>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <PasswordFormFields
                        form={form}
                        labelCol={null}
                        wrapperCol={null}
                        passwordFieldName="newPassword"
                        passwordLabel="Nova Senha"
                      />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start">
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                      <Form.Item>
                        <Button
                          loading={updateIsLoading}
                          style={{ borderRadius: 20, marginTop: 10 }}
                          type="primary"
                          htmlType="submit"
                          onClick={this.onSubmit}
                        >
                          Atualizar
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </PrivatePageSection>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userData: userSelectors.makeSelectUserData(),

  updateIsLoading: loggedUserSelectors.makeSelectUpdatePasswordIsLoading(),
  updateError: loggedUserSelectors.makeSelectUpdatePasswordError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...userActions, ...loggedUserActions },
    dispatch,
  ),
});

const withForm = Form.create();
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
)(AccountPage);
