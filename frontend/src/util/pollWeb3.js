let pollWeb3 = function (state) {
  setInterval(() => {
    if (state.web3.loaded && state.web3.isInjected) {
      state.web3.web3Instance().eth.getCoinbase((err, coinbase) => {
        if (coinbase.toLowerCase() !== state.web3.coinbase.toLowerCase()) {
          location.reload();
        }
      })
    }
  }, 1000)
};

export default pollWeb3