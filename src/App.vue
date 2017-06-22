<template>
  <div id="app" class="app">
    <div class="app-header">
      <a href="/">MovieBase</a>
    </div>
    <div class="row no-gutters" style="flex:1;" >
      <div class="col-12 col-lg-4">
        <movie-list :movies="listData" />
      </div>
      <div class="col">
        <div class="movie-details">
          <!-- A fallback message to display in case we cannot access our data source. -->
          <div class="p-3" v-if="errorMsg">{{ errorMsg }}</div>

          <transition name="slide-fade" mode="out-in" v-else>
            <router-view></router-view>
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieDb from '@/services/MovieDb'
import MovieList from '@/components/MovieList'

export default {
  name: 'app',
  components: {
    MovieList
  },
  data () {
    return {
      errorMsg: null,
      isLoading: false,
      listData: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.errorMsg = null
      this.isLoading = true
      this.listData = []

      try {
        this.listData = await MovieDb.getMovieList()
        if (!this.listData.length) {
          this.errorMsg = 'Sorry, there are no movie titles available. Please try again later.'
        }
      } catch (error) {
        this.errorMsg = error.message
      }

      this.isLoading = false
    }
  }
}
</script>

<style>
/****************************************************************
 *  This is the css for the main layout - App component template.
 *  The css for individual components are stored and imported
 *  with those components.
 ****************************************************************/
html { height: 100%; }
body {
  background-color: rgba(0,0,0,0.05);
  color: rgba(0,0,0,0.87);
  height: 100%;
  min-height: 100%;
}
.app {
  display: flex;
  flex-flow: column;
  overflow: hidden;
  height: 100%;
  min-height: 100%;
}
.app-header {
  height: 4rem;
  background-color: #0277BD;
  background-color: #1E88E5;
  color: rgba(255,255,255,.6);
  text-align: center;
  font-size: 2rem;
  line-height: 4rem;
  border-bottom: rgba(0,0,0,0.12);
  -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.25);
}
.app-header a { text-decoration: none; color: rgba(255,255,255,.6); }
.movie-details {
  padding: 2rem 2rem;
  overflow: hidden;
}

/***************************************************
 *                  Animation
 ***************************************************/
.slide-fade-enter-active {
  transition: all .7s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(500px);
  opacity: 0;
}
</style>
