const Koa = require("koa"),
  app = new Koa(),
  bodyParser = require("koa-body"),
  router = require("./route/router"),
  path = require("path"),
  static = require("koa-static");

//跨域设置
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

//参数解析
app.use(
  bodyParser({
    multipart: true,
    formidable: {
      keepExtensions: true,
      uploadDir: path.join(__dirname + "/upload"),
    },
  })
);

//静态目录
app.use(static(path.join(__dirname + "/public")));

//路由使用
app.use(router);

app.listen(3301, () => {
  console.log("server is running on the port 3301");
});
