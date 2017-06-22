<template>
  <div class="loading" v-if="isLoading">
    <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
    <span class="sr-only">Loading...</span>
  </div>

  <div class="error" v-else-if="error">
    {{ error }}
  </div>
  <transition name="slide-fade" mode="in-out" v-else-if="movie">
  <div class="card movie">
    <div class="card-img-left">
      <img :src="movie.poster" alt="Poster">
    </div>
    <div class="card-block d-flex flex-column" style="min-height:100%;">
      <div class="d-flex justify-content-between">
        <h4 class="card-title">{{movie.title}}</h4>
        <h4 class="card-title"><span class="badge badge-default">{{movie.rated}}</span></h4>
      </div>
      <h6 class="card-subtitle mb-3 text-muted">{{movie.genres}}</h6>
      <p class="card-text">{{movie.plot}}</p>
      <div class="card-text" style="flex:1;">
        <strong>Director:</strong> {{movie.director}}<br>
        <strong>Writer:</strong> {{movie.director}}<br>
        <strong>Stars:</strong> {{movie.actors}}
      </div>
      <div class="d-flex justify-content-start mt-4 ">
        <div>Released on {{movie.released | mediumDate}}</div>
        <div class="ml-4">Runtime {{movie.runtime}}</div>
        <div class="mr-2" style="flex: 1; text-align: right;">
          <span
            class="fa text-danger"
            :class="isFavourite ? 'fa-heart' : 'fa-heart-o'"
            @click="toggleFavourite(movie.id)"
          ></span>
        </div>
      </div>
      <div class="row" style="margin-top: 3rem;">
        <div class="col">
          <router-link
            :to="{ name: 'Movie', params: { movieId: movie.id - 1 } }"
            class="btn btn-outline-primary btn-block"
            v-if="movie.id !== 1"
          >
            Previous
          </router-link>
        </div>
        <div class="col">
          <router-link
            :to="{ name: 'Movie', params: { movieId: movie.id + 1 } }"
            class="btn btn-outline-primary btn-block"
            v-if="movie.id !== maxId"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import FavouriteList from '@/services/FavouriteList'
import MovieDb from '@/services/MovieDb'

export default {
  props: ['movieId'],
  data () {
    return {
      isLoading: false,
      isFavourite: null,
      maxId: null,
      movie: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  computed: {
    // movieId () { return parseInt(this.$route.params.movieId) }
  },
  filters: {
    mediumDate (date) {
      return (new Date(date)).toDateString()
    }
  },
  watch: {
    // we need to call the method again if the route changes because movie
    // is not a computed property which would automatically get a watcher
    'movieId': 'fetchData'
  },
  methods: {
    async fetchData () {
      this.error = this.movie = null
      this.isLoading = true

      try {
        this.movie = await MovieDb.getMovie(this.movieId)
        if (!this.movie) {
          this.$router.push({name: 'Home'})
        }
      } catch (error) {
        this.error = error.message
      }

      this.isFavourite = FavouriteList.has(this.movieId)
      this.maxId = await MovieDb.getMaxId()
      this.isLoading = false
    },

    toggleFavourite () {
      this.isFavourite
        ? FavouriteList.remove(this.movieId)
        : FavouriteList.add(this.movieId)

      this.isFavourite = !this.isFavourite
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.loading {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.card.movie {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  max-width: 56rem;
  border-bottom: rgba(0,0,0,0.12);
  -webkit-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);

  .card-img-left {
    width: 19rem;
    height: inherit;
    background-color: #000000;
    flex: 1 0 auto
  }

  .card-img-left,
  .card-img-left img {
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
  }
}
.card.movie > .card-img-left > img {
  width: 100%;
  height: auto;
}
</style>
