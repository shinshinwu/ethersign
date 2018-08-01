define(function() {
  let getWeb3 = new Promise(function (resolve, reject) {
    // Check for injected web3 (mist/metamask)
    // var web3js = window.web3
    if (typeof web3 !== 'undefined') {
      var web3js = new Web3(web3.currentProvider)
      resolve({
        isInjected: true,
        host: web3js.currentProvider.isMetaMask ? 'Metamask' : 'Unknown Provider',
        web3Instance () {
          return web3js
        }
      })
    } else {
      // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
      // reject(new Error('Unable to connect to Metamask'))
      var web3js = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/8E1P9LRzpYDwt2FJRtVJ'))
      resolve({
        isInjected: false,
        host: web3js.currentProvider.host,
        web3Instance () {
          return web3js
        }
      })
    }
  })
    .then(result => {
      return new Promise(function (resolve, reject) {
        // Retrieve network ID
        result.web3Instance().eth.net.getId((err, networkId) => {
          if (err) {
            // If we can't find a networkId keep result the same and reject the promise
            reject(new Error('Unable to retrieve network ID'))
          } else {
            // Assign the networkId property to our result and resolve promise
            result = Object.assign({}, result, {networkId})
            resolve(result)
          }
        })
      })
    })
    .then(result => {
      return new Promise(function (resolve, reject) {
        if (result.isInjected) {
          // Retrieve coinbase
          result.web3Instance().eth.getCoinbase((err, coinbase) => {
            if (err) {
              reject(new Error('Unable to retrieve coinbase'))
            } else {
              result = Object.assign({}, result, { coinbase })
              resolve(result)
            }
          })
        } else {
          result = Object.assign({}, result , { coinbase: 'N/A' })
          resolve(result)
        }
      })
    })
    .then(result => {
      return new Promise(function (resolve, reject) {
        if (result.isInjected) {
          // Retrieve balance for coinbase
          result.web3Instance().eth.getBalance(result.coinbase, (err, balance) => {
            if (err) {
              reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
            } else {
              let parsedBalance = parseInt(result.balance, 10)
              result = Object.assign({}, result, { balance })
              resolve(result)
            }
          })
        } else {
          result = Object.assign({}, result, { balance: 0 })
          resolve(result)
        }
      })
    })

  return getWeb3
})