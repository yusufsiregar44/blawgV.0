<template lang="html">
  <b-field label="Username">
      <b-input
          type="text"
          placeholder="Your username"
          required
          @input="handleInput"
          v-model="content">
      </b-input>
  </b-field>
</template>

<script>
export default {
  prop: ['value'],
  data() {
    return {
      content: ''
    };
  },
  watch: {
    value: function (n) {
      this.content = n;
    }
  },
  methods: {
    handleInput () {
      this.$emit('input', this.content)
    }
  }
}
</script>
