const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestCaseSchema = new Schema(
    {
        id: Number,
        summary: String,
        tag: [String]
      },
)

module.exports = mongoose.model("TestCase", TestCaseSchema);