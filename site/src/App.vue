<template>
  <div id="app">
    <span class="component-label">{{'&lt;' + $options.name + ' />'}}</span>
    <LayoutBroker :layouts="$options.LAYOUTS" :current="$route.meta.layout" />
  </div>
</template>

<script>
import LayoutBroker from '@/layouts/LayoutBroker.vue'
import PublicLayout from '@/layouts/public-layout/PublicLayout.vue'
import AccountLayout from '@/layouts/account-layout/AccountLayout.vue'

const LAYOUTS = {
  PublicLayout,
  AccountLayout
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
div,
span,
body,
header,
aside,
footer {
  position: relative;
  box-sizing: border-box;
}

div,
header,
footer,
aside {
  border: 1px dashed silver;
  border-radius: 5px;
}

html {
  height: 100%;
  background-color: #e3f2fd;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 40px;
}

.component-label {
  top: -14px;
  left: 10px;
  position: absolute;
  font-size: 12px;
  padding: 5px;
  background-color: #e3f2fd;
}

#app {
  width: 100%;
  height: 100%;
  padding: 40px;
}

.public-layout,
.account-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 40px;
}

main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

header,
footer {
  width: 100%;
  height: 100px;
}

header {
  margin-bottom: 20px;
}

footer {
  margin-top: 20px;
}

.page-wrapper,
main {
  width: 100%;
  height: 100%;
}

.account-layout aside {
  width: 45%;
  height: 100%;
  margin-right: 20px;
}

/* .account-layout .page-wrapper {
  width: 70%;
  height: 100%;
} */

.page-content {
  padding: 20px;
  border: none;
}

a {
  color: blue;
}

.router-link-exact-active {
  color: red;
}

ul.in-header li {
  display: inline-block;
  margin-right: 20px;
}
</style>
