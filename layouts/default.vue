<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  mounted() {
    this.onWidthChange();
    window.onresize = () => {
      this.onWidthChange();
    };
  },
  methods: {
    onWidthChange() {
      var cw = document.documentElement.clientWidth;
      if (cw < 750) {
        document.documentElement.style.fontSize = cw / 7.5 + "px";
        this.windowWidthIsLess750 = true;
      } else {
        document.documentElement.style.fontSize = "100px";
        this.windowWidthIsLess750 = false;
      }
    }
  },
  computed: {
    windowWidthIsLess750: {
      get() {
        return this.$store.state.windowWidthIsLess750;
      },
      set(val) {
        this.$store.commit("updatewindowWidthIsLess750", val);
      }
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
