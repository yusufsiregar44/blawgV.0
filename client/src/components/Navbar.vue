<template lang="html">
  <nav class="navbar is-transparent">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item">
          <i class="fab fa-pied-piper-pp" style="font-size:37px; margin-right:10px; color:#363636"></i>
          <h1 class="title">blawgV.0</h1>
        </a>
        <span class="navbar-burger burger" data-target="navbarMenuHeroB">
            <span></span>
        <span></span>
        <span></span>
        </span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item">
            <a class="button is-inverted" @click="isLoginModalActive = true">
              <span class="icon">
                <i class="fas fa-sign-in-alt"></i>
              </span>
              <span>Login</span>
            </a>

            <b-modal :active.sync="isLoginModalActive" has-modal-card>
              <LoginModal></LoginModal>
            </b-modal>

            <p style="margin-right: 10px; margin-left: 10px;">or</p>

            <a class="button is-inverted" @click="isRegisterModalActive = true;">
              <span class="icon">
                <i class="fas fa-registered"></i>
              </span>
              <span>Register</span>
            </a>

            <b-modal :active.sync="isRegisterModalActive" has-modal-card>
              <RegisterModal></RegisterModal>
            </b-modal>
          </a>

            <!-- <a class="button is-inverted" @click="logout()" v-if="userLoggedIn === true">
              <span class="icon">
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <span>Admin Logout</span>
            </a> -->

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import { mapState } from 'vuex';
// import { mapActions } from 'vuex';
import RegisterModal from '../components/RegisterModal.vue'
import LoginModal from '../components/LoginModal.vue'


export default {

  components: {
    RegisterModal,
    LoginModal,
  },
  data() {
    return {
      email: '',
      password: '',
      isRegisterModalActive: false,
      isLoginModalActive: false,
    };
  },
  computed: {
    // ...mapState([ 'cartArr', 'adminIsLoggedIn' ])
  },
  methods: {
    // ...mapActions([ 'adminLogIn', 'adminLogOut' ]),
    // login() {
    //   this.adminLogIn({email: this.email, pass: this.password})
    //   .catch(() => {
    //     // eslint-disable-next-line
    //     this.$toast.open({
    //       duration: 1000,
    //       message: 'Kindly enter a valid email/password',
    //       position: 'is-top',
    //       type: 'is-danger'
    //     });
    //   });
    // },
    // logout() {
    //   this.adminLogOut()
    //   .then(() => {
    //     this.$toast.open({
    //       duration: 1000,
    //       message: 'Successfully logged out',
    //       position: 'is-top',
    //       type: 'is-success'
    //     });
    //     this.$router.push({ name: 'home', query: { redirect: '/' } })
    //   })
    //   .catch(() => {
    //     this.$toast.open({
    //       duration: 1000,
    //       message: 'Oops. something went wrong. Pleas try again.',
    //       position: 'is-top',
    //       type: 'is-danger'
    //     });
      // })
  //   },
  //   updateEmail(e) {
  //     this.email = e;
  //   },
  //   updatePassword(e) {
  //     this.password = e;
  //   },
  },
}
</script>

<style lang="css">
</style>
