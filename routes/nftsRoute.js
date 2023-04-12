const express = require("express");

// INTERNAL IMPORT
const nftController = require("../controllers/nftController");

const router = express.Router();

router.route("/").get(nftController.getAllNfts).post(nftController.createNFT); // 1st it will run checkBody and then createNFT
router
  .route("/:id")
  .get(nftController.getSingleNft)
  .patch(nftController.updateNft)
  .delete(nftController.deleteNFT);

module.exports = router;
