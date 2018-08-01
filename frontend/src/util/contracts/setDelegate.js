const setDelegate = (state, address) => {
  return new Promise((resolve, reject) => {
    state.contractInstance().methods.authorize(address).send({from: state.web3.coinbase}
    ).on('receipt', (receipt) => {
      console.log('received the tx receipt')
      state.pendingUpdates = false
      if (typeof receipt.events.Deauthorized !== 'undefined') {
        resolve([receipt.events.Authorized, receipt.events.Deauthorized])
      } else {
        resolve(receipt.events.Authorized)
      }
    })
  });
};

export default setDelegate