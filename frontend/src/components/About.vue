<template>
  <section class="section">
    <div class="container">
      <div class="content">
        <h2>The Technology</h2>
        <hr>
        <p>EtherSign is built with <a href="http://vuejs.org/" target="_blank">Vue</a>, <a href="https://ethereum.org" target="_blank">Solidity</a>, <a href="https://buefy.github.io/" target="_blank">Beufy</a> / <a href="https://bulma.io/" target="_blank">Bulma framework</a> and is hosted on <a href="https://surge.sh/" target="_blank">Surge</a>. The entire app is static and serverless. It relies on the Ethereum blockchain for storage. Currently, the underlying contract is only deployed on the Rinkeby testnet.</p>

        <h2>Project Motivation</h2>
        <hr>
        <p>Secure document storage and signing are essential issues to solve for modern day business transactions and we have seen companies such as DocuSign and HelloSign trying to tackle these issues with traditional web app structures.</p>

        <p>However, secure information storage and user authentications are some of the top benefits the blockchain technology can provide. Shocked to see that there is currently no adequate implementation of secure document signing on the blockchain, an idea was born to build it for the Ethereum blockchain.</p>

        <h2>Implementations</h2>
        <hr>

        <p>There are a few main concerns when it comes to secure document signing on the Ethereum blockchain and EtherSign addresses them one by one:</p>

        <h6 class="subtitle is-5 has-text-grey">1. Cost</h6>
        <p>To store large document such as string can be prohibitively expensive on the Ethereum blockchain at the current state. Currently, <a href="https://ethereum.stackexchange.com/questions/872/what-is-the-cost-to-store-1kb-10kb-100kb-worth-of-data-into-the-ethereum-block" target="_blank">it cost 20k gas</a> to just store a 256 bit word - which is astronomically more expensive than other traditional web storage options.</p>

        <article class="message is-primary">
          <div class="message-body">
            To combat potential high cost, EtherSign pioneered a new and extremely cost-efficient way of storing a content heavy document by first compress the document using the <a href="https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm" target="_blank">Lempel–Ziv–Markov chain algorithm</a> which provides highly efficient lossless data compression. Then instead of storing the compressed string in EVM storage which is very costly, EtherSign opt for storing documents in events with appropriately indexed params.
          </div>
        </article>

        <h6 class="subtitle is-5 has-text-grey">2. Multiple Signatures</h6>
        <p>Often times the same document needs to be signed by multiple parties to be validated.</p>

        <article class="message is-primary">
          <div class="message-body">
            EtherSign implements a feature to allow additional signers to add their signature to an existing document by using a document ID system. This avoids storing multiple duplicates of the same document and thus increased costs.
          </div>
        </article>

        <h6 class="subtitle is-5 has-text-grey">3. Document Styling</h6>
        <p>Often times we wish to create and store documents that has been styled for the optimal reading experience. It will provide a much better experience than just reading a blob of compacted string.</p>

        <article class="message is-primary">
          <div class="message-body">
            EtherSign documents follow traditional <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">markdown styling rules</a> that provide ample room for customization. How the document was created will be how the document is viewed.
          </div>
        </article>

        <h6 class="subtitle is-5 has-text-grey">4. Signing Flexibility</h6>
        <p>In real world we often can delegate our signing power to another person in certain situations such as Power of Attorney. This should be implemented for blockchain document signing as well.</p>

        <article class="message is-primary">
          <div class="message-body">
            EtherSign allows one to designate another individual to sign documents on their behalf. That authorization can be revoked by the user at any time. Any document signed by an authorized delegate on the original signer's behalf will be marked so accordingly.
          </div>
        </article>

        <h6 class="subtitle is-5 has-text-grey">5. Emergency Stop and Upgradability</h6>
        <p>In case of catastrophic failure and bugs on the contract, the contract should be able to be stopped and upgraded.</p>

        <article class="message is-primary">
          <div class="message-body">
            EtherSign implements emergency stop pattern that allows the contract to be paused and upgraded in events of failure.
          </div>
        </article>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$parent.navClass = 'navbar is-spaced has-shadow'
    this.$parent.logoSrc = '/static/etherSignText.svg'
  }
}

</script>