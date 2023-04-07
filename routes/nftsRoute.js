const express = require("express");

// INTERNAL IMPORT
const nftController = require("../controllers/nftController");

const router = express.Router();

router.param("id", nftController.checkId);

router
  .route("/")
  .get(nftController.getAllNfts)
  .post(nftController.checkBody, nftController.createNFT); // 1st it will run checkBody and then createNFT
router
  .route("/:id")
  .get(nftController.getSingleNft)
  .patch(nftController.updateNft)
  .delete(nftController.deleteNFT);

module.exports = router;
