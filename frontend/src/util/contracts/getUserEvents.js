const getUserEvents = (state) => {
  return new Promise((resolve, reject) => {

    var topic = "0x000000000000000000000000" + state.web3.coinbase.toLowerCase().split('0x')[1]

    // get all events as signers
    state.contractInstance().getPastEvents("allEvents", {
      fromBlock: 0, // TODO: update this when going prod
      toBlock: 'latest',
      topics: [null, topic]
    }, (err, signerEvents) => {
      // get all events acted as delegate
      state.contractInstance().getPastEvents("allEvents", {
        fromBlock: 0, // TODO: update this when going prod
        toBlock: 'latest',
        topics: [null, null, topic]
      }, (err, delegateEvents) => {
        let allEvents = signerEvents.concat(delegateEvents)
        resolve(allEvents)
      })
    })
  })
};

export default getUserEvents