import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { ethers } from "ethers";

import { gameContractAddress } from "../utils/contract-address";
import Game from "../utils/Game.json";

const HomeConnected = () => {
  const { switchNetwork, network } = useContext(GameContext);
  const [nfts, setNfts] = useState([]);

  const fetchNfts = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(
          gameContractAddress,
          Game.abi,
          signer
        );

        const data = await gameContract.getAllDefaultCharacters();

        console.log(data);

        const items = await Promise.all(
          data.map(async (i) => {
            let item = {
              name: i.name,
              image: "https://cloudflare-ipfs.com/ipfs/" + i.imageURI,
              hp: i.hp.toNumber(),
              maxHp: i.maxHp.toNumber(),
              attackDamage: i.attackDamage.toNumber(),
            };
            return item;
          })
        );
        setNfts(items);
        setLoadingState(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (network === 'Rinkeby') {
      fetchNfts();
    }
  }, [network]);

  return (
    <div>
      {network !== "Rinkeby" ? (
        <div className="flex flex-col justify-center items-center m-[200px]">
          <p className="text-2xl text-white pb-2">
            Please switch to Rinkeby Testnet
          </p>
          <button
            onClick={switchNetwork}
            className="text-black text-xl font-bold bg-gradient-to-r from-cyan-500 to-fuchsia-500 h-10 px-8 rounded-full"
          >
            Switch
          </button>
        </div>
      ) : (
        <>
          <div className="m-16 text-center">
            <h1 className="text-xl font-bold text-white">
              ARE YOU READY TO JOIN TO THIS NEW WORLD?
            </h1>
          </div>
          <div className="text-center">
            <h3 className="text-white text-[15px]">
              Mint your Own NFT and fight for freedom
            </h3>
          </div>
          <div className="grid lg:grid-cols-3 gap-16 pt-8 p-20 w-full h-auto text-center text-white">
            {nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <div>
                  <img
                    src={nft.image}
                    alt="nftImage"
                    width="auto"
                    height="auto"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                  <p
                    style={{ height: "10px" }}
                    className="text-2xl font-semibold"
                  >
                    {nft.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeConnected;
