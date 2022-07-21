const main = async () => {
  const contract = await hre.ethers.getContractFactory("Game");
  const gameContract = await contract.deploy(
    ['Warrior1', 'Warrior2', 'Warrior3'],
    ['QmVX3Qy2FAbaAHbnpCi7BRknLLsnyW9WwvPpVFmED2hBtm',
    'QmPPL7GKHRpq6rRNXeWMvytyzavnBBzW5sM6tyQcYvBef7',
    'QmUtYGD3W2N69mYTUb8UbygTwFuz8iRA7n7avzXKLkriQW'],
    [100, 200, 300],
    [100, 50, 25],
    'Boss',
    'QmWEH9JqxdbhoLUpFoD59jhcLohYh9ePmjyfePZyTYkagx',
    10000,
    50
  );
  await gameContract.deployed();
  console.log("Contract Deployed to: ", gameContract.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();