<template>
  <div > // class="has-navbar-fixed-top">
    <ErrorLayoutHeader/>
    <slot></slot>
  </div>
</template>

<script>
import ErrorLayoutHeader from '@/layouts/error-layout/ErrorLayoutHeader.vue'
export default {
  name: 'ErrorLayout',
  components: {
    ErrorLayoutHeader
  }
}
</script>
