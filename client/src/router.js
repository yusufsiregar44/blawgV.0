import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Writer from './views/Writer.vue'
import Blog from './views/Blog.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/writer',
      name: 'writer',
      component: Writer,
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
    }
  ]
})
