import Koa from "Koa";
import consola from "consola";
import { Nuxt, Builder } from "nuxt";
import { resolve } from "path";

import R from "ramda";

const app = new Koa();

const r = path => resolve(__dirname, path);
const MIDDLEWAREARR = ["tools", "mongo", "router"];
const useMiddleware = app => {
  return R.map(
    R.compose(
      R.map(i => i(app)),
      require,
      i => `${r("./middleware")}/${i}`
    )
  );
};

async function start() {
  // Import and Set Nuxt.js options
  let config = require("../nuxt.config.js");
  config.dev = !(app.env === "production");
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  await useMiddleware(app)(MIDDLEWAREARR);

  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
