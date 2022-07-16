const { expect, assert } = require("chai");

describe("Game", function () {
  
  let deployer, addr1, addr2, addr3, game, mintPrice;

  before(async function () {

    const Game = await hre.ethers.getContractFactory("Game");

    [deployer, addr1, addr2] = await hre.ethers.getSigners();

    game = await Game.deploy(
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

    mintPrice = await game.mintNFTPrice();
  })

  describe('deployment', async () => {

    it('Game contract is deployed succesfully', async () => {
      const addressGame = await game.address;
      assert.notEqual(addressGame, '');
    });

    it('Game contract should create an ERC721 contract with name "HeroGame"', async () => {
      const name = await game.name();
      assert.equal(name, 'HeroGame');
    })

    it('Game contract should create an ERC721 contract with symbol "HG"', async () => {
      const symbol = await game.symbol();
      assert.equal(symbol, 'HG');
    });

    it('Game contract should create 1 boss', async () => {
      const boss = await game.bigBoss();
      console.log(boss);
    });
    
    it('Game contract should create 3 warriors', async () => {
      const warrior1 = await game.defaultCharacters(0);
      console.log(warrior1);
      const warrior2 = await game.defaultCharacters(1);
      console.log(warrior2);
      const warrior3 = await game.defaultCharacters(2);
      console.log(warrior3);
    });

    it('mintNFTPrice should be equal to 0.1 ether', async () => {
      const price = hre.ethers.utils.formatEther(mintPrice);
      assert.equal(price, 0.1);
    });
  });

  describe('mintNFT', async () => {

    beforeEach(async () => {
      await game.mintCharacterNFT(0, { value: mintPrice });
    });

    it('mintCharacterNFT function should create 1 NFT and the msg.sender should be the owner of that NFT', async () => {
      // const nft = await game.balanceOf(deployer.address);
      // assert.equal(nft.toString(), '1');
      expect(await game.balanceOf(deployer.address)).to.equal(1);
    });
  });
});
