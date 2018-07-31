<template>
<form action="">
  <div class="modal-card" style="width: 500px">
    <header class="modal-card-head">
      <p class="modal-card-title">Register</p>
    </header>
    <section class="modal-card-body">

      <NameField @input="updateName"></NameField>

      <EmailField @input="updateEmail"></EmailField>

      <PasswordField @input="updatePassword"></PasswordField>

    </section>
    <footer class="modal-card-foot">
      <div class="container">
        <button class="button is-success" @click="registerUser()">Register</button>
      </div>
    </footer>
  </div>
</form>
</template>

<script>
import EmailField from '../components/EmailField.vue';
import PasswordField from '../components/PasswordField.vue';
import NameField from '../components/NameField.vue';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  components: {
    EmailField,
    PasswordField,
    NameField,
  },
  methods: {
    ...mapActions([ 'register' ]),
    updateEmail(e) {
      this.email = e;
    },
    updatePassword(e) {
      this.password = e;
    },
    updateName(e) {
      this.name = e;
    },
    registerUser() {
      if (this.password.length < 8) {
        this.$toast.open({
          duration: 2500,
          message: 'Oops. something went wrong. Password length must be at least 8 characters',
          position: 'is-top',
          type: 'is-danger'
        });
      } else {
        this.register({name: this.name, email: this.email, password: this.password})
        .then(() => {
          this.$toast.open({
            duration: 2500,
            message: 'Successfully registered',
            position: 'is-top',
            type: 'is-success'
          });
          this.$parent.close();
        })
        .catch(() => {
          this.$toast.open({
            duration: 2500,
            message: 'Oops. something went wrong. Please use another username/email/password.',
            position: 'is-top',
            type: 'is-danger'
          });
        })
      }
    },
  },
}
</script>
