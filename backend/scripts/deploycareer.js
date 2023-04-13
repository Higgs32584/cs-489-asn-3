const hre = require("hardhat");

async function main() {
  const CareerFair = await hre.ethers.getContractFactory("CareerFair");
  const careerFair = await CareerFair.deploy();

  await careerFair.deployed();

  console.log("CareerFair contract deployed to:", careerFair.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });