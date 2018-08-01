const removeDelegate = (state) => {
  return new Promise((resolve, reject) => {
    state.contractInstance().methods.deauthorize().send({from: state.web3.coinbase}
    ).on('receipt', (receipt) => {
      console.log('received the tx receipt')
      state.pendingUpdates = false
      resolve(receipt.events.Deauthorized)
    })
  });
};

export default removeDelegate