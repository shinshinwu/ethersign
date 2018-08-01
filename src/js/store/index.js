define(["../util/getWeb3", "../util/getContract"], function(getWeb3, getContract) {

  return new Vuex.Store({
    state: {
      web3: {},
      contractInstance: null,
      count: 0
    },

    mutations: {
      registerWeb3Instance (state, payload) {
        console.log('registerWeb3instance Mutation being executed', payload)
        let result = Object.assign({}, payload, { loaded: true })
        state.web3 = result
      },

      registerContractInstance (state, payload) {
        console.log('Ethersign contract instance: ', payload)
        state.contractInstance = () => payload
      },
      increment: state => state.count++,
      decrement: state => state.count--
    },

    actions: {
      registerWeb3 ({commit}) {
        return new Promise((resolve, reject) => {
          console.log('registerWeb3 Action being executed')
          getWeb3.then(result => {
            console.log('committing result to registerWeb3Instance mutation')
            commit('registerWeb3Instance', result)
            resolve()
          }).catch(e => {
            console.log('error in action registerWeb3', e)
          })
        })
      },

      getContractInstance ({commit}) {
        return new Promise((resolve, reject) => {
          getContract.then(result => {
            commit('registerContractInstance', result)
            resolve()
          })
        })
      },

      // getBookOwnershipContract ({commit}) {
      //   return new Promise((resolve, reject) => {
      //     getBookOwnershipContract.then(result => {
      //       commit('registerBookOwnershipContract', result)
      //       resolve()
      //     })
      //   })
      // },
    }
  })
})

// define(["./cart", "./inventory"], function(cart, inventory) {
//         //return an object to define the "my/shirt" module.
//         return {
//             color: "blue",
//             size: "large",
//             addToCart: function() {
//                 inventory.decrement(this);
//                 cart.add(this);
//             }
//         }
//     }
// );

// define(function () {
//     //Do setup work here

//     return {
//         color: "black",
//         size: "unisize"
//     }
// });