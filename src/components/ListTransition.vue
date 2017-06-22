<template lang="html">
  <transition-group name="list"
                    v-bind:tag="tag"
                    v-bind:css="false"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave"
  >
    <slot>
      <div class="p-3" key="default">
        Sorry, there are no items matching your search criteria.
      </div>
    </slot>
  </transition-group>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  props: {
    tag: {
      type: String,
      default: 'nav'
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '100%' },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>

<style lang="css">
</style>
