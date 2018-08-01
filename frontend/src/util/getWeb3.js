import Web3 from 'web3'

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
*/

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
    var web3js = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/8E1P9LRzpYDwt2FJRtVJ'))
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
          // if it's not on rinkeby, we need to use infura to fetch details
          if (networkId !== 4) {
            var web3js = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/8E1P9LRzpYDwt2FJRtVJ'))

            result = {
              isInjected: false,
              host: web3js.currentProvider.host,
              web3Instance () {
                return web3js
              }
            }
          }

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
        result = Object.assign({}, result , { coinbase: null })
        resolve(result)
      }
    })
  })

export default getWeb3
