<template>
  <router-link
    :to="{ name: 'Movie', params: { movieId: item.id }}"
    class="list-group-item list-group-item-action flex-column align-items-start"
    :class="{ active: isActive }"
  >
    <div class="d-flex w-100 justify-content-between">
      <h6 class="title">{{item.title}}</h6>
      <h6 class="ml-2">
        <span class="badge badge-default">{{item.rated}}</span>
      </h6>
    </div>
    <div class="d-flex w-100 justify-content-between mb-1">
      <div>Released in {{item.released}}</div>
      <div>Runtime {{item.runtime}}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    isActive () {
      return this.item.id === parseInt(this.$route.params.movieId)
    }
  }
}
</script>

<style>
.list-group-item,
.list-group-item:visited {
  background-color: transparent;
  border-right: none;
  border-left: none;
  border-radius: 0;
  color: rgba(0,0,0,0.54);
}
.list-group-item .title {
  color: rgba(0,0,0,0.87);
}
.list-group-item:first-child,
.list-group-item:last-child { border-radius: 0; }
.list-group-item-action:focus,
.list-group-item-action:hover { background-color: #F5F5F5; }
.list-group-item.active {
  z-index: 2;
  color: rgba(0,0,0,0.54);
  background-color: #E3F2FD;
  border-color: #BBDEFB;
}
</style>
