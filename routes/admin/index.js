module.exports = (app) => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true, //
  });
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
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
    const queryOption = {}
    if (req.Model.modelName === 'Category') {
      queryOption.populate = 'parent'
    }
    const model = await req.Model.find().setOptions(queryOption);
    res.send(model);
  });

  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });


  // 中间件中的动态路由参数，不能再router中直接获取，需要在实例化router时，传入mergeParams=true
  app.use("/admin/api/rest/:resource", (req, res, next) => {
    const inflection = require('inflection')
    const modelName = inflection.classify(req.params.resource)
    
    const Model = require(`../../models/${modelName}`);
    req.Model = Model
    next()

  }, router);
};
