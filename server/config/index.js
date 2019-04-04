export const config = {
  KEY: "xiaoWebSite By Xiao 666",
  db: "mongodb://localhost/webSite",
  production: {
    host: "liushuaipeng.cn",
    port: "",
    domin: "https://liushuaipeng.cn"
  },
  development: {
    host: "localhost",
    port: 1104,
    domin: "http://localhost:1104"
  }
};

export const getGenerateID = () =>
  Number(
    Math.random()
      .toString()
      .substr(3, 5) + Date.now()
  ).toString(36);
