import mongoose from "mongoose";
import { config } from "../config";
import fs from "fs";
import { resolve } from "path";

const models = resolve(__dirname, "../mongo/schema");
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*js$/))
  .forEach(file => require(resolve(models, file)));
export const mongo = app => {
  mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on("disconnected", () => {
    mongoose.connect(config.db);
  });
  mongoose.connection.on("error", err => {
    console.error(err);
  });
  mongoose.connection.on("open", async => {
    console.log("Connected to mongoDB", config.db);
  });
};
