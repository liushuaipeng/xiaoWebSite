import koaRouter from "koa-router";
import mongoose from "mongoose";
import { tagAsArticle, compareWithArr } from "../mongo/methods/article";

const Article = mongoose.model("Article");

const router = new koaRouter();

// 整合文章列表详情，筛选，搜索统一一个接口
router.get("/api/article", async (ctx, next) => {
  let id = ctx.query.id;
  // 同时传ids和id时以id为准，ids为'all'则筛选全部
  let ids = id || ctx.query.ids;
  let search = { state: 1 };
  if (ids !== "all") {
    search.id = { $in: ids };
  }
  let list = await Article.find(search, { _id: 0, __v: 0 })
    .sort({ "meta.updatedAt": -1 })
    .exec();
  ctx.body = {
    state: 0,
    message: "成功",
    data: id
      ? list[0]
      : {
          list,
          total: list.length
        }
  };
});

// 目前仅首页使用
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
  let list = await Article.find({ id: { $in: ids } }, { _id: 0, __v: 0 }).exec();
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
  Object.assign(art, data);
  art = await Article.addArticle(art);

  // 文章修改后同步标签中绑定的文章数据
  let promises = difArr.addArr.map(tag => tagAsArticle(tag.id, art.id, true)).concat(difArr.delArr.map(tag => tagAsArticle(tag.id, art.id, false)));
  // TODO?并发操作好?同步操作?
  await Promise.all(promises);
  ctx.body = {
    state: 0,
    message: "成功"
  };
});

router.post("/api/admin/article/delete", async (ctx, next) => {
  let id = ctx.request.body.id;
  let article = await Article.getArticleById(id);
  let tags = article.tags;
  // 解绑标签中的关联
  let promises = tags.map(tag => tagAsArticle(tag.id, article.id, false));
  // TODO?并发处理tag关联是否合适
  await Promise.all(promises);
  await Article.deleteOne({ id });
  ctx.body = {
    state: 0,
    message: "删除成功"
  };
});

module.exports = router;
