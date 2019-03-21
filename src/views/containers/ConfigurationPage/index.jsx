import { Component } from 'react';
import PropTypes from 'prop-types';

class ConfigurationsPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {
      history: { push },
    } = this.props;

    push('/configurations/account');
  }

  render() {
    return null;
  }
}
export default ConfigurationsPage;
