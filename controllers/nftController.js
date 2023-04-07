const fs = require("fs");

const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/../nft-data/data/nft-simple.json`)
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

const nftController = Object.freeze({
  getAllNfts,
  getSingleNft,
  createNFT,
  updateNft,
  deleteNFT,
});

module.exports = nftController;
