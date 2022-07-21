//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Game is ERC721("HeroGame", "HG") {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant mintNFTPrice = 0.1 ether;

    struct CharacterAttributes {
        uint256 characterId;
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
    }

    struct BigBoss {
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
    }

    BigBoss public bigBoss;

    CharacterAttributes[] defaultCharacters;

    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;
    mapping(address => uint256) public nftHolders;

    constructor(
        string[] memory _characterNames,
        string[] memory _characterImageURIs,
        uint256[] memory _characterHPs,
        uint256[] memory _characterAttackDamages,
        string memory _bossName,
        string memory _bossImageURI,
        uint256 _bossHp,
        uint256 _bossAttackDamage
    ) {
        for (uint256 i = 0; i < _characterNames.length; i++) {
            defaultCharacters.push(
                CharacterAttributes({
                    characterId: i,
                    name: _characterNames[i],
                    imageURI: _characterImageURIs[i],
                    hp: _characterHPs[i],
                    maxHp: _characterHPs[i],
                    attackDamage: _characterAttackDamages[i]
                })
            );
        }

        bigBoss = BigBoss({
            name: _bossName,
            imageURI: _bossImageURI,
            hp: _bossHp,
            maxHp: _bossHp,
            attackDamage: _bossAttackDamage
        });
    }

    function getAllDefaultCharacters()
        public
        view
        returns (CharacterAttributes[] memory)
    {
        return defaultCharacters;
    }

    function getMyNFT(address owner) public view returns (CharacterAttributes memory) {
        uint256 myTokenId = nftHolders[owner];
        return nftHolderAttributes[myTokenId];
    }

    function mintCharacterNFT(uint256 _characterId) external payable {
        require(balanceOf(msg.sender) == 0, 'You already have an NFT');
        require(
            msg.value == mintNFTPrice,
            "You must pay the price of minting a character NFT"
        );

        _tokenIds.increment();
        uint256 currentId = _tokenIds.current();

        _safeMint(msg.sender, currentId);

        nftHolderAttributes[currentId] = CharacterAttributes({
            characterId: _characterId,
            name: defaultCharacters[_characterId].name,
            imageURI: defaultCharacters[_characterId].imageURI,
            hp: defaultCharacters[_characterId].hp,
            maxHp: defaultCharacters[_characterId].maxHp,
            attackDamage: defaultCharacters[_characterId].attackDamage
        });

        nftHolders[msg.sender] = currentId;
    }

    function attackBoss() external {
        uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
        CharacterAttributes storage player = nftHolderAttributes[
            nftTokenIdOfPlayer
        ];

        require(player.hp > 0, "Player is dead");
        require(bigBoss.hp > 0, "Boss is dead");

        if (bigBoss.hp < player.attackDamage) {
            bigBoss.hp = 0;
        } else {
            bigBoss.hp -= player.attackDamage;
        }

        if (player.hp < bigBoss.attackDamage) {
            player.hp = 0;
        } else {
            player.hp -= bigBoss.attackDamage;
        }
    }

    function healNFT() external payable {
        uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
        CharacterAttributes storage player = nftHolderAttributes[
            nftTokenIdOfPlayer
        ];

        require(player.hp < player.maxHp, "Player is already at max hp");
        require(msg.value == 0.1 ether, "Heal price is 0.1 ether");

        player.hp = player.maxHp;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        CharacterAttributes memory characterAttributes = nftHolderAttributes[
            _tokenId
        ];

        string memory strHp = Strings.toString(characterAttributes.hp);
        string memory strMaxHp = Strings.toString(characterAttributes.maxHp);
        string memory strAttackDamage = Strings.toString(
            characterAttributes.attackDamage
        );

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                characterAttributes.name,
                " -- NFT #: ",
                Strings.toString(_tokenId),
                '", "description": "This is an NFT that lets people play in the game Empanadas Battle!", "image": "',
                characterAttributes.imageURI,
                '", "attributes": [ { "trait_type": "Health Points", "value": ',
                strHp,
                ', "max_value":',
                strMaxHp,
                '}, { "trait_type": "Attack Damage", "value": ',
                strAttackDamage,
                "} ]}"
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        return output;
    }
}
