const express = require("express");

// INTERNAL IMPORT
// const {
//   getAllNfts,
//   getSingleNft,
//   createNFT,
//   updateNft,
//   deleteNFT,
// } = require("../controllers/nftController");
const nftController = require("../controllers/nftController");

const router = express.Router();

router.route("/").get(nftController.getAllNfts).post(nftController.createNFT);
router
  .route("/:id")
  .get(nftController.getSingleNft)
  .patch(nftController.updateNft)
  .delete(nftController.deleteNFT);

module.exports = router;
