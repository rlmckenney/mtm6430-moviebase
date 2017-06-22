import axios from 'axios'

export default {
  apiUrl: '/static/data/movies.json',

  async getMovie (movieId) {
    return await axios
      .get(this.apiUrl)
      .then(response => response.data.filter(movie => movie.id === movieId)[0])
  },

  async getMovieList () {
    return await axios
      .get(this.apiUrl)
      .then(response => {
        return response.data.map(movie => {
          return {
            'id': movie.id,
            'title': movie.title,
            'released': (new Date(movie.released)).getFullYear(),
            'rated': movie.rated,
            'runtime': movie.runtime,
            'genres': movie.genres
          }
        })
      })
  },

  async getMaxId () {
    const list = await this.getMovieList()
    return list.reduce((maxId, movie) => movie.id > maxId ? movie.id : maxId, 0)
  }
}
