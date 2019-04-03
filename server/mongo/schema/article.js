import mongoose from "mongoose";
import { getGenerateID } from "../../config";
// const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
  id: String,
  state: Number, // 0草稿  1已发表
  title: String,
  author: String,
  authorId: String,
  describe: String,
  cover: String,
  content: String,
  tags: Array,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

ArticleSchema.pre("save", function(next) {
  this.id = "ARTICLE" + getGenerateID();
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});

ArticleSchema.statics = {
  async getArticleAll() {
    const list = await this.find().exec();
    return list;
  },
  async getArticleById(id) {
    let aAag = await this.findOne({
      id
    }).exec();
    return aAag;
  },
  async addArticle(data) {
    let aAag = new Article(data);
    await aAag.save();
    return aAag;
  }
};
const Article = mongoose.model("Article", ArticleSchema);
