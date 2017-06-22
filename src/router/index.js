import Vue from 'vue'
import Router from 'vue-router'
import Placeholder from '@/components/Placeholder'
import MovieCard from '@/components/MovieCard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Placeholder
    },
    {
      path: '/movie/:movieId',
      name: 'Movie',
      component: MovieCard,
      props: true
    }
  ]
})
