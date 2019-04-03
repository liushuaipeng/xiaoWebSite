import koaBodyParser from "koa-bodyparser";
import koaSession from "koa-session";
import koaStatic from "koa-static";
import path from "path";
import { config } from "../config";

// 静态资源代理
export const setStatic = app => {
  app.use(koaStatic(path.join(__dirname, "../files/images")));
};

export const setBodyParser = app => {
  app.use(koaBodyParser());
};

export const setSession = app => {
  app.keys = [config.KEY];

  const CONFIG = {
    key: "koa:sess",
    maxAge: 30 * 60 * 1000, // session 有效时间半小时
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false
  };

  app.use(koaSession(CONFIG, app));
};
