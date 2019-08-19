import React from 'react';
import { connect } from 'react-redux';
import { changeProvider } from '../../reducers/SettingsReducer';
import DropdownBase from './DropdownBase';

class ProvidersDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,

      options: [
        { key: 'mainnet', text: 'Main Net', value: 'https://mainnet.infura.io/A6JlogMFVWgkE7v6pwMO' },
        { key: 'ropsten', text: 'Ropsten', value: 'https://ropsten.infura.io/A6JlogMFVWgkE7v6pwMO' },
        { key: 'rinkeby', text: 'Rinkeby', value: 'https://rinkeby.infura.io/KEyTvyJruqUAlQc7igSQ' },
        { key: 'localhost:8545', text: 'localhost:8545', value: 'http://localhost:8545' },
        { key: 'localhost:9545', text: 'localhost:9545', value: 'http://localhost:9545' },
        { key: 'ganache', text: 'Ganache', value: 'http://localhost:7545' },
        { key: 'bigboi', text: 'Big Boi', value: 'http://167.86.78.220:8545' },
        { key: 'injected', text: 'MetaMask', value: 'injected' },
      ]
    };
  }

  componentDidMount() {
  }

  onChangeHandler = (value) => {
    this.props.changeProvider(value)
  };

  render() {
    const options = this.state.options;

    let providerName = this.props.web3.currentProvider.constructor.name;

    if (providerName.indexOf('HttpProvider') > -1) {

      if (this.props.web3.currentProvider.host.indexOf('ropsten') !== -1) {
        providerName = 'ropsten'
      } else if (this.props.web3.currentProvider.host.indexOf('rinkeby') !== -1) {
        providerName = 'rinkeby'
      } else {
        providerName = "Custom";
      }
    } else if (providerName.indexOf('MetamaskInpageProvider') !== -1) {
      providerName = "injected"
    }

    console.log(providerName);
    return (<DropdownBase placeholder={providerName}
                          options={options}
                          onChange={(value) => this.onChangeHandler(value)} />);
  }
}

ProvidersDropdown.defaultProps = {};
ProvidersDropdown.propTypes = {};

const mapStateToProps = (state) => {
  return {
    web3: state.settings.web3,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProvider: (url) => dispatch(changeProvider(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersDropdown);
