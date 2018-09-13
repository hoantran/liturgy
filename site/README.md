# liturgy

> This project is to develop a website to communicate weekly (music, and maybe at most other liturgical ministry) needs of a choir within its members

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Code Push Guideline

* Make sure your current snapshot can do a production build:

  `npm run build`

* Pull down the lastest from the repository at your root directory:

  `git pull`
  
* Resolve any possible conflict(s)

* Re-do a production build. Make sure it builds:

  `npm run build`

* Commit to your local repository:

  `git commit -m "Your comments" `
  
* Push to branch *version3* on Github:

  `git push origin version3`

**DO NOT BREAK THE BUILD!**

## Useful links
* https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase