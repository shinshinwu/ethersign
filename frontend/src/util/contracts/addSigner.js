const addSigner = (state, signer) => {
  return new Promise((resolve, reject) => {
    // addSigner(uint _documentId, address _signer)
    state.contractInstance().methods.addSigner(state.document.returnValues.documentId, signer).send({from: state.web3.coinbase}
    ).on('receipt', (receipt) => {
      console.log('received the tx receipt')
      resolve(receipt.events.SignerAdded)
    })
  });
};

export default addSigner