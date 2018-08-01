<template>
  <section class="section">
    <div v-if="userSignedIn" class="container">
      <div class="content">
        <h1>Profile</h1>
        <hr>
        <p>My Account Address: {{ this.$store.state.web3.coinbase }}</p>
        <p v-if="hasDelegate">
          <span>My Delegate Address: {{ delegateAddress }}</span>
          <span><button class="align-button button is-danger is-small is-outlined" @click="removeDelegate">Remove Delegate</button></span>
        </p>
        <p v-if="isDelegateFor">I am delegates for address(s) {{ delegatesFor }}</p>

        <div class="field">
          <label class="label">Set Your Delegate</label>
          <div class="columns">
            <div class="column is-5">
              <input class="input" type="text" v-model="newDelegate" placeholder="New Delegate Address">
            </div>
            <div class="column">

              <button class="button is-link" @click="setDelegate(newDelegate)">Submit</button>
            </div>
          </div>
        </div>

        <div v-if="this.$store.state.pendingUpdates" class="content has-text-primary">
          <img src="/static/transaction-loading.svg" alt="loading">
          <p class="has-text-warning has-text-weight-bold">Updating Delegates.....</p>
        </div>
      </div>

      <div class="content">
        <h3 style="margin-top:50px;">User Transactions</h3>
        <table v-if="hasTransactions" class="table is-fullwidth">
          <thead>
            <tr>
              <th>Block #</th>
              <th>Event</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            <TransactionFeed v-for="transaction in this.$store.state.transactions" :transaction="transaction" :key="transaction.id" />
          </tbody>
        </table>
        <p v-else>Nothing yet!</p>
      </div>
    </div>
    <div v-else class="container">
      <article class="message is-danger">
        <div class="message-header">
          <p>Whoops</p>
        </div>
        <div class="message-body">
          To retrieve your profile details, you would need to sign into your Rinkeby Ethereum account using apps such as <a href="https://metamask.io/" target="_blank">Metamask</a> first!
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import TransactionFeed from './TransactionFeed.vue'
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  components: { TransactionFeed },
  data () {
    return {
      loading: true,
      inputAddress: null,
      fetchedDelegate: 'None yet!',
      newDelegate: null
    }
  },

  computed: {
    hasTransactions() {
      return (this.$store.state.transactions.length > 0)
    },

    userSignedIn() {
      return (this.$store.state.web3.isInjected && (this.$store.state.web3.networkId == 4) && this.$store.state.web3.coinbase)
    },

    delegatesFor() {
      let addedAsDelegate = {}
      let removedAsDelegate = {}

      let asDelegates = []
      // get all events added as delegate
      this.$store.state.transactions.forEach((transaction) => {
        let delegate = transaction.returnValues.delegate
        let signer = transaction.returnValues.signer

        if ((transaction.event == 'Authorized') && (delegate.toLowerCase() == this.$store.state.web3.coinbase.toLowerCase())) {
          if (typeof addedAsDelegate[signer] == 'undefined') {
            addedAsDelegate[signer] = 1
          } else {
            addedAsDelegate[signer] ++
          }

        // get all events removed as delegate
        } else if ((transaction.event == 'Deauthorized') && (delegate.toLowerCase() == this.$store.state.web3.coinbase.toLowerCase())) {
          if (typeof removedAsDelegate[signer] == 'undefined') {
            removedAsDelegate[signer] = 1
          } else {
            removedAsDelegate[signer] ++
          }
        }
      })

      // remove the entries approriatly, in case a person is added and removed as delegate multiple times, we need to calculate if they are still delegate by tally up the times

      Object.entries(addedAsDelegate).forEach(
        ([key, count]) => {
          if (typeof removedAsDelegate[key] !== 'undefined') {
            if ((count - removedAsDelegate[key]) > 0) {
              asDelegates.push(key)
            }
          } else {
            asDelegates.push(key)
          }
        }
      );

      return (asDelegates.join(' ,'))

    },
    ...mapState([
      'delegateAddress'
    ]),

    hasDelegate() {
      return (this.delegateAddress != "0x0000000000000000000000000000000000000000")
    },
    isDelegateFor() {
      return (this.hasTransactions && (this.delegatesFor !== ''))
    }
  },

  methods: {
    async getDelegate () {
      this.fetchedDelegate = await this.$store.dispatch('getDelegate', this.inputAddress)
    },

    setDelegate () {
      this.$store.dispatch('setDelegate')
      this.$store.state.pendingUpdates = true
    },

    removeDelegate () {
      this.$store.dispatch('removeDelegate')
      this.$store.state.pendingUpdates = true
    }
  },


  mounted() {
    this.$parent.navClass = 'navbar is-spaced has-shadow'
    this.$parent.logoSrc = '/static/etherSignText.svg'

    this.$store.state.transactions = []
    if (this.$store.state.web3.isInjected && this.$store.state.web3.coinbase) {
      this.$store.dispatch('getDelegate')
      this.$store.dispatch('getUserEvents')
    }
  }
}
</script>
