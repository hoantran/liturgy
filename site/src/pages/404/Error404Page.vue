<template>
  <div class="container col-lg-2 col-md-3 col-sm-4 col-xs-6 " style="text-align:center" >
     <img :src="imageFile" alt="Page Not Found" height="400" width="400">
    <h1>Sorry! The page you're looking for doesn't exist..</h1>
  </div>
</template>
<script>
export default {
  name: 'Error404Page',
  data () {
    return {
      imageFile: ''
    }
  },
  created () {
    // this.imageFile = '../../../static/404_2.jpg'
    var index = Math.floor(Math.random() * 4)
    // var images = require.context('../../static/', /\.jpg$/)
    this.imageFile = '../../../static/404_' + index + '.jpg'
  }
}
</script>
<style scoped>
</style>
