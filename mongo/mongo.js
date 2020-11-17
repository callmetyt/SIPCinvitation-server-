const monoose = require("mongoose");

monoose
  .connect("mongodb://127.0.0.1:27017/SIPCinfo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connect success!");
  })
  .catch((err) => {
    console.log("mongoDB connect fail!", err);
  });

let info = new monoose.Schema({
  name: String,
  grade: String,
  sex: String,
  duty: String,
  phone: String,
  email: String,
  classes: String,
  company: String,
  workplace: String,
  careerDirection: String,
  jobTitle: String,
  message: String,
  achievement: String,
  fileName: String,
});

module.exports = monoose.model("info", info, "info");
