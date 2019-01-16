const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestCaseSchema = new Schema(
    {
        id: String,
        summary: String,
        tags: [String]
      },
)

module.exports = mongoose.model("TestCase", TestCaseSchema);