<template>
  <header>
    <span class="component-label">{{'&lt;' + $options.name + ' />'}}</span>
    <NavMenu class="in-header" />
  </header>
</template>
<script>
import NavMenu from '@/components/NavMenu.vue'
export default {
  name: 'PublicLayoutHeader',
  components: {
    NavMenu
  }
}
</script>
