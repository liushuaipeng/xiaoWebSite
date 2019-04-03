import koaRouter from "koa-router";
import koaMulter from "koa-multer";
import { getGenerateID } from "../config";

const router = new koaRouter();

const storage = koaMulter.diskStorage({
  destination: "server/files/images/",
  filename: function(req, file, callback) {
    let fileFormat = file.originalname.split(".");
    let id = "UPLOAD" + getGenerateID();
    callback(null, id + "." + fileFormat[fileFormat.length - 1]);
  }
});
const uploads = koaMulter({ storage });
router.post("/api/admin/upload", uploads.array("files", 6), (ctx, next) => {
  let origin = ctx.request.header.origin;
  let list = ctx.req.files.map(file => {
    return { url: origin + "/" + file.filename };
  });
  ctx.body = {
    state: 0,
    data: { list, total: list.length },
    message: "上传成功"
  };
});

module.exports = router;
