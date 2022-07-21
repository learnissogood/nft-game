import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const NotConnected = () => {
  const { connectWallet } = useContext(GameContext);

  return (
    <div>
      <p className="text-3xl font-extrabold pb-2">
        Please Connect Your Wallet To Use The Dapp
      </p>
      <button
        onClick={connectWallet}
        className="text-black text-xl font-bold bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-700 h-10 px-8 rounded-full"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default NotConnected;
