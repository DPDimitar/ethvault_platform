const { ethers } = require("ethers");
const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

// Import the dETH ABI
const dETH_ABI = require("../../lib/abis/dETH.json");
const sETH_ABI = require("../../lib/abis/sETH.json");
const governance_ABI = require("../../lib/abis/governance.json");

// Smart Contract Addresses on Holesky Testnet
// These addresses match the deployed contracts in components/web3-provider.tsx
const DETH_CONTRACT_ADDRESS = "0x520d7dAB4A5bCE6ceA323470dbffCea14b78253a";
const SETH_CONTRACT_ADDRESS = "0x16b0cD88e546a90DbE380A63EbfcB487A9A05D8e";
const GOVERNANCE_CONTRACT_ADDRESS = "0xD396FE92075716598FAC875D12E708622339FA3e";

// Holesky RPC URL
const HOLESKY_RPC_URL = "https://holesky.drpc.org";

/**
 * @desc    Get dETH Token Information
 * @route   GET /api/dimitarApitest/deth-info
 * @access  Public
 */
exports.getDethTokenInfo = asyncErrorHandler(async (req, res, next) => {
  try {
    console.log("\n=== Fetching dETH Token Information ===");
    
    // Connect to Holesky network
    const provider = new ethers.JsonRpcProvider(HOLESKY_RPC_URL);
    
    // Create contract instance
    const dethContract = new ethers.Contract(
      DETH_CONTRACT_ADDRESS,
      dETH_ABI,
      provider
    );

    // Fetch token information
    const name = await dethContract.name();
    const symbol = await dethContract.symbol();
    const totalSupply = await dethContract.totalSupply();
    const decimals = await dethContract.decimals();
    const owner = await dethContract.owner();
    
    // Get contract balance
    const contractBalance = await provider.getBalance(DETH_CONTRACT_ADDRESS);

    const tokenInfo = {
      contractAddress: DETH_CONTRACT_ADDRESS,
      name: name,
      symbol: symbol,
      decimals: Number(decimals),
      totalSupply: ethers.formatEther(totalSupply),
      contractETHBalance: ethers.formatEther(contractBalance),
      owner: owner,
      network: "Holesky Testnet"
    };

    // Log to console
    console.log("dETH Token Information:");
    console.log("Contract Address:", tokenInfo.contractAddress);
    console.log("Token Name:", tokenInfo.name);
    console.log("Token Symbol:", tokenInfo.symbol);
    console.log("Decimals:", tokenInfo.decimals);
    console.log("Total Supply:", tokenInfo.totalSupply, "dETH");
    console.log("Contract ETH Balance:", tokenInfo.contractETHBalance, "ETH");
    console.log("Owner Address:", tokenInfo.owner);
    console.log("Network:", tokenInfo.network);
    console.log("=== End of dETH Token Information ===\n");

    res.status(200).json({
      success: true,
      data: tokenInfo
    });

  } catch (error) {
    console.error("Error fetching dETH token info:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

/**
 * @desc    Get sETH Token Information
 * @route   GET /api/dimitarApitest/seth-info
 * @access  Public
 */
exports.getSethTokenInfo = asyncErrorHandler(async (req, res, next) => {
  try {
    console.log("\n=== Fetching sETH Token Information ===");
    
    // Connect to Holesky network
    const provider = new ethers.JsonRpcProvider(HOLESKY_RPC_URL);
    
    // Create contract instance
    const sethContract = new ethers.Contract(
      SETH_CONTRACT_ADDRESS,
      sETH_ABI,
      provider
    );

    // Fetch token information
    const name = await sethContract.name();
    const symbol = await sethContract.symbol();
    const totalSupply = await sethContract.totalSupply();
    const decimals = await sethContract.decimals();
    const owner = await sethContract.owner();

    const tokenInfo = {
      contractAddress: SETH_CONTRACT_ADDRESS,
      name: name,
      symbol: symbol,
      decimals: Number(decimals),
      totalSupply: ethers.formatEther(totalSupply),
      owner: owner,
      network: "Holesky Testnet"
    };

    // Log to console
    console.log("sETH Token Information:");
    console.log("Contract Address:", tokenInfo.contractAddress);
    console.log("Token Name:", tokenInfo.name);
    console.log("Token Symbol:", tokenInfo.symbol);
    console.log("Decimals:", tokenInfo.decimals);
    console.log("Total Supply:", tokenInfo.totalSupply, "sETH");
    console.log("Owner Address:", tokenInfo.owner);
    console.log("Network:", tokenInfo.network);
    console.log("=== End of sETH Token Information ===\n");

    res.status(200).json({
      success: true,
      data: tokenInfo
    });

  } catch (error) {
    console.error("Error fetching sETH token info:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

/**
 * @desc    Get wallet balance (dETH and sETH)
 * @route   GET /api/dimitarApitest/wallet-balance/:address
 * @access  Public
 */
exports.getWalletBalance = asyncErrorHandler(async (req, res, next) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return next(new ErrorHandler("Invalid Ethereum address", 400));
    }

    console.log(`\n=== Fetching Wallet Balance for ${address} ===`);
    
    // Connect to Holesky network
    const provider = new ethers.JsonRpcProvider(HOLESKY_RPC_URL);
    
    // Create contract instances
    const dethContract = new ethers.Contract(DETH_CONTRACT_ADDRESS, dETH_ABI, provider);
    const sethContract = new ethers.Contract(SETH_CONTRACT_ADDRESS, sETH_ABI, provider);

    // Fetch balances
    const ethBalance = await provider.getBalance(address);
    const dethBalance = await dethContract.balanceOf(address);
    const sethBalance = await sethContract.balanceOf(address);

    const balanceInfo = {
      address: address,
      ethBalance: ethers.formatEther(ethBalance),
      dethBalance: ethers.formatEther(dethBalance),
      sethBalance: ethers.formatEther(sethBalance),
      network: "Holesky Testnet"
    };

    // Log to console
    console.log("Wallet Balance Information:");
    console.log("Address:", balanceInfo.address);
    console.log("ETH Balance:", balanceInfo.ethBalance, "ETH");
    console.log("dETH Balance:", balanceInfo.dethBalance, "dETH");
    console.log("sETH Balance:", balanceInfo.sethBalance, "sETH");
    console.log("Network:", balanceInfo.network);
    console.log("=== End of Wallet Balance Information ===\n");

    res.status(200).json({
      success: true,
      data: balanceInfo
    });

  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

/**
 * @desc    Get all smart contracts information
 * @route   GET /api/dimitarApitest/all-contracts
 * @access  Public
 */
exports.getAllContractsInfo = asyncErrorHandler(async (req, res, next) => {
  try {
    console.log("\n=== Fetching All Smart Contracts Information ===");
    
    // Connect to Holesky network
    const provider = new ethers.JsonRpcProvider(HOLESKY_RPC_URL);
    
    // Create contract instances
    const dethContract = new ethers.Contract(DETH_CONTRACT_ADDRESS, dETH_ABI, provider);
    const sethContract = new ethers.Contract(SETH_CONTRACT_ADDRESS, sETH_ABI, provider);
    const governanceContract = new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, governance_ABI, provider);

    // Fetch dETH info
    const dethName = await dethContract.name();
    const dethSymbol = await dethContract.symbol();
    const dethTotalSupply = await dethContract.totalSupply();
    const dethBalance = await provider.getBalance(DETH_CONTRACT_ADDRESS);

    // Fetch sETH info
    const sethName = await sethContract.name();
    const sethSymbol = await sethContract.symbol();
    const sethTotalSupply = await sethContract.totalSupply();

    // Fetch Governance info
    const proposalCount = await governanceContract.proposalCount();

    const contractsInfo = {
      dETH: {
        address: DETH_CONTRACT_ADDRESS,
        name: dethName,
        symbol: dethSymbol,
        totalSupply: ethers.formatEther(dethTotalSupply),
        contractBalance: ethers.formatEther(dethBalance)
      },
      sETH: {
        address: SETH_CONTRACT_ADDRESS,
        name: sethName,
        symbol: sethSymbol,
        totalSupply: ethers.formatEther(sethTotalSupply)
      },
      governance: {
        address: GOVERNANCE_CONTRACT_ADDRESS,
        proposalCount: Number(proposalCount)
      },
      network: "Holesky Testnet"
    };

    // Log to console
    console.log("\n--- dETH Contract ---");
    console.log("Address:", contractsInfo.dETH.address);
    console.log("Name:", contractsInfo.dETH.name);
    console.log("Symbol:", contractsInfo.dETH.symbol);
    console.log("Total Supply:", contractsInfo.dETH.totalSupply, "dETH");
    console.log("Contract Balance:", contractsInfo.dETH.contractBalance, "ETH");

    console.log("\n--- sETH Contract ---");
    console.log("Address:", contractsInfo.sETH.address);
    console.log("Name:", contractsInfo.sETH.name);
    console.log("Symbol:", contractsInfo.sETH.symbol);
    console.log("Total Supply:", contractsInfo.sETH.totalSupply, "sETH");

    console.log("\n--- Governance Contract ---");
    console.log("Address:", contractsInfo.governance.address);
    console.log("Proposal Count:", contractsInfo.governance.proposalCount);

    console.log("\nNetwork:", contractsInfo.network);
    console.log("=== End of All Smart Contracts Information ===\n");

    res.status(200).json({
      success: true,
      data: contractsInfo
    });

  } catch (error) {
    console.error("Error fetching contracts info:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});
