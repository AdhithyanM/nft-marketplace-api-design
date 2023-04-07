const fs = require("fs");

const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/../nft-data/data/nft-simple.json`)
);

const checkId =
  ("id",
  (req, res, next, value) => {
    const id = value * 1;
    const nft = nfts.find((el) => el.id === id);

    if (!nft) {
      return res.status(404).json({
        status: "failed",
        message: "NFT not found",
      });
    }
    next();
  });

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: "Missing name or price",
    });
  }
  next();
};

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
const getSingleNft = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      nft: nft,
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
const updateNft = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "NFT updated successfully",
    data: {
      nft: nft,
    },
  });
};
const deleteNFT = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "NFT deleted successfully",
  });
};

const nftController = Object.freeze({
  checkId,
  checkBody,
  getAllNfts,
  getSingleNft,
  createNFT,
  updateNft,
  deleteNFT,
});

module.exports = nftController;
