export const config = {
  KEY: "xiaoWebSite By Xiao 666",
  db: "mongodb://localhost/webSite"
};

export const getGenerateID = () =>
  Number(
    Math.random()
      .toString()
      .substr(3, 5) + Date.now()
  ).toString(36);
