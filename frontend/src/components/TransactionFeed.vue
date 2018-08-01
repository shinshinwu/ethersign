<template>
  <tr>
    <td><a :href="txUrl" target="_blank">{{ transaction.blockNumber }}</a></td>
    <td>{{ transaction.event | addStringSpace }}</td>
    <td>
      <span v-if="documentSigning">
        <a :href="documentUrl">{{ transaction.returnValues.title }}</a> was signed by <a :href="signerUrl" target="_blank">{{ transaction.returnValues.signer }}</a> on {{ transaction.returnValues.time | utcToDateTime }}
        <span v-if="fromDelegate">(from delegate <a :href="delegateUrl" target="_blank">{{ transaction.returnValues.delegate }}</a>)</span>
      </span>

      <span v-else-if="addedSigner">
        Document has a new signature from <a :href="signerUrl" target="_blank">{{ transaction.returnValues.signer }}</a> on {{ transaction.returnValues.time | utcToDateTime }}
        <span v-if="fromDelegate">(from delegate <a :href="delegateUrl" target="_blank">{{ transaction.returnValues.delegate }}</a>)</span>
      </span>

      <span v-else>
        <span v-if="actedAsDelegate">
          {{ transaction.event | addStringSpace }} as delegate by <a :href="delegateUrl" target="_blank">{{ transaction.returnValues.delegate }}</a>
        </span>

        <span v-else>
          {{ transaction.event | addStringSpace }} <a :href="delegateUrl" target="_blank">{{ transaction.returnValues.delegate }}</a> as delegate
        </span>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TransactionFeed',
  props: ['transaction'],

  filters: {
    utcToDateTime: function (utc) {
      return (new Date(utc*1000)).toLocaleString()
    },
    addStringSpace: function (string) {
      return (string.replace(/([A-Z])/g, ' $1').trim())
    }
  },

  computed: {
    delegateUrl() {
      return `https://rinkeby.etherscan.io/address/${this.transaction.returnValues.delegate}`
    },

    signerUrl() {
      return `https://rinkeby.etherscan.io/address/${this.transaction.returnValues.signer}`
    },

    txUrl() {
      return `https://rinkeby.etherscan.io/tx/${this.transaction.transactionHash}`
    },
    documentSigning() {
      return (this.transaction.event == 'DocumentSigned')
    },
    addedSigner() {
      return (this.transaction.event == 'SignerAdded')
    },
    documentUrl() {
      return `/#/view?id=${this.transaction.returnValues.documentId}`
    },
    fromDelegate() {
      return (this.transaction.returnValues.delegate !== '0x0000000000000000000000000000000000000000')
    },
    actedAsDelegate() {
      return (this.transaction.returnValues.signer.toLowerCase() !== this.$store.state.web3.coinbase.toLowerCase())
    }
  }
}
</script>