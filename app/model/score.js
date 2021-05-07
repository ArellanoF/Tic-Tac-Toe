const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

// export model schore with SchoreSchema
const score = mongoose.model('score', scoreSchema);

module.exports = score;