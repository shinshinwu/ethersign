const getAdditionalSigners = (state, id) => {
  return new Promise((resolve, reject) => {

    state.contractInstance().getPastEvents("SignerAdded", {
      filter: {documentId: id},
      fromBlock: 0, // TODO: update this when going prod
      toBlock: 'latest'
    }, (err, events) => {
      resolve(events)
    })
  })
};

export default getAdditionalSigners