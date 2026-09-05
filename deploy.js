const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying Rovyn with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Point this at wherever you're hosting unrevealed placeholder metadata
  // (Cloudinary, IPFS, etc.) before mint opens.
  const UNREVEALED_URI = process.env.UNREVEALED_URI ||
    "https://rovyn.xyz/metadata/unrevealed.json";

  const Rovyn = await hre.ethers.getContractFactory("Rovyn");
  const rovyn = await Rovyn.deploy(UNREVEALED_URI, deployer.address);
  await rovyn.waitForDeployment();

  const address = await rovyn.getAddress();
  console.log("Rovyn deployed to:", address);
  console.log("");
  console.log("Next steps:");
  console.log("1. Verify:  npx hardhat verify --network", hre.network.name, address, `"${UNREVEALED_URI}"`, deployer.address);
  console.log("2. Call setMintOpen(true) when you're ready to go live.");
  console.log("3. After mint, call setBaseURI() with your revealed metadata folder.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
