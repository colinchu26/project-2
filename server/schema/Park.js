const mongoose = require("mongoose")
const parkSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  state:   { type: String, required: true },
  type:         { type: String },
  feature:      { type: String },
  text:                 { type: String },
  likes:                { type: Number, default: 0 },
  visited:              { type: Boolean, default: false },
  note:                 { type: String, default: "" }
})




module.exports = mongoose.model("Park", parkSchema)
