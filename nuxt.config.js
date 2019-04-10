const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: pkg.description }],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }, { rel: "stylesheet", href: "/katex/katex.min.css" }],
    script: [{ src: "/katex/katex.min.js", ssr: false }, { src: "/jquery.min.js", ssr: false }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/http.js", "@/plugins/element-ui", { src: "@/plugins/vue-mavon-editor", ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
