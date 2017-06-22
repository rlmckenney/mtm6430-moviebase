export default {
  STORAGE_KEY: 'favouriteMovies',

  fetch () {
    return JSON.parse(window.localStorage.getItem(this.STORAGE_KEY) || '[]')
  },
  save (movieIds) {
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(movieIds))
  },
  has (movieId) {
    return this.fetch().includes(movieId)
  },
  add (movieId) {
    let favs = this.fetch()
    if (favs.indexOf(movieId) === -1) {
      favs.push(movieId)
      this.save(favs)
    }
  },
  remove (movieId) {
    let favs = this.fetch()
    const index = favs.indexOf(movieId)
    if (index > -1) {
      favs.splice(index, 1)
      this.save(favs)
    }
  },
  clearAll () {
    this.save([])
  }
}
