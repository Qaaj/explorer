import Web3 from 'web3'

class Web3Service {

  constructor() {
    this.web3 = null;
    this.initConnection();
  }

  initConnection(ok, nok, url) {
    if (!url && window.web3) {
      console.log("Injected web3 detected");
      this.web3 = new Web3(window.web3.currentProvider)
      if (ok) return ok(this.web3);
    } else if (url === 'injected' && window.web3) {
      this.web3 = new Web3(window.web3.currentProvider)
      if (ok) return ok(this.web3);
    }
    else {
      // const provider = new Web3.providers.HttpProvider(url || 'http://127.0.0.1:9545')
      const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/A6JlogMFVWgkE7v6pwMO')
      this.web3 = new Web3(provider)
      console.log('prov ' , provider)
      if (ok) return ok(this.web3)
    }


  }

  get(url) {
    return new Promise((ok, nok) => {
      // if instantiated, return web3
      if (!url && this.web3) return ok(this.web3)
      // otherwise, initiate again
      this.initConnection(ok, nok, url);
    })
  }
}

module.exports = new Web3Service();
