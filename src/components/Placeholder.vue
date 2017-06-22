<template>
  <div class="center-center" style="margin-top:6rem;">
    <div>
      <span class="fa fa-film placeholder-icon"></span>
    </div>
    <p class="lead text-muted p-4 text-center">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'placeholder',
  data () {
    return {
      msg: 'Please select a movie title to see the details'
    }
  }
}
</script>

<style>
.center-center {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .placeholder-icon {
    font-size: 12rem;
    color: rgba(0,0,0,0.23);
  }
</style>
