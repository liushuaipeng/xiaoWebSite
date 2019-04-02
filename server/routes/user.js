import koaRouter from "koa-router";
import md5 from "md5";
import { config } from "../config";
import { userList } from "../config/userList";
// import mongoose from "mongoose";

const router = new koaRouter();

router.post("/api/admin/login", (ctx, next) => {
  let user = ctx.request.body;
  let userkey = md5(md5(user.username + config.KEY) + user.password);
  let flag;
  userList.forEach(item => {
    if (item.key === userkey) {
      flag = true;
      ctx.session.user = item;
    }
  });
  ctx.body = {
    state: flag ? 0 : 1,
    message: flag ? "登录成功" : "账号或密码错误"
  };
});

module.exports = router;
