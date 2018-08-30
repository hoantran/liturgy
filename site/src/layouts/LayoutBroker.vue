<template>
  <component :is="currentLayout" :class="layoutClasses">
    <router-view :class="pageWrapperClasses"></router-view>
  </component>
</template>
<script>
export default {
  name: 'LayoutBroker',
  props: {
    layouts: {
      type: Object
    },
    current: {
      type: String
    },
    layoutClasses: {
      type: [Object, Array],
      default () {
        return ['']
      }
    },
    pageWrapperClasses: {
      type: [Object, Array],
      default () {
        return ['']
      }
    }
  },
  computed: {
    /**
     * Return layout component name for current route
     * @return {string}
     */
    currentLayout () {
      return this.layouts[this.current]
    }
  }
}
</script>
