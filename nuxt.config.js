import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/earth.png' }
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
 css: [
   { src: '~/assets/scss/common.scss', lang: 'scss' },
 ],
//  css: {
//   loaderOptions: {
//     scss: {
//       prependData: '@import "./assets/sass/common.scss";'
//     }
//   }
//  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/firebase.js',
    {src: '~/plugins/vue2-google-maps.js', ssr: true}
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/common.scss'
    ]
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },
  generate: {
    dir: 'public'
  },
  env: {
    VUE_APP_FB_API_KEY: process.env.VUE_APP_FB_API_KEY,
    VUE_APP_FB_AUTH_DOMAIN: process.env.VUE_APP_FB_AUTH_DOMAIN,
    VUE_APP_FB_DATABASE_URL: process.env.VUE_APP_FB_DATABASE_URL,
    VUE_APP_FB_PROJECT_ID: process.env.VUE_APP_FB_PROJECT_ID,
    VUE_APP_FB_STORAGE_BUCKET: process.env.VUE_APP_FB_STORAGE_BUCKET,
    VUE_APP_FB_MESSAGING_SENDER_ID: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
    VUE_APP_FB_APP_ID: process.env.VUE_APP_FB_APP_ID
  }
}
