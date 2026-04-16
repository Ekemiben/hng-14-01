// src/models/profile.model.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID v7
  name: { type: String, required: true, unique: true },

  gender: String,
  gender_probability: Number,
  sample_size: Number,

  age: Number,
  age_group: String,

  country_id: String,
  country_probability: Number,

  created_at: { type: Date, default: () => new Date() }
});

export default mongoose.model("Profile", profileSchema);