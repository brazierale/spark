const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestCaseSchema = new Schema(
    {
        key: String,
        summary: String,
        description: String,
        tags: [String]
      },
)

module.exports = mongoose.model("TestCase", TestCaseSchema);