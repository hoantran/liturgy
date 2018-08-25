<template>
  <ul>
    <li>
      <router-link :to="{name: 'index'}">Home</router-link>
    </li>
    <li>
      <router-link :to="{name: 'account-index'}">Account dashboard</router-link>
    </li>
    <li>
      <router-link :to="{name: 'profile'}">My profile</router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'NavMenu'
}
</script>
