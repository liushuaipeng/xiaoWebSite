<template>
  <div class="article_detail"
    :class="{'menushow':leftMenuShow}">
    <div class="article_detail_mask"
      @click="leftMenuShow = false"
      v-if="leftMenuShow && windowWidthIsLess768"></div>
    <div class="article_detail_menu"
      v-if="!leftMenuShow && windowWidthIsLess768">
      <el-button type="primary"
        circle
        icon="el-icon-menu"
        @click="leftMenuShow = true"></el-button>
    </div>
    <div class="bg"
      :style="{backgroundImage:'url('+bg+')'}"></div>
    <div class="wrapper">
      <div class="catalog"
        :class="{'hide':!leftMenuShow}">
        <div class="catalog_wrapper">
          <!-- 三级目录结构TODO？重构 -->
          <el-menu default-active="2"
            background-color="#ecf0f1">
            <div v-for="(item1,index1) in catalogList"
              :key="index1">
              <el-submenu v-if="item1.children.length > 0"
                :index="index1.toString()">
                <template slot="title">
                  <a style="font-size:16px;"
                    :href="item1.href">{{item1.text}}</a>
                </template>
                <div v-for="(item2,index2) in item1.children"
                  :key="index1 + '-'+ index2">
                  <el-submenu v-if="item2.children.length > 0"
                    :index="index1 + '-'+ index2">
                    <template slot="title">
                      <a style="font-size:14px;"
                        :href="item2.href">{{item2.text}}</a>
                    </template>
                    <div v-for="(item3,index3) in item2.children"
                      :key="index1 + '-'+ index2 + '-' + index3">
                      <el-menu-item :index="index1 + '-'+ index2 + '-' + index3">
                        <a style="font-size:12px;"
                          :href="item3.href">{{item3.text}}</a>
                      </el-menu-item>
                    </div>
                  </el-submenu>
                  <el-menu-item v-else
                    :index="index1 + '-'+ index2">
                    <a style="font-size:14px;"
                      :href="item2.href">{{item2.text}}</a>
                  </el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item v-else
                :index="index1.toString()">
                <a style="font-size:16px;"
                  :href="item1.href">{{item1.text}}</a>
              </el-menu-item>
            </div>
          </el-menu>
        </div>
      </div>
      <div class="content">
        <div class="content_wrap">
          <div class="content_header">
            <div class="content_header_title">{{article.title}}</div>
            <div class="content_header_info">作者：<span style="color:#16a085;">{{article.author}}</span> &nbsp; 创建时间：{{article.meta.createdAt.substr(0,10)}}</div>
            <div class="content_header_tag">
              <el-tag v-for="atag in article.tags"
                :key="atag.id"
                size="small">{{atag.name}}
              </el-tag>
            </div>
          </div>
          <div id="articleContent"
            class="content_body markdown-body"
            v-html="contentHtml">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "highlight.js/lib/highlight";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";

import { requestArticleDetail } from "~/assets/api";
import { anchorPoint, makeCatalog } from "~/assets/js/common.js";

export default {
  head: {},
  async asyncData({ route, store, error }) {
    const id = route.params.id || "index";
    let { data } = await requestArticleDetail({ id });
    return { article: data };
  },
  data() {
    return {
      windowWidthIsLess768: true,
      leftMenuShow: false,
      bg: "",
      activeMenu: "all",
      articlesList: [],
      tagList: [],
      contentHtml: "",
      catalogList: []
    };
  },
  methods: {
    updateBgImg() {
      if (document.documentElement.clientWidth > 768) {
        this.bg = require("~/assets/images/bg_row" +
          Math.floor(Math.random() * 17) +
          ".jpg");
      } else {
        this.bg = require("~/assets/images/bg_col" +
          Math.floor(Math.random() * 8) +
          ".jpg");
      }
    },
    updateWindowWidth() {
      if (document.documentElement.clientWidth > 768) {
        this.windowWidthIsLess768 = false;
      } else {
        this.windowWidthIsLess768 = true;
      }
    },
    async handleSelect(id, tag) {},

    setRem() {
      var cw = document.documentElement.clientWidth;
      if (cw < 750) {
        document.documentElement.style.fontSize = cw / 7.5 + "px";
      } else {
        document.documentElement.style.fontSize = "100px";
      }
    }
  },
  mounted() {
    this.contentHtml = this.markdownIt.render(this.article.content);
    this.$nextTick(function() {
      this.catalogList = makeCatalog();
      this.$nextTick(function() {
        anchorPoint();
      });
    });
    this.updateBgImg();
    this.updateWindowWidth();
    this.setRem();
    window.onresize = () => {
      this.updateWindowWidth();
      this.setRem();
    };
    // setTimeout(() => {}, 0);

    // setTimeout(() => {

    // }, 0);
  }
};
</script>

<style lang="less" scoped>
.article_detail {
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    opacity: 1;
    z-index: -1;
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .wrapper {
    width: 100%;
    max-width: 1190px;
    margin: 0 auto;
    padding: 50px 10px;
    display: flex;
    .catalog {
      // flex: 0 0 200px;
      position: fixed;
      width: 200px;
      overflow: hidden;
      font-size: 16px;
      background-color: #ecf0f1;
      border-color: #7f8c8d;
      color: #1a2a3a;
      border-radius: 3px;
      .catalog_wrapper {
        width: 230px;
        overflow: auto;
      }
      .el-menu {
        width: 200px;
        height: calc(~"100vh - 100px");
        // overflow-y: hidden;
        border-right: none;
        .el-submenu,
        .el-menu-item {
          overflow: hidden;
        }
        a {
          font-size: 14px;
          color: #1a2a3a;
          text-decoration: none;
        }
        // overflow: hidden;
      }
    }
    .content {
      flex: 1;
      width: 100%;
      padding-left: 250px;
      font-size: 0.16rem;
      .content_wrap {
        color: #24292e;
        background-color: #fff;
        border: 1px solid #7f8c8d;
        border-radius: 3px;
        .content_header {
          border-bottom: 1px solid #d1d5da;
          background: #f6f8fa;
          padding: 0.2rem 0.3rem;
          .content_header_title {
            font-size: 30px;
            font-weight: 600;
            text-align: center;
          }
          .content_header_info {
            font-size: 0.14rem;
            color: #858585;
            text-align: right;
            line-height: 30px;
          }
          .content_header_tag {
            .el-tag {
              margin: 5px 0.15rem 0px 0;
            }
          }
        }
        .content_body {
          padding: 16px 26px;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .article_detail {
    &.menushow {
      // height: 100vh;
      overflow: hidden;
    }
    .article_detail_mask {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 5;
    }
    .article_detail_menu {
      z-index: 4;
      position: fixed;
      top: 10px;
      left: 10px;
      font-size: 16px;
    }
    .wrapper {
      padding: 0;
      .catalog {
        position: fixed;
        min-width: 150px;
        width: 60%;
        z-index: 6;
        top: 0;
        left: 0;
        transition: width 0.3s, min-width 0.3s;
        &.hide {
          width: 0;
          min-width: 0;
        }
        .catalog_wrapper {
          width: 100%;
        }
        .el-menu {
          width: 100%;
          height: 100vh;
        }
      }
      .content {
        padding: 3vw;
        z-index: 1;
      }
    }
  }
}
</style>

<style lang="less">
.article_detail {
  .el-menu-item,
  .el-submenu__title {
    height: 42px;
    line-height: 42px;
  }
}
</style>

