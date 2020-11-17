const Router = require("koa-router"),
  router = new Router(),
  info = require("../mongo/mongo"),
  fs = require("fs"),
  path = require("path"),
  fileTypeVerify = require("../verify/fileType"),
  valueCheck = require("../verify/valueCheck");

//test
router.get("/test", async (ctx) => {
  ctx.body = {
    msg: "test",
  };
});

//infoSave
router.post("/info", async (ctx) => {
  let data = ctx.request.body;
  let files = ctx.request.files;
  //空值检查
  if (valueCheck(data, files)) {
    ctx.body = {
      status: false,
      msg: "有未填项!",
    };
  } else {
    //文件后缀检查
    let filename = files.file.path.substr(
      files.file.path.lastIndexOf("\\") + 1
    );
    if (fileTypeVerify(filename)) {
      fs.unlinkSync(
        path.join(
          __dirname.substring(0, __dirname.lastIndexOf("\\")),
          "/upload/",
          filename
        )
      );
      ctx.body = {
        status: false,
        msg: "文件格式不允许",
      };
    } else {
      //数据库插入
      data.fileName = filename;
      let newData = new info(data);
      let sqlRes = await newData.save();
      if (sqlRes) {
        ctx.body = {
          status: true,
          msg: "提交成功!",
        };
      } else {
        ctx.body = {
          status: false,
          msg: "提交失败!",
        };
      }
    }
  }
});

module.exports = router.routes();
