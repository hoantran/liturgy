<template>
  <span>
    <a href="#">
      <a @click.stop.prevent="handleClick(medium.url)"><img :src="getImageLink" alt="instrument" width="40px" height="40px" class="instrument"></a>
    </a>
    </span>
</template>
<script>
import utils from '../../../../shared/utils/Misc.js'
export default {
  name: 'Medium',
  data () {
    return {
      imageLink: ''
    }
  },
  methods: {
    handleClick (link) {
      console.log(link)
      // window.open(link, '_blank', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes')
      // window.open(link, '_blank', 'toolbar=no, menubar=no, resizable=yes')

      window.open(link, '_blank')
    }
  },
  props: [
    'medium'
  ],
  computed: {
    getImageLink () {
      let type = utils.mediumType(this.medium.type)
      return require('../../assets/instruments/' + type + '.png')
    }
  }
}
</script>
<style scoped>
.instrument {
  vertical-align: top;
  margin-right: 1rem;
  margin-left: 0rem;
}
</style>
