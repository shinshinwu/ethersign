<template>
  <section class="section">
    <LoginAlert />
    <div class="container">
      <div class="content">
        <div v-if="contractLoaded" class="content">
          <div v-if="hasInput">
            <h1>View Document</h1>

            <hr>
            <a href="/#/create-document">Create New Document</a>

            <div class="output" v-html="decompressedOutput"></div>

            <Signer v-if="existingDoc" />
          </div>
        </div>

        <div v-else class="content">
          <h3>Loading...</h3>
        </div>

        <div v-if="documentError" class="content"><h3 class="has-text-danger">Sorry, document does not exist!</h3></div>
      </div>
    </div>
  </section>
</template>

<script>
import Signer from './Signer.vue'
import LoginAlert from './LoginAlert.vue'

export default {
  name: 'ViewDocument',
  components: { Signer, LoginAlert },
  data () {
    return {
      existingDoc: false,
      hasInput: false,
      decompressedOutput: null,
      documentError: false
    }
  },

  computed: {
    // there seem to be a race when this child component mounted the parent havent't finished fetching everything yet so need to wait
    contractLoaded() {
      if (this.$store.state.contractInstance !== null) {
        this.decompressInput()
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    async decompressInput() {
      // need to get rid of the # router to user native js query parser
      var sanitizedUrl = window.location.href.split('/#/').join('/')
      var params = new URL(sanitizedUrl).searchParams;
      var hash = ''

      if (params.get('id') !== null) {
        // if the url is passed a document ID, fetch it from the contract event and display
        await this.$store.dispatch('getDocument', params.get('id'))
        if (this.$store.state.document == null) {
          this.documentError = true
          return
        } else {
          hash = this.$store.state.document.returnValues.content
          this.existingDoc = true
        }
      } else if (params.get('c') !== null) {
        // if the url is passed with document content, decompress and display
        // convert base64 string back to array
        hash = decodeURIComponent(params.get('c')).split(' ').join('+')
      }

      var raw = atob(hash)
      var rawLength = raw.length
      var array = new Uint8Array(new ArrayBuffer(rawLength))

      for(var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }

      LZMA.decompress(array, (result, error) => {
        if (!(typeof result === 'string')) result = new Uint8Array(result)
        if (error) console.error(error);
        this.decompressedOutput = result
        this.hasInput = true
      });
    }
  },

  mounted() {
    this.$parent.navClass = 'navbar is-spaced has-shadow'
    this.$parent.logoSrc = '/static/etherSignText.svg'
  }
}
</script>

<style scoped>
  .output {
    padding: 30px 50px;
    border: 1px dashed #b7b7b7;
    margin: 30px 0 50px;
  }
</style>