<template>
  <div class="has-navbar-fixed-top">
    <MagicLayoutHeader/>
    <slot></slot>
    <MagicLayoutFooter/>
  </div>
</template>
<script>
import MagicLayoutHeader from '@/layouts/magic-layout/MagicLayoutHeader.vue'
import MagicLayoutFooter from '@/layouts/magic-layout/MagicLayoutFooter.vue'
export default {
  name: 'MagicLayout',
  components: {
    MagicLayoutHeader,
    MagicLayoutFooter
  }
}
</script>

<style scoped>
</style>
