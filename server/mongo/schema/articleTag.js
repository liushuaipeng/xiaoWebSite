import mongoose from "mongoose";
import { getGenerateID } from "../../config";
// const Schema = mongoose.Schema;

const ATagSchema = new mongoose.Schema({
  id: String,
  name: String,
  articles: Array,
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

ATagSchema.pre("save", function(next) {
  this.id = "ATAG" + getGenerateID();
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});

ATagSchema.statics = {
  // 查询所有
  async getATagAll() {
    let list = await this.find().exec();
    return list;
  },
  // 根据id查看
  async getATagById(id) {
    let aAag = await this.findOne({
      id
    }).exec();
    return aAag;
  },
  // 根据关键字搜索
  async getAtagKeyword(keyword) {
    let list = await this.find({
      // 是否支持模糊搜索
      $or: [
        {
          name: { $regex: keyword || "" }
        }
      ]
    }).exec();
    return list;
  },
  async addATag(name) {
    let aAag = await this.findOne({
      name
    }).exec();
    if (aAag) {
      return 0;
    }
    aAag = new ATag({
      name
    });
    await aAag.save();
    return aAag;
  }
};
const ATag = mongoose.model("ATag", ATagSchema);
