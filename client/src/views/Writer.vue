<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="container" style="margin-top: 40px; margin-bottom: 40px">
      <section style="margin: 20px">
        <b-collapse :open="false">
          <button class="button is-success" slot="trigger">Add new post</button>
          <div class="notification">
            <div class="content">

              <b-field label="Title">
                <b-input placeholder="This will be displayed at the very top" maxlength="30" minlength="1" v-model="title"></b-input>
              </b-field>

              <b-field label="Subtitle">
                <b-input placeholder="Short explanation of your post" maxlength="50" v-model="subtitle"></b-input>
              </b-field>

              <b-field label="Content">
                <b-input placeholder="Unleash your creativity!" maxlength="400" minlength="1" type="textarea" v-model="content"></b-input>
              </b-field>

              <b-field label="Media URI">
                <b-input placeholder="Media URI"
                    v-model="mediaURI"
                    type="text"
                    minlength="0">
                </b-input>
              </b-field>

              <a class="button is-success">
                <span @click="add()">Publish Post</span>
              </a>

            </div>
          </div>
        </b-collapse>
      </section>
      <div class="columns is-multiline is-mobile">
        <div class="column is-one-quarter" v-for="(blog, index) in allBlogs" v-bind:key="index">
          <WriterBlogCard :blog="blog"></WriterBlogCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '../components/Navbar.vue';
import axios from 'axios';
import WriterBlogCard from '../components/WriterBlogCard.vue';

export default {
  data() {
    return {
      title: null,
      subtitle: null,
      content: null,
      mediaURI: null,
    };
  },
  components: {
    Navbar,
    WriterBlogCard,
  },
  computed: {
    ...mapState([ 'writerIsLoggedIn', 'userID', 'allBlogs']),
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
    },
    add() {
      axios.post(`http://localhost:3000/blogs`, {
        title: this.title,
        subtitle: this.subtitle,
        content: this.content,
        mediaURI: this.mediaURI,
        writer: this.userID,
      }, {
        'headers' : {
          'token' : localStorage.token,
        }
      })
      .then(() => {
        this.$toast.open({
          duration: 2500,
          message: 'Successfully added blog post',
          position: 'is-top',
          type: 'is-success'
        });
      })
      .catch(() => {
        this.$toast.open({
          duration: 2500,
          message: 'Oops. something went wrong. Please make sure you have filled all required fields',
          position: 'is-top',
          type: 'is-danger'
        });
      })
    },
  },
  created() {
    this.checkIsLoggedIn();
  },
}
</script>

<style lang="css">
</style>
