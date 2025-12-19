const express = require("express");
const {
  getDethTokenInfo,
  getSethTokenInfo,
  getWalletBalance,
  getAllContractsInfo
} = require("../controllers/dimitarApitestController");

const router = express.Router();

// Route to get dETH token information
router.route("/deth-info").get(getDethTokenInfo);

// Route to get sETH token information
router.route("/seth-info").get(getSethTokenInfo);

// Route to get wallet balance for a specific address
router.route("/wallet-balance/:address").get(getWalletBalance);

// Route to get all contracts information
router.route("/all-contracts").get(getAllContractsInfo);

module.exports = router;
