<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="card article" v-if="blogData !== null">
         <div class="card-content">
             <div class="media">
                 <div class="media-content has-text-centered">
                     <p class="title article-title">{{ blogData.title }}</p>
                     <p class="subtitle">{{ blogData.subtitle }}</p>
                     <figure>
                       <img v-bind:src="mediaURI">
                     </figure>
                 </div>
             </div>
             <div class="content article-body">
               {{ blogData.content }}
             </div>
         </div>
     </div>
     <div container style="margin: 10px">
       <a disabled class="button is-info" v-if="this.readerIsLoggedIn === false && writerIsLoggedIn === false">Add comment</a>

       <b-collapse :open="false">
        <button class="button is-info" slot="trigger" v-if="this.readerIsLoggedIn === true || writerIsLoggedIn === true">Add comment</button>
         <div class="notification">
           <div class="content">

             <b-field label="Comment">
               <b-input placeholder="Say something nice" maxlength="30" minlength="1" v-model="commentContent"></b-input>
             </b-field>

             <a class="button is-success">
               <span @click="comment()">Publish Comment</span>
             </a>

           </div>
         </div>
       </b-collapse>

       <div v-if="blogData !== null">
         <article class="box" v-for="(commentOnBlog, index) in blogData.comments" v-bind:key="index">
           <h1 class="title is-4"> {{ commentOnBlog.owner }}</h1>
           <h1 class="subtitle is-3"> {{ commentOnBlog.content }}</h1>
         </article>
       </div>
     </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      blogData: null,
      commentContent: null,
    };
  },
  created() {
    this.getBlogById();
  },
  computed: {
    ...mapState([ 'username', 'readerIsLoggedIn', 'writerIsLoggedIn' ]),
      mediaURI: function () {
        return this.blogData.mediaURI;
      },
  },
  components: {
    Navbar,
  },
  methods: {
    getBlogById() {
      axios.get(`http://localhost:3000/blogs/${this.$route.params.id}`)
      .then((response) => {
        this.blogData = response.data;
      })
    },
    comment() {
      if (this.commentContent.length <= 0) {
        this.$toast.open({
          duration: 2500,
          message: 'Oops. something went wrong. Please try again',
          position: 'is-top',
          type: 'is-danger'
        });
      } else {
        this.blogData.comments.push({
          owner: this.username,
          content: this.commentContent,
        })
        axios.put(`http://localhost:3000/blogs/${this.$route.params.id}`, {
          title: this.blogData.title,
          subtitle: this.blogData.subtitle,
          content: this.blogData.content,
          mediaURI: this.blogData.mediaURI,
          comments: this.blogData.comments,
        }, {
          'headers' : {
            'token' : localStorage.token,
          }
        })
        .then(() => {
          this.$toast.open({
            duration: 2500,
            message: 'Successfully added comment',
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
      }
    },
  }
}
</script>

<style lang="css">
</style>
