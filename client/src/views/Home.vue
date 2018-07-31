<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container">
      <BlogCard v-for="(blog, index) in allBlogs" v-bind:key="(index)" :blog="blog"></BlogCard>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogCard from '../components/BlogCard.vue'
import Navbar from '../components/Navbar.vue';
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    Navbar,
    BlogCard,
  },
  computed: {
    ...mapState([ 'allBlogs' ])
  }
}
</script>
