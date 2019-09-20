const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DemoSchema = new Schema({
   topic: String,
   status: {
      type: String,
      enum: ["done", "not-done"]
   }
});

const Demo = mongoose.model("demo", DemoSchema);

module.exports = Demo;
