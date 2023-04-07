const fs = require("fs");
const express = require("express");
const { log } = require("console");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
  console.log("Middlware called");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`)
);
// GET REQUEST
const getAllNfts = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    data: {
      entities: nfts,
      total: nfts.length,
    },
  });
};
// POST METHOD
const createNFT = (req, res) => {
  const newId = nfts[nfts.length - 1].id + 1;
  const newNFT = Object.assign({ id: newId }, req.body);

  nfts.push(newNFT);

  return fs.writeFile(
    `${__dirname}/nft-data/data/nft-simple.json`,
    JSON.stringify(nfts),
    (err) => {
      res.status(201).json({
        status: "success",
        message: "NFT created successfully",
        data: newNFT,
      });
    }
  );
};
// GET SINGLE NFT
const getSingleNft = (req, res) => {
  const id = req.params.id * 1;
  const nft = nfts.find((el) => el.id === id);

  if (!nft) {
    return res.status(404).json({
      status: "failed",
      message: "NFT not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      nft: nft,
    },
  });
};
// PATCH METHOD
const updateNft = (req, res) => {
  const id = req.params.id * 1;
  const nft = nfts.find((el) => el.id === id);

  if (!nft) {
    return res.status(404).json({
      status: "failed",
      message: "NFT not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "NFT updated successfully",
    data: {
      nft: nft,
    },
  });
};
// DELETE METHOD
const deleteNFT = (req, res) => {
  const id = req.params.id * 1;
  const nft = nfts.find((el) => el.id === id);

  if (!nft) {
    return res.status(404).json({
      status: "failed",
      message: "NFT not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "NFT deleted successfully",
  });
};

/**
 * Refactor - 1
 * Keep separate controller functions for each route.
 */
// app.get("/api/v1/nfts", getAllNfts);
// app.get("/api/v1/nfts/:id", getSingleNft);
// app.post("/api/v1/nfts", createNFT);
// app.patch("/api/v1/nfts/:id", updateNft);
// app.delete("/api/v1/nfts/:id", deleteNFT);

/**
 * Refactor - 2
 * Use route method and functions chaining
 */
app.route("/api/v1/nfts").get(getAllNfts).post(createNFT);
app
  .route("/api/v1/nfts/:id")
  .get(getSingleNft)
  .patch(updateNft)
  .delete(deleteNFT);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
