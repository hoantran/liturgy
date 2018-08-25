<template>
  <aside>
    <span class="component-label">{{'&lt;' + $options.name + ' />'}}</span>
    <NavMenu />
  </aside>
</template>
<script>
import NavMenu from '@/components/NavMenu.vue'
export default {
  name: 'AccountLayoutSidebar',
  components: {
    NavMenu
  }
}
</script>
