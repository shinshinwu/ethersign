requirejs(["store/index", "router/index"], function(store, router) {

  const app = new Vue({
    store,
    router,
    data() {
      return {
        loading: true,
        message: 'Hello World! This is EtherSign reporting to duty.',
        inputAddress: 'ETH Address',
        delegateAddress: 'None right now!'
      }
    },
    computed: {
      count () {
        return store.state.count
      }
    },
    methods: {
      getDelegate () {
        store.state.contractInstance().methods.getDelegate(this.inputAddress).call((err, address) => {
          if (err) {
            console.log(err)
          } else {
            this.delegateAddress = address
          }
        })
      }
    },
    created () {
      store.dispatch('registerWeb3').then(() => {
        store.dispatch('getContractInstance')
      }).then(() => {
        this.loading = false
      })
    }
  }).$mount('#app')
});
