<template>
  <div>
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-three-fifths">
              <h1 class="title intro-title">Document Signing<br />On the Blockchain
              </h1>
              <h2 class="subtitle">
                EtherSign offers an easy interface<br />to <span class="has-text-orange has-text-weight-semibold">Create</span>, <span class="has-text-warning has-text-weight-semibold">Store</span> and <span class="has-text-pink has-text-weight-semibold">Sign</span> documents<br /><span class="text-underline">Securely</span> and <span class="text-underline">Cost-Effectively</span><br /> on the Ethereum blockchain.
              </h2>
              <a href="/#/create-document" class="button right-margin is-primary is-inverted is-outlined">
                <span class="icon">
                  <b-icon icon="file-document"></b-icon>
                </span>
                <span>Create A Document</span>
              </a>
              <a href="/#/about" class="button is-success is-inverted is-outlined">
                <span class="icon">
                  <b-icon icon="magnify"></b-icon>
                </span>
                <span>How It Works</span>
              </a>
            </div>

            <div class="column">
              <figure class="image about-image">
                <img src="/static/banner-image.png" alt="doc signing">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="medium-spacing has-background-light use-cases">
      <div class="container">
        <div class="content">
          <h2 class="title intro-title has-text-centered">Helpful for Everyday Use, Now</h2>
          <div class="columns">
            <div class="column">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="subtitle is-6">User Case #1</p>
                      <p class="title is-4"><a href="/#/view?q=loveLetter&id=1">Love Letter</a></p>
                    </div>
                  </div>

                  <div class="content">
                    See the passionate love letter Napolean sent his lover Josephine, even amidst intense warfare.
                  </div>
                </div>
                <div class="card-image">
                  <figure class="image is-4by3">
                    <a href="/#/view?q=loveLetter&id=1"><img src="/static/love-poem.svg" alt="Placeholder image"></a>
                  </figure>
                </div>
              </div>
            </div>

            <div class="column">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="subtitle is-6">User Case #2</p>
                      <p class="title is-4"><a href="/#/view?q=declarationOfIndependence&id=2">Declaration of Independence</a></p>
                    </div>
                  </div>

                  <div class="content">
                    A blueprint on how to declare your independent nation on the blockchain, take notes!
                  </div>
                </div>

                <div class="card-image">
                  <figure class="image is-4by3">
                    <a href="/#/view?q=declarationOfIndependence&id=2"><img src="/static/declaration.svg" alt="Placeholder image"></a>
                  </figure>
                </div>
              </div>
            </div>

            <div class="column">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="subtitle is-6">User Case #3</p>
                      <p class="title is-4"><a href="/#/view?q=landDeed&id=3">Land Deed</a></p>
                    </div>
                  </div>

                  <div class="content">
                    Whether it is the sale of an apartment, a building, or an entire office park complex, we got your covered.
                  </div>
                </div>
                <div class="card-image">
                  <figure class="image is-4by3">
                    <a href="/#/view?q=landDeed&id=3"><img src="/static/land-deed.svg" alt="Placeholder image"></a>
                  </figure>
                </div>
              </div>
            </div>

            <div class="column">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="subtitle is-6">User Case #4</p>
                      <p class="title is-4"><a href="/#/view?q=prenuptialAgreement&id=4">(Any) Contract</a></p>
                    </div>
                  </div>

                  <div class="content">
                    From land sale to prenuptial agreement, EtherSign is appropriate for any legal document signing.
                  </div>
                </div>
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="/static/contract.svg" alt="Placeholder image">
                  </figure>
                </div>
              </div>
            </div>
          </div>

          <div class="content has-text-centered" style="margin-top:3rem;">
            <a href="/#/create-document" class="button is-medium is-danger is-outlined">
              <span class="icon">
                <b-icon icon="marker"></b-icon>
              </span>
              <span>Start Your Awesome Document</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="medium-spacing features">
      <div class="container">
        <div class="content">
          <h2 class="title intro-title has-text-centered">Incredible Features</h2>
          <div class="columns">
            <div class="column">
              <img class="img-center" src="/static/security.svg" alt="security">
              <h4 class="title">Secure</h4>
              <p>Powered by the <b>Ethereum blockchain</b>, our document storage is incredibly secure and tamper-proof. No one else can sign documents on your behalf unless you have authorized him/her to do so.</p>
            </div>
            <div class="column">
              <img class="img-center" src="/static/tumbler.svg" alt="flexible">
              <h4 class="title">Flexible</h4>
              <p>We understand unexpected situations arise. To provide maximum flexibility, we allow our users to <b>designate a trusted individual</b> to sign documents on their behalf. Delegate your tasks as you see fit.</p>
            </div>
          </div>
          <div class="columns medium-spacing-top">
            <div class="column">
              <img class="img-center" src="/static/wallet.svg" alt="wallet">
              <h4 class="title">Low Cost</h4>
              <p>Compared to other storage options for the Ethereum blockchain, EtherSign is incredibly cost-efficient for large document storage. A one-page document on average cost <b>less than 1 cent</b> to store and sign.</p>
            </div>
            <div class="column">
              <img class="img-center" src="/static/distributed.svg" alt="highly accessible">
              <h4 class="title">Highly Accessible</h4>
              <p>Documents signed via EtherSign will live as long as the Ethereum blockchain exists. The documents and related data such as signers and timestamps can be retrieved <b>in milliseconds</b>.</p>
            </div>
          </div>

          <div class="content has-text-centered" style="margin-top:4rem;">
            <a href="/#/create-document" class="button is-medium is-primary is-outlined">
              <span class="icon">
                <b-icon icon="rocket"></b-icon>
              </span>
              <span>Start Your Awesome Document</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },

  mounted() {
    this.$parent.navClass = 'navbar is-spaced is-primary'
    this.$parent.logoSrc = '/static/etherSignWhite.svg'
  }
}

</script>