<template lang="html">
    <div class="card" style="margin: 20px">
      <div class="card-content">
        <figure>
          <img v-bind:src="mediaURI">
        </figure>
        <p class="title">{{ blog.title }}</p>
        <p class="subtitle is-6">{{ blog.subtitle }}</p>
      </div>
      <a class="button" style="margin: 10px">
      <router-link :to="`/blog/${blog._id}`">
          See full post
      </router-link>
    </a>
    </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  computed: {
    mediaURI: function () {
      return this.blog.mediaURI;
    }
  },
  props: ['blog'],
  components: {

  },
}
</script>
