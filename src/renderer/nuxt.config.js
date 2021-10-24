/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'simple-replace-editor',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,
  plugins: [
    //    '~/src/renderer/plugins/shortkey.js'
  ],
  buildModules: [
    '@nuxt/typescript-build'
    //    'nuxt-vite'
  ],
  modules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#1867c0',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  }
}
