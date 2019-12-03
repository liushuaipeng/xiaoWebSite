<template>
  <div class="article">
    <el-card shadow="hover">
      <div style="display:flex;flex-wrap:wrap;">
        <nuxt-link
          :to="`/article/detail/${article.id}`"
          class="article_image"
          :style="{ backgroundImage: 'url(' + article.cover + ')' }"
        >
        </nuxt-link>
        <div class="article_content">
          <a
            :href="`/article/detail/${article.id}`"
            class="article_content_title"
          >
            {{ article.title }}
          </a>

          <div class="article_content_info">
            作者：
            <span style="color:#16a085;">{{ article.author }}</span>
            &nbsp; 时间：{{ dateFormat(article.meta.updatedAt) }}
          </div>
          <div class="article_content_tag">
            <el-tag v-for="atag in article.tags" :key="atag.id" size="small">
              {{ atag.name }}
            </el-tag>
          </div>
          <div class="article_content_desc">
            {{ article.describe }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { dateFormat } from "~/assets/js/common.js";

export default {
  props: ["article"],
  methods: {
    dateFormat(date) {
      return dateFormat(date, "yyyy-MM-dd");
    }
  }
};
</script>

<style lang="less" scoped>
.article {
  .el-card {
    display: flex;
    background-color: rgba(236, 240, 241, 0.8);
    border-color: #7f8c8d;
    color: #1a2a3a;
    &.is-hover-shadow:hover {
      box-shadow: 0 3px 12px 3px #333;
    }
  }
  .article_image {
    flex: 0 0 15vw;
    width: 15vw;
    min-width: 150px;
    min-height: 100px;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .article_content {
    flex: 1;
    margin-left: 0.2rem;
    .article_content_title {
      display: block;
      text-decoration: none;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      color: #1a2a3a;
      &:hover {
        text-decoration: underline;
      }
    }
    .article_content_info {
      height: 30px;
      font-size: 15px;
      color: #2a3a4a;
      line-height: 30px;
      overflow: hidden;
    }
    .article_content_tag {
      height: 36px;
      overflow: hidden;
      .el-tag {
        margin: 2px 5px 7px 0;
      }
    }
    .article_content_desc {
      font-size: 16px;
      height: 45px;
      overflow: hidden;
      color: #3a4a5a;
    }
  }
}
@media (max-width: 768px) {
  .article {
    .article_content {
      margin-top: 10px;
      margin-left: 0;
    }
    .article_image {
      flex: 0 0 100%;
      min-height: 150px;
    }
  }
}
</style>