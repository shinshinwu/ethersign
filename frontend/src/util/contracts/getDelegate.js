const getDelegate = (state, inputAddress) => {
  return new Promise((resolve, reject) => {
    state.contractInstance().methods.getDelegate(inputAddress).call((err, delegateAddress) => {
      if (err) {
        console.log(err)
      } else {
        resolve(delegateAddress)
      }
    })
  });
};

export default getDelegate