const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const NFT = require("../../models/nftModel");

const res = dotenv.config();

const DB_URI = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(
      `Successfully connected to the database ${con.connection.host}`
    );
  });

const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/nft-simple.json`, "utf-8")
);

// IMPORT DATA
const importData = async () => {
  try {
    await NFT.create(nfts);
    console.log("DATA successfully loaded to DB");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

// DELETE DATA
const deleteData = async () => {
  try {
    await NFT.deleteMany();
    console.log("DATA deleted successfully from DB");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
