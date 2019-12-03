<template>
  <div class="article_list" :class="{ menushow: leftMenuShow }">
    <div
      class="article_list_mask"
      @click="leftMenuShow = false"
      v-if="leftMenuShow && windowWidthIsLess750"
    ></div>
    <div class="article_list_menu" v-if="!leftMenuShow && windowWidthIsLess750">
      <el-button
        type="primary"
        circle
        icon="el-icon-menu"
        @click="leftMenuShow = true"
      ></el-button>
    </div>
    <div class="bg" :style="{ backgroundImage: 'url(' + bg + ')' }"></div>
    <div class="wrapper">
      <div class="tag" :class="{ hide: !leftMenuShow }">
        <div>
          <el-card>
            <div class="tag_list">
              <div class="tag_item">
                <el-tag
                  @click="handleSelect('all')"
                  :type="activeMenu === 'all' ? 'success' : 'info'"
                >
                  ALL
                </el-tag>
              </div>
              <div class="tag_item" v-for="tag in tagList" :key="tag.id">
                <el-tag
                  @click="handleSelect(tag)"
                  :type="activeMenu === tag.id ? 'success' : 'info'"
                  >{{ tag.name }} （{{ tag.articles.length }}）
                </el-tag>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="content">
        <div class="list">
          <div
            class="wrap_item"
            v-for="article in articlesList"
            :key="article.id"
          >
            <article-item :article="article"></article-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { requestTagList, requestArticle } from "~/assets/api";
import { imgBase } from "~/assets/js/setting";
import articleItem from "~/components/articleItem.vue";

export default {
  head: {
    title: "全部文章 - 刘帅鹏的个人网站 - Liu Shuaipeng's Personal Website",
    meta: [
      {
        name: "description",
        content:
          "刘帅鹏的个人网站，记录个人开发和学习过程中所遇到问题，以及解决方案和感悟，关注web前端、node技术。"
      },
      { name: "keywords", content: "刘帅鹏" }
    ]
  },
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
  components: {
    articleItem
  },
  data() {
    return {
      leftMenuShow: false,
      bg: "",
      activeMenu: "all",
      articlesList: []
    };
  },
  computed: {
    ...mapState(["windowWidthIsLess750"])
  },
  methods: {
    updateBgImg() {
      if (document.documentElement.clientWidth > 768) {
        this.bg = `${imgBase}bg_row${Math.floor(Math.random() * 17)}.jpg`;
      } else {
        this.bg = `${imgBase}bg_col${Math.floor(Math.random() * 8)}.jpg`;
      }
    },
    async handleSelect(tag) {
      let ids;
      if (tag === "all") {
        ids = "all";
        this.activeMenu = "all";
      } else {
        ids = tag.articles;
        this.activeMenu = tag.id;
      }
      await this.getArticles(ids);
      this.leftMenuShow = false;
    },
    async getArticles(ids) {
      let res = await requestArticle({ ids });
      this.articlesList = res.data.list;
    }
  },
  mounted() {
    this.updateBgImg();
    this.getArticles("all");
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
      }
    }
  }
}
</style>
