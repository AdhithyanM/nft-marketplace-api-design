const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A NFT must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: String,
    required: [true, "Must provide duration for the NFT"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "Must have difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A NFT must have price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, "Must provide a summary"],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "Must povide a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;
