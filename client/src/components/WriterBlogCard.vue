<template lang="html">
  <div class="card">
    <div class="card-content">
      <p class="title">{{ blog.title }}</p>
      <p class="subtitle is-6">{{ blog.subtitle }}</p>
      <p class="subtitle is-6">{{ blog.content }}</p>
      <p class="subtitle is-6">{{ blog.mediaURI}}</p>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <a class="button is-warning" style="margin: 5px" @click="isComponentModalActive = true">
          Update
        </a>

        <b-modal :active.sync="isComponentModalActive" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: 500px">
              <header class="modal-card-head">
                <p class="modal-card-title">Update Post</p>
              </header>
              <section class="modal-card-body">
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

                <a class="button is-warning" @click="update">
                  Update
                </a>

              </section>
              <footer class="modal-card-foot">

              </footer>
            </div>
          </form>
        </b-modal>

        <a class="button is-danger" style="margin: 5px" @click="remove">
          Remove
        </a>

      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      isComponentModalActive: false,
      title: this.blog.title,
      subtitle: this.blog.subtitle,
      content: this.blog.content,
      mediaURI: this.blog.mediaURI,
    };
  },
  props: ['blog'],
  computed: {
    ...mapState([ 'userID' ]),
  },
  methods: {
    // ...mapActions([ 'removeItem', 'updateItem' ]),
    remove() {
      this.$dialog.confirm({
        title: 'Removing Post',
        message: `Are you sure you want to remove <b>${this.blog.title}</b>? This action cannot be undone.`,
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.executeRemove(),
      });
    },
    executeRemove() {
      axios.delete(`http://localhost:3000/blogs/${this.blog._id}`, {
        'headers' : {
          'token' : localStorage.token,
        }
      })
      .then(() => {
        this.$toast.open('Post deleted')
      })
      .catch(() => {
        this.$toast.open({
          duration: 1000,
          message: 'Oops. something went wrong. Pleas try again.',
          position: 'is-top',
          type: 'is-danger'
        });
      })
    },

    update() {
      axios.put(`http://localhost:3000/blogs/${this.blog._id}`, {
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
        this.isComponentModalActive = false;
        this.$toast.open('Item updated')
      })
      .catch(() => {
        this.$toast.open({
          duration: 1000,
          message: 'Oops. something went wrong. Pleas try again.',
          position: 'is-top',
          type: 'is-danger'
        });
      })
    },
  },
}
</script>

<style lang="css">
</style>
