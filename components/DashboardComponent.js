import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { ethers } from "ethers";

import { gameContractAddress } from "../utils/contract-address";
import Game from "../utils/Game.json";

const DashboardComponent = () => {
  const { switchNetwork, network, account } = useContext(GameContext);
  const [nft, setNft] = useState(null);

  const fetchNft = async () => {
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

        const data = await gameContract.getMyNFT(account);

        console.log(data);

        if (data.name === "") {
          setNft(null);
        } else {
          let item = {
            characterId: data.characterId.toNumber(),
            name: data.name,
            image: "https://cloudflare-ipfs.com/ipfs/" + data.imageURI,
            hp: data.hp.toNumber(),
            maxHp: data.maxHp.toNumber(),
            attackDamage: data.attackDamage.toNumber(),
          };
          setNft(item);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const healMyNFT = async () => {
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

        const tx = await gameContract.healNFT({ value: ethers.utils.parseEther("0.1") });
        await tx.wait();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (network === "Rinkeby") {
      fetchNft();
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
          <div className="text-center">
            <h3 className="h-20 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-700 text-4xl font-bold mt-2">
              DASHBOARD
            </h3>
          </div>
          <div className="flex justify-center w-full">
            {nft ? (
              <div className="w-[350px] pt-8 text-center text-white">
                <div className="border shadow rounded-xl overflow-hidden">
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
                  <div className="bg-white h-20">
                    <progress
                      value={nft.hp}
                      max={nft.maxHp}
                      className="w-full h-8"
                    ></progress>
                    <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                      {`${nft.hp} / ${nft.maxHp} HP`}
                    </p>
                  </div>
                  <div>
                    <button className="w-full text-white text-xl font-bold bg-black h-12" onClick={() => healMyNFT()}>
                      <a className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-2xl font-extrabold">
                        HEAL
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-center text-3xl pt-[170px]">
                <h1 className="text-white">You dont have any item!</h1>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardComponent;
