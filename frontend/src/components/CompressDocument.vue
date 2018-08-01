<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <label class="label">Enter Document To Be Compressed Below</label>
        <div class="control">
          <textarea v-model="uncompressedInput" class="textarea" placeholder="10 lines of textarea" rows="10"></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link" @click="compressInput">Compress</button>
        </div>
      </div>

      <div class="content">
        <h3>Compressed Output</h3>
        <blockquote style="overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;">{{ this.compressedOutput }}</blockquote>
      </div>
    </div>

    <div class="column">
      <div class="field">
        <label class="label">Enter Code to Decompress</label>
        <div class="control">
          <textarea v-model="compressedInput" class="textarea" placeholder="10 lines of textarea" rows="10"></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link" @click="decompressInput">Decompress</button>
        </div>
      </div>

      <div class="content">
        <h3>Decompressed Output</h3>
        <blockquote>{{ this.decompressedOutput }}</blockquote>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'CompressDocument',
  data () {
    return {
      uncompressedInput: null,
      compressedOutput: null,
      compressedInput: null,
      decompressedOutput: null
    }
  },

  methods: {
    compressInput() {

      LZMA.compress(this.uncompressedInput, 9, (result, error) => {
        // do stuff with output
        if (error) console.error(error);
        var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));
        this.compressedOutput = base64String
      })
    },

    decompressInput() {
      // convert base64 string back to array
      var raw = window.atob(this.compressedInput)
      var rawLength = raw.length
      var array = new Uint8Array(new ArrayBuffer(rawLength))

      for(var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }

      LZMA.decompress(array, (result, error) => {
        if (!(typeof result === 'string')) result = new Uint8Array(result)
        if (error) console.error(error);
        this.decompressedOutput = result
      });
    }
  }
}
</script>