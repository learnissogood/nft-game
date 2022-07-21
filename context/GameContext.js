import { createContext, useState, useEffect } from "react";
import { networks } from "../utils/networks";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        throw new Error(
          "No Ethereum browser detected. Please Download MetaMask."
        );
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x4",
                  chainName: "Rinkeby",
                  rpcUrls: ["https://rinkeby.infura.io/v3/"],
                  nativeCurrency: {
                    name: "Rinkeby ETH",
                    symbol: "RinkebyETH",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://rinkeby.etherscan.io"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      alert("No Ethereum browser detected. Please Download MetaMask.");
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask");
      return;
    } else {
      console.log("We have the Ethereum object!", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setAccount(account);
    } else {
      console.log("No Authorized Account Found");
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    console.log(chainId);
    setNetwork(networks[chainId]);

    ethereum.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <GameContext.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnected,
        account,
        setAccount,
        network,
        setNetwork,
        switchNetwork,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
