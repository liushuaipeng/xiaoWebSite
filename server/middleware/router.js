import koaRouter from "koa-router";
import md5 from "md5";
import { config } from "../config/config";
import { userList } from "../config/userList";

export const router = app => {
  const router = new koaRouter();
  // 测试接口
  router.get("/api/test", (ctx, next) => {
    console.log(ctx.session.user);
    let user = ctx.session.user;
    ctx.body = { user };
  });
  router.post("/api/admin/login", (ctx, next) => {
    console.log("-", ctx.request.body);
    let user = ctx.request.body;
    let userkey = md5(md5(user.username + config.KEY) + user.password);
    userList.forEach(item => {
      if (item.key === userkey) {
        ctx.session.user = item;
        ctx.body = {
          state: 0,
          message: "登录成功"
        };
      }
    });
  });
  app.use(router.routes()).use(router.allowedMethods());
};
