<template>
  <div class="movie-list d-flex flex-column">
    <div class="header">
      <h3 class="mb-4">Movie titles</h3>
      <form class="form" @submit.prevent>
        <div class="form-group">
          <div class="input-group">
            <input type="text"
                   class="form-control"
                   placeholder="Search"
                   v-model.trim="searchQuery"
            >
            <span class="input-group-addon fa fa-search"></span>
          </div>
        </div>
        <div class="form-group">
          <select class="form-control" v-model="genre">
            <option value="">-- {{genre ? 'show all' : 'filter by genre'}} --</option>
            <option v-for="genreOption in genres" :value="genreOption">
              {{ genreOption }}
            </option>
          </select>
        </div>
      </form>
    </div>
    <!-- The resulting list of movie titles based on the filter criteria -->
    <div class="nav-container">
      <list-transition class="list-group" tag="nav">
        <movie-list-item v-for="movie in filteredList" :item="movie" :key="movie.id" />
      </list-transition>
    </div>
    <div class="list-footer">
      <div>MTM-6430 / S17</div>
      <div>Prof. Robert McKenney</div>
    </div>
  </div>
</template>

<script>
import collect from 'collect.js'
import MovieListItem from '@/components/MovieListItem'
import ListTransition from '@/components/ListTransition'

export default {
  props: {
    movies: {
      type: Array,
      default: []
    }
  },
  components: { MovieListItem, ListTransition },
  data () {
    return {
      genres: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi', 'Comedy'],
      genre: '',
      searchQuery: null
    }
  },
  computed: {
    filteredList () {
      let list = this.movies
      if (this.genre) {
        list = list.filter(item => item.genres.includes(this.genre))
      }
      if (this.searchQuery) {
        list = list.filter(item => {
          let hasMatch = false
          collect(item).values().each(property => {
            if (property
                  .toString()
                  .toLowerCase()
                  .includes(this.searchQuery.toLowerCase())
               ) {
              hasMatch = true
            }
          })
          return hasMatch
        })
      }
      return list
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.movie-list {
  background-color: rgba(255,255,255,0.5);
  border-right: 1px solid rgba(0,0,0,0.12);
  height: 100%;
  min-height: 100%;

  .header, .list-footer {
    padding: 1.5rem;
  }

  .nav-container {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
  }
}
.list-footer {
  // display: flex;
  // justify-content: space-between;
  color: rgba(0,0,0,0.23);
  font-weight: 400;
}
@media screen and (min-width: 1280px) {
  .list-footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>
