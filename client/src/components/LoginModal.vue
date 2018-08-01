<template lang="html">
  <form action="">
    <div class="modal-card" style="width: 500px">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">

        <EmailField @input="updateEmail"></EmailField>

        <PasswordField @input="updatePassword"></PasswordField>

      </section>
      <footer class="modal-card-foot">
        <div class="container">
          <button class="button is-success" @click="loginUser">Login</button>
        </div>
      </footer>
    </div>
  </form>

</template>

<script>
import EmailField from '../components/EmailField.vue';
import PasswordField from '../components/PasswordField.vue';
import { mapActions } from 'vuex';
import axios from 'axios'

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  components: {
    EmailField,
    PasswordField,
  },
  methods: {
    ...mapActions([ 'decodeToken' ]),
    updateEmail(e) {
      this.email = e;
    },
    updatePassword(e) {
      this.password = e;
    },
    loginUser() {
      axios.post(`http://35.240.188.49/users/login`, {
         email: this.email,
         password: this.password,
       }).then((response) => {
         localStorage.token = response.data;
         axios.get(`http://35.240.188.49/authentication`, {
           'headers': {
             'token': localStorage.token,
           } ,
         })
         .then((decoded) => {
          this.$store.commit('assignUsername', decoded.data.name)
          this.$store.commit('assignUserID', decoded.data._id)
           if (decoded.data.role === 'writer') {
             this.$store.commit('assignWriterIsLoggedIn', true)
             this.$router.push({
               name: 'writer',
               query: {
                 redirect: '/writer'
               }
             })
           } else {
             this.$store.commit('assignReaderIsLoggedIn', true)
           }
           this.$toast.open({
             duration: 2500,
             message: 'Successfully logged in',
             position: 'is-top',
             type: 'is-success'
           });
           this.$parent.close();
         })
         .catch((err) => {
          // eslint-disable-next-line
           console.log(err);
           this.$toast.open({
             duration: 2500,
             message: 'Oops. something went wrong. Please try again',
             position: 'is-top',
             type: 'is-danger'
           });
         })
       })
       .catch((err) => {
         // eslint-disable-next-line
          console.log(err);
          this.$toast.open({
            duration: 2500,
            message: 'Oops. something went wrong. Please enter a valid email/password',
            position: 'is-top',
            type: 'is-danger'
          });
       })
    }
  }
}
</script>

<style lang="css">
</style>
