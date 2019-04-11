import koaRouter from "koa-router";
import mongoose from "mongoose";
import { tagAsArticle, compareWithArr } from "../mongo/methods/article";

const Article = mongoose.model("Article");

const router = new koaRouter();

router.get("/api/article/list", async (ctx, next) => {
  let list = await Article.find({ state: 1 })
    .sort({ "meta.updatedAt": -1 })
    .exec();
  ctx.body = {
    state: 0,
    message: "成功",
    data: {
      list: list
    }
  };
});
// 文章列表接口 直接keyword关键字搜索
router.get("/api/admin/article/list", async (ctx, next) => {
  let list = await Article.find().exec();
  ctx.body = {
    state: 0,
    message: "成功",
    data: {
      list: list
    }
  };
});

// 文章接口 支持详情或者列表 支持通过id或者ids搜索
router.get("/api/admin/article/byids", async (ctx, next) => {
  let id = ctx.query.id;
  // 同时传ids和id时以id为准
  let ids = id || ctx.query.ids;
  let list = await Article.find({ id: { $in: ids } }).exec();
  ctx.body = {
    state: 0,
    message: "成功",
    data: id
      ? list[0]
      : {
          list: list,
          total: list.length
        }
  };
});
// 文章详情
router.get("/api/article/detail", async (ctx, next) => {
  let id = ctx.query.id || "";
  let art = await Article.getArticleById(id);
  ctx.body = {
    state: 0,
    message: "成功",
    data: art
  };
});

router.post("/api/admin/article/add", async (ctx, next) => {
  let data = ctx.request.body;
  data.author = ctx.session.user.nickname;
  data.authorId = ctx.session.user.key;
  let art = {};
  let difArr;
  if (data.id) {
    // 修改
    art = await Article.getArticleById(data.id);
    difArr = compareWithArr(art.tags, data.tags);
  } else {
    // 新增
    difArr = compareWithArr([], data.tags);
  }

  // 文章修改后同步标签中绑定的文章数据
  difArr.addArr.forEach(async item => {
    await tagAsArticle(item.id, art.id, true);
  });
  difArr.delArr.forEach(async item => {
    await tagAsArticle(item.id, art.id, false);
  });

  Object.assign(art, data);
  await Article.addArticle(art);
  ctx.body = {
    state: 0,
    message: "成功"
  };
});

module.exports = router;
