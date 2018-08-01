<template>
  <div v-if="!userSignedIn" class="container login-alert">
    <article class="message is-danger">
      <div class="message-body">
        To create and/or sign document with EtherSign, you would need to first sign into your <b>Rinkeby</b> Ethereum account using apps such as <a href="https://metamask.io/" target="_blank">Metamask</a>.
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'LoginAlert',

  computed: {
    userSignedIn() {
      return (this.$store.state.web3.isInjected && (this.$store.state.web3.networkId == 4) && this.$store.state.web3.coinbase)
    },
  }
}
</script>

