const NFT = require("../models/nft");

const getAllNfts = async (req, res) => {
  try {
    const nfts = await NFT.find();

    res.status(200).json({
      status: "success",
      data: {
        entities: nfts,
        total: nfts.length,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

const getSingleNft = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        nft: nft,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

const createNFT = async (req, res) => {
  try {
    const newNFT = await NFT.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        nft: newNFT,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

const updateNft = async (req, res) => {
  try {
    const nft = await NFT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        nft: nft,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};

const deleteNFT = async (req, res) => {
  try {
    await NFT.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "NFT deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

const nftController = Object.freeze({
  getAllNfts,
  getSingleNft,
  createNFT,
  updateNft,
  deleteNFT,
});

module.exports = nftController;
