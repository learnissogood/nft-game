import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { ethers } from "ethers";

import { gameContractAddress } from "../utils/contract-address";
import Game from "../utils/Game.json";

const ArenaComponent = () => {
  const { switchNetwork, network, account } = useContext(GameContext);
  const [nft, setNft] = useState(null);
  const [boss, setBoss] = useState(null);
  const [attacking, setAttacking] = useState(false);

  const fetchBoss = async () => {
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

        const data = await gameContract.bigBoss();

        console.log(data);

        let item = {
          name: data.name,
          image: "https://cloudflare-ipfs.com/ipfs/" + data.imageURI,
          hp: data.hp.toNumber(),
          maxHp: data.maxHp.toNumber(),
          attackDamage: data.attackDamage.toNumber(),
        };

        setBoss(item);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

        if (data.name === "") {
          setNft(null);
        } else {
          let item = {
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

  const attackBoss = async () => {
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

        setAttacking(true);

        const tx = await gameContract.attackBoss();
        await tx.wait();

        setAttacking(false);

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (network === "Rinkeby") {
      fetchBoss();
      fetchNft();
    }
  }, [network]);

  // if (attacking === true) {
  //   return (
  //     <div className="absolute w-full h-full items-center justify-center">
  //       <h1>Attacking...</h1>
  //     </div>
  //   );
  // }

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
          <div className="flex flex-row justify-around w-full">
            {boss && (
              <div className="w-[350px] pt-8 text-center text-white">
                <div className="border shadow rounded-xl overflow-hidden">
                  <div>
                    <img
                      src={boss.image}
                      alt="bossImage"
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
                      {boss.name}
                    </p>
                  </div>
                  <div className="bg-white h-20">
                    <progress
                      value={boss.hp}
                      max={boss.maxHp}
                      className="w-full h-8"
                    ></progress>
                    <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                      {`${boss.hp} / ${boss.maxHp} HP`}
                    </p>
                  </div>
                  <div>
                    <button
                      className="w-full bg-black h-12"
                      onClick={() => attackBoss()}
                    >
                      <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-2xl font-extrabold pt-2">
                        ATTACK BOSS
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {nft ? (
              <div className="flex items-center justify-center w-[250px] pt-8 text-center text-white">
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
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-[250px] pt-8 text-center text-3xl">
                <h1 className="text-white">You Dont have any Warrior! Please go and MINT one!!</h1>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ArenaComponent;
