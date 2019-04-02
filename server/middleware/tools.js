import koaBodyParser from "koa-bodyparser";
import koaSession from "koa-session";
import { config } from "../config";

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
