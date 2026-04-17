import Profile from "../models/profile.model.js";
import { fetchExternalData } from "../services/externalApi.service.js";
import { validateExternalData } from "../utils/validateExternal.js";
import { getAgeGroup } from "../utils/ageClassifier.js";
import { v7 as uuidv7 } from "uuid";

// CREATE PROFILE
export const createProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Missing or empty name"
      });
    }

    const normalizedName = name.toLowerCase();

    // Check duplicate
    const existing = await Profile.findOne({ name: normalizedName });
    if (existing) {
      return res.status(200).json({
        status: "success",
        message: "Profile already exists",
        data: existing
      });
    }

    const data = await fetchExternalData(name);
    validateExternalData(data);

    const topCountry = data.nationality.country.sort(
      (a, b) => b.probability - a.probability
    )[0];

    const newProfile = await Profile.create({
      id: uuidv7(),
      name: normalizedName,

      gender: data.gender.gender,
      gender_probability: data.gender.probability,
      sample_size: data.gender.count,

      age: data.age.age,
      age_group: getAgeGroup(data.age.age),

      country_id: topCountry.country_id,
      country_probability: topCountry.probability,

      created_at: new Date().toISOString()
    });

    return res.status(201).json({
      status: "success",
      data: newProfile
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Server error"
    });
  }
};

// GET SINGLE PROFILE
export const getSingleProfile = async (req, res) => {
  const { id } = req.params;

  const profile = await Profile.findOne({ id });

  if (!profile) {
    return res.status(404).json({
      status: "error",
      message: "Profile not found"
    });
  }

  res.status(200).json({
    status: "success",
    data: profile
  });
};

// GET ALL PROFILES (FILTERING)
export const getAllProfiles = async (req, res) => {
  try {
    const { gender, country_id, age_group } = req.query;

    const query = {};

    if (gender) query.gender = gender.toLowerCase();
    if (country_id) query.country_id = country_id.toUpperCase();
    if (age_group) query.age_group = age_group.toLowerCase();

    const profiles = await Profile.find(query).select(
      "id name gender age age_group country_id"
    );

    res.status(200).json({
      status: "success",
      count: profiles.length,
      data: profiles
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
};

// DELETE PROFILE
export const deleteProfile = async (req, res) => {
  const { id } = req.params;

  const profile = await Profile.findOneAndDelete({ id });

  if (!profile) {
    return res.status(404).json({
      status: "error",
      message: "Profile not found"
    });
  }

  return res.status(204).send();
};