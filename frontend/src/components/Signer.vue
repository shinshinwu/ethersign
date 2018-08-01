<template>
  <div class="content">
    <h3>Signatures</h3>
    <p>This document has been signed by {{ signers }}</p>

    <div v-if="transactionPending" class="content has-text-centered">
      <img src="/static/cutie-fox-spinner.svg" alt="loading transaction" class="img-center">
      <p class="has-text-warning has-text-weight-bold" style="margin-top:20px">Your transaction is being processed right now! Once it has been mined, the updates will be reflected here.</p>
    </div>

    <div v-else-if="signingEligible">
      <hr>
      <h3>Add Your Signature</h3>
      <div class="columns">
        <div class="column">
          <div class="field">
            <div class="control">
              <input class="input" type="text" v-model="signerAddress" placeholder="Enter Signer ETH Address">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <div class="control">
              <button class="button is-link" @click="addSigner">Add Your Signature</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showTransactions">
      <hr>
      <h3>Document Transactions</h3>
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Block #</th>
              <th>Event</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            <TransactionFeed v-if="(signers.length > 1)" v-for="transaction in this.$store.state.document.additionalSigners" :transaction="transaction" :key="transaction.id" />
            <TransactionFeed :transaction="this.$store.state.document" :key="this.$store.state.document.returnValues.documentId" />
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import TransactionFeed from './TransactionFeed.vue'

export default {
  name: 'Signer',
  components: { TransactionFeed },
  data () {
    return {
      signerAddress: this.$store.state.web3.coinbase,
      addedSignature: false
    }
  },

  computed: {
    signers() {
      var signers = [this.$store.state.document.returnValues.signer.toLowerCase()]

      this.$store.state.document.additionalSigners.forEach(function(signerEvent) {
        signers.push(signerEvent.returnValues.signer.toLowerCase())
      })

      return (signers.join(', '))
    },

    signingEligible() {
      if (this.$store.state.web3.coinbase == null) {
        return false
      } else {
        return (this.signers.indexOf(this.$store.state.web3.coinbase.toLowerCase()) == -1)
      }
    },

    showTransactions() {
      return (this.$store.state.document !== null)
    },

    transactionPending() {
      if (this.addedSignature && this.signingEligible) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    addSigner() {
      this.$store.dispatch('addSigner', this.signerAddress)
      this.addedSignature = true
    }
  }

}
</script>