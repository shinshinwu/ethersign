<template>
  <section class="section">
    <LoginAlert />
    <div class="container">
      <div class="content">
        <h1>Create Document</h1>
        <p>You can create your document in the gray input box below. The document styling follows the <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">markdown</a> styling rules so feel free to add your sparks! You can preview your document on the right side panel.</p>
        <hr>
        <div class="columns">
          <div class="column">
            <h4 class="has-text-primary is-italic">Input</h4>
            <div class="control" id="editor">
              <textarea v-model="uncompressedInput" class="textarea" placeholder="markdown format"></textarea>
            </div>
          </div>

          <div class="column">
            <h4 class="has-text-primary is-italic">Output</h4>
            <div class="content">
              <div v-html="compiledMarkdown"></div>
            </div>
          </div>
        </div>

        <button class="button is-link is-outlined" @click="compressInput">Compress Document</button>
        <hr>
        <div class="content url-output">
          <h3>Compressed Document</h3>
          <p>*Note that for large document with very long output, broswer URL has <a href="https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers" target="_blank">character limit</a> which may prohibit the display of the page properly. In that case, you can sign the document first and share the deployed document ID with another user that way.</p>
          <div v-if="compressedOutput">
            <blockquote style="overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;">{{ this.compressedOutput }}</blockquote>
            <a :href="compressedURL" class="button is-info is-outlined" style="overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;">View Document</a>
          </div>
          <div v-else>
            <blockquote>Nothing to see here yet!</blockquote>
          </div>
        </div>
        <hr>

        <div v-if="transactionPending" class="content has-text-centered">
          <img src="/static/cutie-fox-spinner.svg" alt="loading transaction" class="img-center">
          <p class="has-text-warning has-text-weight-bold" style="margin-top:20px">Your transaction is being processed right now! Once it has been mined, the updates will be reflected here.</p>
        </div>

        <div v-else>
          <div v-if="hasDoc">
            <Signer />
          </div>

          <div v-else class="content">
            <h3>Document Signing</h3>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Document Title</label>
                  <div class="control">
                    <input class="input" type="text" v-model="title" placeholder="What is the title for your doc?">
                  </div>
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <label class="label">Signer Address</label>
                  <div class="control">
                    <input class="input" type="text" v-model="signerAddress" placeholder="ETH Address of your own or a person you have delegate power for">
                  </div>
                </div>
              </div>
            </div>

            <button v-if="userSignedIn" class="button is-danger is-outlined" @click="signDoc">Create & Sign Document</button>

            <button v-else class="button is-danger is-outlined" @click="showLoginPrompt">Create & Sign Document</button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import Signer from './Signer.vue'
import LoginAlert from './LoginAlert.vue'
import marked from 'marked'

export default {
  name: 'CreateDocument',
  components: { Signer, LoginAlert },
  data () {
    return {
      title: null,
      signerAddress: null,
      uncompressedInput: `# Hello there!
![](https://loading.io/spinners/spookyghost/index.spooky-ghost-ajax-preloader.svg)`,
      compressedOutput: null,
      submittedDoc: false
    }
  },

  computed: {
    compiledMarkdown() {
      return marked(this.uncompressedInput, { sanitize: true })
    },

    compressedURL() {
      return `/#/view?c=${this.compressedOutput}`
    },

    hasDoc() {
      return (this.$store.state.document !== null)
    },

    userSignedIn() {
      return (this.$store.state.web3.isInjected && (this.$store.state.web3.networkId == 4) && this.$store.state.web3.coinbase)
    },

    transactionPending() {
      if (this.submittedDoc && !this.hasDoc) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    compressInput() {
      var filtered = this.compiledMarkdown.replace(/[ |\t]+/g, " ").replace(/> +</g, "> <")
      LZMA.compress(filtered, 9, (result, error) => {
        // do stuff with output
        if (error) console.error(error);
        var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));
        this.compressedOutput = base64String
      })
    },

    signDoc() {
      var filtered = this.compiledMarkdown.replace(/[ |\t]+/g, " ").replace(/> +</g, "> <")
      LZMA.compress(filtered, 9, (result, error) => {
        // do stuff with output
        if (error) console.error(error);
        var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));

        var args = {title: this.title, content: base64String, signer: this.signerAddress}
        this.$store.dispatch('signDocument', args)
        this.submittedDoc = true
      })
    },

    showLoginPrompt() {
      this.$dialog.alert({
          title: 'Whoops',
          message: 'To create and/or sign document with EtherSign, you would need to first sign into your <b>Rinkeby</b> Ethereum account using apps such as <a href="https://metamask.io/" target="_blank">Metamask</a>.',
          confirmText: 'Okay',
          type: 'is-danger',
          hasIcon: true
      })
    }
  },

  mounted() {
    this.$store.state.document = null
    this.$parent.navClass = 'navbar is-spaced has-shadow'
    this.$parent.logoSrc = '/static/etherSignText.svg'
  }
}
</script>

<style scoped>

  .content>h3 {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  #editor {
    margin: 0;
    height: 100%;
    color: #333;
  }

  textarea, #editor div {
    height: 100%;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
    height: 400px;
  }

  code {
    color: #f66;
  }

  .url-output {
    margin-top: 30px;
  }
</style>