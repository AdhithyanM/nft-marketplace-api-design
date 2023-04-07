const fs = require("fs");
const express = require("express");
const { log } = require("console");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

//--------NFTs
const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`)
);
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
//--------USERS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
const getSingleUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

const nftsRouter = express.Router();
const usersRouter = express.Router();

nftsRouter.route("/").get(getAllNfts).post(createNFT);
nftsRouter.route("/:id").get(getSingleNft).patch(updateNft).delete(deleteNFT);

usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter
  .route("/:id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
