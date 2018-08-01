import Vue from 'vue'
import Vuex from 'vuex'
import { getWeb3,
         pollWeb3,
         getContract,
         getDelegate,
         setDelegate,
         removeDelegate,
         signDocument,
         getUserEvents,
         getDocument,
         addSigner,
         getAdditionalSigners
       } from '../util'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    web3: {},
    delegateAddress: null,
    contractInstance: null,
    document: null,
    transactions: [],
    pendingUpdates: false
  },
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = Object.assign({}, payload, { loaded: true })
      state.web3 = result
      pollWeb3(state)
    },

    pollWeb3Instance (state, payload) {
      console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
    },
    registerContractInstance (state, payload) {
      console.log('Registering contract constructor: ', payload)
      state.contractInstance = () => payload
    },
    registerDelegateAddress (state, payload) {
      state.delegateAddress = payload
    },
    registerTransaction (state, payload) {
      if (Array.isArray(payload)) {
        state.transactions = state.transactions.concat(payload)
      } else {
        state.transactions.push(payload)
      }

      state.transactions.sort(function (a, b) {
        if ((a.blockNumber == b.blockNumber) && (a.event == 'Deauthorized')) {
          return 1
        } else {
          return b.blockNumber - a.blockNumber;
        }
      })
    },
    registerDocument (state, payload) {
      state.document = payload
    },
    registerDocumentTransaction (state, payload) {
      state.document.additionalSigners.push(payload)
      state.document.additionalSigners.sort(function (a, b) {
        return b.blockNumber - a.blockNumber;
      })
    }
  },
  actions: {
    pollWeb3 ({commit}, payload) {
      console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
    },
    async registerWeb3 ({commit}) {
      console.log('registerWeb3 Action being executed')
      commit('registerWeb3Instance', await getWeb3)
    },
    async getContractInstance ({commit}) {
      console.log('getting contract instance')
      commit('registerContractInstance', await getContract)
    },
    async getDelegate({state, commit}, address) {
      if (address == null) {
        commit('registerDelegateAddress', await getDelegate(state, state.web3.coinbase))
      } else {
        return await getDelegate(state, address)
      }
    },
    async setDelegate({state, commit}, address) {
      let transaction = await setDelegate(state, address)
      commit('registerDelegateAddress', address)
      commit('registerTransaction', transaction)
    },
    async removeDelegate({state, commit}, signer) {
      let transaction = await removeDelegate(state)
      commit('registerDelegateAddress', "0x0000000000000000000000000000000000000000")
      commit('registerTransaction', transaction)
    },
    async signDocument({state, commit}, args) {
      let doc = await signDocument(state, args)
      let payload = Object.assign({}, doc, { additionalSigners: [] })

      commit('registerDocument', payload)
    },
    async getUserEvents({state, commit}) {
      commit('registerTransaction', await getUserEvents(state))
    },
    async getDocument({state, commit}, id) {
      let events = await getDocument(state, id)
      if (typeof events[0] !== 'undefined') {
        let additionalSigners = await getAdditionalSigners(state, events[0].returnValues.documentId)
        let payload = Object.assign({}, events[0], { additionalSigners: additionalSigners })
        commit('registerDocument', payload)
      }
    },
    async addSigner({state, commit}, signer) {
      commit('registerDocumentTransaction', await addSigner(state, signer))
    }
  }
})
