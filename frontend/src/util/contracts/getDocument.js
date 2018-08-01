const getDocument = (state, id) => {
  return new Promise((resolve, reject) => {

    state.contractInstance().getPastEvents("DocumentSigned", {
      filter: {documentId: id},
      fromBlock: 0, // TODO: update this when going prod
      toBlock: 'latest'
    }, (err, events) => {
      resolve(events)
    })
  })
};

export default getDocument