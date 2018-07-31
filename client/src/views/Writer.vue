<template lang="html">
  <div class="writer">
    <Navbar></Navbar>
     
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState([ 'writerIsLoggedIn' ]),
  },
  methods: {
    checkIsLoggedIn() {
      if (this.writerIsLoggedIn !== true) {
        this.$router.push({
          name: 'home',
          query: {
            redirect: '/'
          }
        })
      }
    }
  },
  created() {
    this.checkIsLoggedIn();
  },
}
</script>

<style lang="css">
</style>
