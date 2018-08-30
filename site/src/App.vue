<template>
  <div id="app">
    <LayoutBroker :layouts="$options.LAYOUTS" :current="$route.meta.layout" />
  </div>
</template>

<script>
import LayoutBroker from '@/layouts/LayoutBroker.vue'
import PublicLayout from '@/layouts/public-layout/PublicLayout.vue'
import AccountLayout from '@/layouts/account-layout/AccountLayout.vue'
import MagicLayout from '@/layouts/magic-layout/MagicLayout.vue'
import LoginLayout from '@/layouts/login-layout/LoginLayout.vue'

const LAYOUTS = {
  PublicLayout,
  AccountLayout,
  MagicLayout,
  LoginLayout
}

export default {
  name: 'App',
  components: {
    LayoutBroker
  },
  LAYOUTS
}
</script>

<style>
</style>
