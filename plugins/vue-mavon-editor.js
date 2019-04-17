import Vue from "vue";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.use(mavonEditor);
mavonEditor.markdownIt.use(require("markdown-it-github-headings"), {
  prefixHeadingIds: false
});
Vue.prototype.markdownIt = mavonEditor.markdownIt;
// export default mavonEditor.markdownIt.render;
