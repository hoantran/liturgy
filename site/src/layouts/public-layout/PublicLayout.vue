<template>
  <div class="public-layout">
    <span class="component-label">{{'&lt;' + $options.name + ' />'}}</span>
    <PublicLayoutHeader/>
    <slot></slot>
    <PublicLayoutFooter/>
  </div>
</template>
<script>
import PublicLayoutHeader from '@/layouts/public-layout/PublicLayoutHeader.vue'
import PublicLayoutFooter from '@/layouts/public-layout/PublicLayoutFooter.vue'
export default {
  name: 'PublicLayout',
  components: {
    PublicLayoutHeader,
    PublicLayoutFooter
  }
}
</script>
