<template lang="html">
  <form action="">
    <div class="modal-card" style="width: 500px">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">

        <EmailField></EmailField>

        <PasswordField></PasswordField>

      </section>
      <footer class="modal-card-foot">
        <div class="container">
          <button class="button is-success">Login</button>
        </div>
      </footer>
    </div>
  </form>

</template>

<script>
import EmailField from '../components/EmailField.vue'
import PasswordField from '../components/PasswordField.vue'

export default {
  components: {
    EmailField,
    PasswordField,
  },
}
</script>

<style lang="css">
</style>
