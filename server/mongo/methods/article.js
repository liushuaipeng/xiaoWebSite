import mongoose from "mongoose";

const Article = mongoose.model("Article");
const ATag = mongoose.model("ATag");

// 标签关联文章
export const tagAsArticle = async (tagid, artid) => {
  let atag = await ATag.getATagById(tagid);
  let article = await Article.getArticleById(artid);
  let articles = [].concat(atag.articles);
  let flag;
  articles.forEach(item => {
    if (item.id === article.id) {
      flag = true;
      console.log(`${ATag.name}标签关联过${Article.title}此文章，请勿重复关联`);
    }
  });
  if (flag) {
    return;
  }
  articles.push({
    id: article.id,
    state: article.state,
    title: article.title,
    author: article.author,
    authorId: article.authorId,
    describe: article.describe,
    cover: article.cover,
    tags: article.tags,
    meta: article.meta
  });
  let data = { articles };
  await ATag.updateOne({ id: tagid }, { $set: data });
};
