import mongoose from "mongoose";
import R from "ramda";

const Article = mongoose.model("Article");
const ATag = mongoose.model("ATag");

// 标签与文章关联操作（只操作标签，文章另行操作）
export const tagAsArticle = async (tagid, artid, iscontact = true) => {
  let atag = await ATag.getATagById(tagid);
  let article = await Article.getArticleById(artid);
  let index = -1;
  atag.articles.forEach((aid, i) => {
    if (aid === article.id) {
      index = i;
    }
  });
  if (iscontact) {
    // 关联
    if (index > -1) {
      console.log(`${ATag.name}标签关联过${Article.title}此文章，请勿重复关联`);
      return 1;
    }
    atag.articles.push(article.id);
  } else {
    // 取消关联
    atag.articles.splice(index, 1);
  }
  await new ATag(atag).save();
};

// 文章与标签关联操作（只操作文章，标签另行操作）
export const articleAstag = async (tagid, artid, iscontact = true) => {
  let atag = await ATag.getATagById(tagid);
  let article = await Article.getArticleById(artid);
  let index = -1;
  article.tags.forEach((tag, i) => {
    if (tag.id === tagid) {
      index = i;
    }
  });
  if (iscontact) {
    // 关联
    if (index > -1) {
      console.log(`${Article.title}文章关联过${ATag.name}此标签，请勿重复关联`);
      return 1;
    }
    article.tags.push({ id: atag.id, name: atag.name });
  } else {
    // 取消关联
    article.tags.splice(index, 1);
  }
  await new Article(article).save();
};

// 对比两个数组，返回b数组相对a数组的新增项以及删除项
export const compareWithArr = (aArr = [], bArr = []) => {
  let cmp = (a, b) => a.id === b.id;
  let delArr = R.differenceWith(cmp, aArr)(bArr);
  let addArr = R.differenceWith(cmp, bArr)(aArr);
  return { delArr, addArr };
};
