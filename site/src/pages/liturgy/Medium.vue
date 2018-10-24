<template>
  <span>
    <a href="#">
      <!-- <img src="../../assets/instruments/unknown.png" alt="flock logo" width="50px" class="rum"> -->
      <img :src="getImageLink" alt="flock logo" width="40px" height="40px" class="instrument">
    </a>
    <!-- {{  title }} -->
    </span>
</template>
<script>
export default {
  name: 'Medium',
  data () {
    return {
      imageLink: ''
    }
  },
  props: [
    'type'
  ],
  created () {
    console.log('Medium Created')
  },
  computed: {
    getImageLink () {
      switch (this.type) {
        case 'guitar':
          return require('../../assets/instruments/guitar.png')
        case 'piano':
          return require('../../assets/instruments/piano.png')
        case 'vocal':
          return require('../../assets/instruments/vocal.png')
        case 'link':
          return require('../../assets/instruments/link.png')
        default:
          return require('../../assets/instruments/unknown.png')
      }
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.instrument {
  vertical-align: top;
  margin-right: 1rem
}
</style>
