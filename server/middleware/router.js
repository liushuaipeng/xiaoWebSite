import koaRouter from "koa-router";

// import mongoose from "mongoose";

export const router = app => {
  const router = new koaRouter();
  // 测试接口
  router.get("/api/test", (ctx, next) => {
    console.log(ctx.session.user);
    let user = ctx.session.user;
    ctx.body = { user };
  });

  // 对后台接口进行登录校验
  router.all("/api/admin/*", async (ctx, next) => {
    // 不需要校验的接口
    const noVerifyUserUrlArr = ["/api/admin/login"];
    let flag;
    noVerifyUserUrlArr.forEach(url => {
      if (url === ctx.url) {
        flag = true;
      }
    });
    if (flag) {
      await next();
    } else {
      if (ctx.session.user) {
        await next();
      } else {
        ctx.body = {
          state: 401,
          message: "未登录"
        };
      }
    }
  });
  app.use(router.routes());
  app.use(require("../routes/user").routes());
  app.use(require("../routes/article").routes());
  app.use(require("../routes/tag").routes());
  app.use(router.allowedMethods());
};
