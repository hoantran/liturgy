<template>
  <div class="account-layout">
    <span class="component-label">{{'&lt;' + $options.name + ' />'}}</span>
    <AccountLayoutHeader/>
    <main>
      <AccountLayoutSidebar/>
      <slot></slot>
    </main>
    <AccountLayoutFooter/>
  </div>
</template>
<script>
import AccountLayoutHeader from '@/layouts/account-layout/AccountLayoutHeader.vue'
import AccountLayoutFooter from '@/layouts/account-layout/AccountLayoutFooter.vue'
import AccountLayoutSidebar from '@/layouts/account-layout/AccountLayoutSidebar.vue'
export default {
  name: 'AccountLayout',
  components: {
    AccountLayoutHeader,
    AccountLayoutFooter,
    AccountLayoutSidebar
  }
}
</script>
