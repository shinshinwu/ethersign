define(["./constants/etherSignContract"], function(contract) {
  let getContract = new Promise(function (resolve, reject) {
    let web3js
    // if mist/metamask is installed, use the browser injected instance
    if (typeof web3 !== 'undefined') {
      web3js = new Web3(window.web3.currentProvider)
    } else {
      // if no local web3 injection, fetch it from infura
      web3js = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/8E1P9LRzpYDwt2FJRtVJ'))
    }
    // let web3 = new Web3(window.web3.currentProvider)
    let etherSignContractInstance = new web3js.eth.Contract(contract.ABI, contract.address)
    resolve(etherSignContractInstance)
  })

  return getContract
})
