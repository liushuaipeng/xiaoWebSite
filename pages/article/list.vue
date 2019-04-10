<template>
  <div class="article_list"
    :class="{'menushow':leftMenuShow}">
    <div class="article_list_mask"
      @click="leftMenuShow = false"
      v-if="leftMenuShow && windowWidthIsLess768"></div>
    <div class="article_list_menu"
      v-if="!leftMenuShow && windowWidthIsLess768">
      <el-button type="primary"
        circle
        icon="el-icon-menu"
        @click="leftMenuShow = true"></el-button>
    </div>
    <div class="bg"
      :style="{backgroundImage:'url('+bg+')'}"></div>
    <div class="wrapper">
      <div class="tag"
        :class="{'hide':!leftMenuShow}">
        <div>
          <el-card>
            <div class="tag_list">
              <div class="tag_item">
                <el-tag @click="handleSelect('all')"
                  :type="activeMenu === 'all'?'success':'info'">ALL</el-tag>
              </div>
              <div class="tag_item"
                v-for="tag in tagList"
                :key="tag.id">
                <el-tag @click="handleSelect(tag.id,tag)"
                  :type="activeMenu === tag.id?'success':'info'">{{tag.name}} （{{tag.articles.length}}）</el-tag>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="content">
        <div class="list">
          <div class="wrap_item"
            v-for="article in articlesList"
            :key="article.id">
            <el-card shadow="hover">
              <div style="display:flex;flex-wrap:wrap;">
                <div class="wrap_item_image"
                  :style="{backgroundImage:'url('+article.cover+')'}"
                  @click="linkToDetail(article.id)">
                </div>
                <div class="wrap_item_content">
                  <div class="wrap_item_content_title"
                    @click="linkToDetail(article.id)">{{article.title}}</div>
                  <div class="wrap_item_content_info">作者：<span style="color:#16a085;">{{article.author}}</span> &nbsp; 时间：{{article.meta.createdAt.substr(0,10)}}</div>
                  <div class="wrap_item_content_tag">
                    <el-tag v-for="atag in article.tags"
                      :key="atag.id"
                      size="small">{{atag.name}}</el-tag>
                  </div>
                  <div class="wrap_item_content_desc">{{article.describe}}</div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { requestTagList, requestArticleList } from "~/assets/api";
export default {
  async asyncData() {
    let res = await requestTagList();
    let list = [];
    res.data.list.forEach(tag => {
      if (tag.articles.length > 0) {
        list.push(tag);
      }
    });
    return { tagList: list };
  },
  data() {
    return {
      windowWidthIsLess768: true,
      leftMenuShow: false,
      bg: "",
      activeMenu: "all",
      articlesList: []
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
    async handleSelect(id, tag) {
      this.activeMenu = id;
      if (this.activeMenu === "all") {
        await this.getAllArticles();
      } else {
        this.articlesList = tag.articles;
      }
      this.leftMenuShow = false;
    },
    async getAllArticles() {
      let res = await requestArticleList();
      this.articlesList = res.data.list;
    },
    linkToDetail(id) {
      this.$router.push("/article/detail/" + id);
    },
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
    this.updateBgImg();
    this.updateWindowWidth();
    this.getAllArticles();
    // this.setRem();
    window.onresize = () => {
      this.updateWindowWidth();
      // this.setRem();
    };
  }
};
</script>

<style lang="less" scoped>
.article_list {
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
    .tag {
      flex: 0 0 200px;
      overflow: hidden;
      .el-card {
        background-color: rgba(236, 240, 241, 1);
        border-color: #7f8c8d;
        color: #1a2a3a;
      }
      .tag_list {
        padding: 0 20px;
        .tag_item {
          padding: 10px 0;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .content {
      flex: 1;
      padding-left: 50px;
      .wrap_item {
        margin-bottom: 50px;
        .el-card {
          display: flex;
          background-color: rgba(236, 240, 241, 0.8);
          border-color: #7f8c8d;
          color: #1a2a3a;
          &.is-hover-shadow:hover {
            box-shadow: 0 3px 12px 3px #333;
          }
        }
        .wrap_item_image {
          flex: 0 0 15vw;
          width: 15vw;
          min-width: 130px;
          min-height: 100px;
          background-image: url("~assets/images/col3.jpg");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          cursor: pointer;
        }
        .wrap_item_content {
          flex: 1;
          margin-left: 2vw;
          .wrap_item_content_title {
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .wrap_item_content_info {
            height: 30px;
            font-size: 15px;
            color: #2a3a4a;
            line-height: 30px;
            overflow: hidden;
          }
          .wrap_item_content_tag {
            font-size: 16px;
            .el-tag {
              margin: 2px 5px 7px 0;
            }
          }
          .wrap_item_content_desc {
            font-size: 16px;
            height: 45px;
            overflow: hidden;
            color: #3a4a5a;
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .article_list {
    &.menushow {
      height: 100vh;
      overflow: hidden;
    }
    .article_list_mask {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 5;
    }
    .article_list_menu {
      z-index: 4;
      position: fixed;
      top: 10px;
      left: 10px;
      font-size: 16px;
    }
    .wrapper {
      .tag {
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
        .el-card {
          // background-color: #2c3e50;
          border-radius: 0;
          border-top: none;
          border-bottom: none;
          border-left: none;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          .tag_list {
            padding-left: 0;
          }
        }
      }
      .content {
        padding: 3vw;
        z-index: 1;

        .wrap_item {
          .wrap_item_content {
            margin-top: 10px;
            margin-left: 0;
          }
          .wrap_item_image {
            flex: 0 0 100%;
            min-height: 150px;
          }
        }
      }
    }
  }
}
</style>
