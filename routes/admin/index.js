module.exports = (app) => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true, //
  });
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body); // Shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
    res.send(model);
  });

  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
    });
  });

  router.get("/", async (req, res) => {
    const queryOption = {};
    if (req.Model.modelName === "Category") {
      queryOption.populate = "parent";
    }
    if (req.Model.modelName === 'Article') {
      queryOption.populate = 'categories'
    }
    const model = await req.Model.find().setOptions(queryOption);
    res.send(model);
  });

  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 中间件中的动态路由参数，不能再router中直接获取，需要在实例化router时，传入mergeParams=true
  app.use(
    "/admin/api/rest/:resource",
    (req, res, next) => {
      const inflection = require("inflection");
      const modelName = inflection.classify(req.params.resource);

      const Model = require(`../../models/${modelName}`);
      req.Model = Model;
      next();
    },
    router
  );

  const multer = require("multer");
  const upload = multer({ dest: `${__dirname}/../../uploads/` });
  app.post("/admin/api/uploads", upload.single("file"), async (req, res) => {
    console.log(req);
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`
    // url必须拼接成路由返回可客户端
    res.send(file);
  });
};
