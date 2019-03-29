import koaBodyParser from "koa-bodyparser";
import koaSession from "koa-session";

export const setBodyParser = app => {
  app.use(koaBodyParser());
};

export const setSession = app => {
  app.keys = ["some secret hurr"];

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
