import Web3 from 'web3'

import {address, ABI} from './constants/etherSignContract'

let getContract = new Promise(function (resolve, reject) {
  let web3js
  // if mist/metamask is installed, use the browser injected instance
  if (typeof web3 !== 'undefined') {
    web3js = new Web3(window.web3.currentProvider)
    web3js.eth.net.getId((err, networkId) => {
      // retrieve network ID, if it's not on rinkeby, we need to use infura to fetch details
      if (networkId !== 4) {
        let infuraWeb3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/8E1P9LRzpYDwt2FJRtVJ'))
        let etherSignContractInstance = new infuraWeb3.eth.Contract(ABI, address)
        resolve(etherSignContractInstance)
      } else {
        let etherSignContractInstance = new web3js.eth.Contract(ABI, address)
        resolve(etherSignContractInstance)
      }
    })
  } else {
    // if no local web3 injection, fetch it from infura
    web3js = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/8E1P9LRzpYDwt2FJRtVJ'))
    let etherSignContractInstance = new web3js.eth.Contract(ABI, address)
    resolve(etherSignContractInstance)
  }
})

export default getContract
