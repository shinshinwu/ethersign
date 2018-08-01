<template>
  <div id="app">
    <nav :class="navClass">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item logo-img" href="/">
            <img :src="logoSrc" alt="EtherSign: Document Signing on the Blockchain">
          </a>
          <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" id="navMenu">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">
              <span class="icon has-text-info">
                <b-icon icon="rocket"></b-icon>
              </span>
              <span>Home</span>
            </router-link>

            <router-link to="/profile" class="navbar-item">
              <span class="icon has-text-danger">
                <b-icon icon="heart" size="is-small"></b-icon>
              </span>
              <span>Profile</span>
            </router-link>

            <router-link to="/create-document" class="navbar-item">
              <span class="icon has-text-success">
                <b-icon icon="file-document" size="is-small"></b-icon>
              </span>
              <span>Create Doc</span>
            </router-link>

            <router-link to="/about" class="navbar-item">
              <span class="icon has-text-warning">
                <b-icon icon="crown" size="is-small"></b-icon>
              </span>
              <span>About</span>
            </router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="bd-tw-button button twitter-btn" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=EtherSign is the modern document signing technology for the blockchain&amp;hashtags=EtherSign&amp;url=https://ethersign.surge.sh&amp;via=cakeisnotreal">
                    <b-icon icon="twitter"></b-icon>
                    <span>
                      Tweet
                    </span>
                  </a>
                </p>
                <p class="control">
                  <a class="button" href="https://github.com/jgthms/bulma/releases/download/0.7.1/bulma-0.7.1.zip">
                    <b-icon icon="github-circle"></b-icon>
                    <span>Github</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>


    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>EtherSign</strong> by <a href="https://github.com/shinshinwu" target="_blank">Anna Wu</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
        <p>
          <a href="https://bulma.io">
            <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24">
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      navClass: "navbar has-shadow is-spaced",
      logoSrc: '/static/etherSignText.svg'
    }
  },

  beforeCreate () {
    this.$store.dispatch('registerWeb3').then(() => {
      this.$store.dispatch('getContractInstance')
    }).then(() => {
      this.loading = false
    })
  },

  mounted() {
    // some vanilla js for the hamburger menu toggle for mobile device
    document.addEventListener('DOMContentLoaded', () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
          el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

          });
        });
      }
    });
  }
}
</script>

