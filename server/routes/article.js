import koaRouter from "koa-router";
import mongoose from "mongoose";
import { tagAsArticle } from "../mongo/methods/article";

const Article = mongoose.model("Article");

const router = new koaRouter();

router.get("/api/article/list", async (ctx, next) => {
  let list = await Article.find()
    .sort({ "meta.updatedAt": -1 })
    .exec();
  ctx.body = {
    state: 0,
    message: "成功",
    data:{
      list:list
    }
  };
});

router.post("/api/admin/article/add", async (ctx, next) => {
  let data = ctx.request.body;
  data.author = ctx.session.user.nickname;
  data.authorId = ctx.session.user.key;
  let art = await Article.addArticle(data);
  // TODO?并发操作效果是否会更好
  data.tags.forEach(async item => {
    await tagAsArticle(item.id, art.id);
  });
  ctx.body = {
    state: 0,
    message: "成功"
  };
});

module.exports = router;
