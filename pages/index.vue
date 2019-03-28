<template>
  <div class="home">
    <div class="bg"
      :style="{backgroundImage:'url('+homeBg+')'}"></div>
    <div class="wrapper">
      <div class="wrap_header"
        :style="{backgroundImage:'url('+goBg+')'}">
        <!-- <img src="~assets/images/bg1.png" alt=""> -->
        <div class="title">刘帅鹏的个人网站</div>
        <div class="title">Liu Shuaipeng's Personal Website</div>
        <a id="welcome"
          href="#content">
          <i class="el-icon-arrow-down"></i>
        </a>
      </div>
      <div class="wrap_main"
        id="content">
        <el-row>
          <el-col :span="12"
            :xs="24"
            v-for="(item,i) in [1,2,3,4]"
            :key="i">
            <div class="wrap_item">
              <el-card shadow="hover">
                <div style="display:flex;flex-wrap:wrap;">
                  <div class="wrap_item_image">
                  </div>
                  <div class="wrap_item_content">
                    <div class="wrap_item_content_title">标题</div>
                    <div class="wrap_item_content_info">作者：<span style="color:#16a085;">刘帅鹏</span> &nbsp; 时间：2017-03-27</div>
                    <div class="wrap_item_content_desc">这是这篇文章的描述这是这篇文章的描述这是这篇文章的描述...</div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="wrap_main_more">
              <nuxt-link to="/">
                <el-button icon="el-icon-more">查看更多</el-button>
              </nuxt-link>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="wrap_footer">
              <span class="">豫ICP备17049671号</span>
              <a href="mailto:shuaipengliu@foxmail.com"
                target="_blank">shuaipengliu@foxmail.com</a>
              <a href="https://github.com/liushuaipeng"
                target="_blank">github</a>
            </div>
          </el-col>
        </el-row>

      </div>

    </div>
  </div>
</template>

<script>
import { anchorPoint } from "../assets/js/common.js";
export default {
  data() {
    return {
      goBg: "",
      homeBg: ""
    };
  },
  mounted() {
    this.updateBgImg();
    this.setRem();
    this.setOffset();
    anchorPoint();
    window.onresize = () => {
      // this.updateBgImg();
      this.setRem();
      this.setOffset();
    };
  },
  methods: {
    updateBgImg() {
      if (document.documentElement.clientWidth > 768) {
        this.homeBg = require("../assets/images/col" +
          Math.floor(Math.random() * 17) +
          ".jpg");
        this.goBg = require("../assets/images/bg" +
          Math.floor(Math.random() * 6) +
          ".jpg");
      } else {
        let arr = [0, 1, 2, 3, 4, 5, 6, 7];
        this.homeBg = require("../assets/images/row" +
          arr.splice(Math.floor(Math.random() * 8), 1)[0] +
          ".jpg");
        this.goBg = require("../assets/images/row" +
          arr.splice(Math.floor(Math.random() * 7), 1)[0] +
          ".jpg");
      }
    },
    setOffset() {
      var paddingPx = (document.documentElement.clientWidth - 1190) / 2 + "px";
      if (document.documentElement.clientWidth < 1190) {
        paddingPx = "10px";
      }
      document.querySelector(".wrap_main").style.paddingLeft = paddingPx;
      document.querySelector(".wrap_main").style.paddingRight = paddingPx;

      var hh = document.querySelector(".home .wrap_main").clientHeight;
      document.querySelector(".home .bg").style.height = hh + "px";
    },
    setRem() {
      var cw = document.documentElement.clientWidth;
      if (cw < 750) {
        document.documentElement.style.fontSize = cw / 7.5 + "px";
      } else {
        document.documentElement.style.fontSize = "100px";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  .bg {
    width: 100%;
    height: 50vw;
    position: absolute;
    top: 100vh;
    opacity: 1;
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    // background-image: url("~assets/images/col0.jpg");
  }
  .wrapper {
    .wrap_header {
      width: 100%;
      height: 100vh;
      overflow: hidden;
      padding-top: 20vh;
      position: relative;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      // background-image: url("~assets/images/bg1.jpg");
      text-align: center;

      .title {
        color: #fefefe;
        font-family: Georgia, "Times New Roman", Times, serif;
        text-shadow: 0 3px 5px #333;
        font-size: 0.5rem;
      }
      #welcome {
        display: block;
        margin: 35vh auto;
        width: 10vh;
        height: 10vh;
        border-radius: 50%;
        border: 3px solid #ecf0f1;
        color: #ecf0f1;
        line-height: 10vh;
        font-size: 8vh;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 3px 5px #333;
        &:hover {
          color: #00a4ff;
          border-color: #00a4ff;
        }
      }
    }
    .wrap_main {
      font-size: 0.2rem;
      padding-top: 50px;
      .wrap_main_more {
        text-align: center;
        .el-button {
          background-color: rgba(236, 240, 241, 0.7);
        }
      }
      .wrap_item {
        padding: 30px;
        .el-card {
          display: flex;
          background-color: rgba(236, 240, 241, 0.7);
          border-color: #7f8c8d;
          color: #1a2a3a;
          cursor: pointer;
          &.is-hover-shadow:hover {
            box-shadow: 0 3px 12px 3px #333;
          }
        }
        .wrap_item_image {
          flex: 0 0 15vw;
          width: 15vw;
          min-width: 150px;
          min-height: 100px;
          background-image: url("~assets/images/col3.jpg");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .wrap_item_content {
          flex: 1;
          margin-left: 0.2rem;
          .wrap_item_content_title {
            font-size: 20px;
            font-weight: 600;
          }
          .wrap_item_content_info {
            height: 30px;
            font-size: 15px;
            color: #2a3a4a;
            line-height: 30px;
            overflow: hidden;
          }
          .wrap_item_content_desc {
            font-size: 16px;
            height: 42px;
            overflow: hidden;
            color: #3a4a5a;
          }
        }
      }
    }
  }
  .wrap_footer {
    width: 100%;
    height: 50px;
    margin-top: 50px;
    font-size: 0;
    color: #1a2a3a;
    border-top: 1px solid #ecf0f1;
    text-align: right;
    line-height: 49px;
    color: #ecf0f1;
    white-space: normal;
    overflow: hidden;
    .split {
      margin: 0 10px;
      color: #ccc;
      font-weight: 400;
    }
    > * {
      margin: 0 10px;
      font-size: 0.14rem;
    }
    a {
      color: #ecf0f1;
      text-decoration: none;
      &:hover {
        color: #00a4ff;
      }
    }
  }
}
@media (max-width: 768px) {
  .home .bg {
    background-image: url("~assets/images/row1.jpg");
  }
  .home {
    .wrapper {
      .wrap_main {
        .wrap_main_more {
          padding: 6vw;
          .el-button {
            width: 100%;
          }
        }
        .wrap_item {
          padding: 6vw;
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


