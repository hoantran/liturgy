
// https://fullstack-developer.academy/unexpected-token-export-error/
// https://stackoverflow.com/questions/3225251/how-can-i-share-code-between-node-js-and-the-browser
// https://caolan.org/posts/writing_for_node_and_the_browser.html
const utils =  {
  defaultMediaType: 'unknown',
  supportedMediaType: ['guitar', 'piano', 'vocal', 'mp3', 'link', 'solo', 'octavo', 'lead', 'unknown'],
  mediumType(type) {
    if (this.supportedMediaType.includes(type)) {
      return type
    } else {
      return this.defaultMediaType
    }
  },
  formateTonyDate(timestamp) {
    // do someformating
    return 'formatted string'
  }
}

module.exports = utils