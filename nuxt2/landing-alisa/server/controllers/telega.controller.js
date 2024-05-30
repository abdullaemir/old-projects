const CoreHttpModel = require("../core/coreHttp");
const TelegaFeedback = require("../models/telegaFeedback");

module.exports.sendFeedback = async (req, res) => {
  const CoreHttp = new CoreHttpModel();
  const model = new TelegaFeedback();

  model.setAttributes(req.body);

  await model.run();
  CoreHttp.setErrors(model);

  CoreHttp.response(res, {});
};
