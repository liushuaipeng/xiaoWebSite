<template>
  <div class="test">
    <no-ssr>
      <mavon-editor v-model="handbook"></mavon-editor>
    </no-ssr>

    <div class="test_html markdown-body"
      v-html="testHtml">

    </div>
    <a href="#布局">布局</a>
  </div>
</template>
<script>
import "highlight.js/lib/highlight";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";

import testmd from "raw-loader!./test.md";
import { anchorPoint } from "~/assets/js/common.js";
export default {
  data() {
    return {
      handbook: "#### how to use mavonEditor in nuxt.js",
      testHtml: ""
    };
  },
  mounted() {
    this.handbook = testmd;
    this.testHtml = this.markdownIt.render(testmd);
    // anchorPoint();

    setTimeout(() => {
      anchorPoint();
      // require("../plugins/common.js").anchorPoint();
    }, 0);
  }
};
</script>

<style scoped>
.mavonEditor {
  margin: 10px auto;
  width: 80vw;
  height: 550px;
}
.test_html {
  margin: 10px auto;
  padding: 20px;
  width: 80vw;
  border: 1px solid red;
}
</style>