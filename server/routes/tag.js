import koaRouter from "koa-router";
import mongoose from "mongoose";

const ATag = mongoose.model("ATag");

const router = new koaRouter();

router.get("/api/tag/list", async (ctx, next) => {
  let keyword = ctx.query.keyword || "";
  let list = await ATag.getAtagKeyword(keyword);
  ctx.body = {
    state: 0,
    message: "查询成功",
    data: {
      list: list,
      total: list.length
    }
  };
});

router.get("/api/admin/tag/list", async (ctx, next) => {
  let keyword = ctx.query.keyword || "";
  let list = await ATag.getAtagKeyword(keyword);
  ctx.body = {
    state: 0,
    message: "查询成功",
    data: {
      list: list,
      total: list.length
    }
  };
});

router.post("/api/admin/tag/add", async (ctx, next) => {
  let name = ctx.request.body.name;
  let data = await ATag.addATag(name);
  if (data) {
    ctx.body = {
      state: 0,
      data: data,
      message: "新增成功"
    };
  } else {
    ctx.body = {
      state: 1,
      message: `已存在名称为“${name}”标签`
    };
  }
});

module.exports = router;
