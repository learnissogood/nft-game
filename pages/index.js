import { Layout, PageHeader } from "antd";
import Image from "next/image";
import logo from "../public/vercel.svg";
import linkedinLogo from "../public/linkedin.svg";
import githubLogo from "../public/git.svg";
import Link from "next/link";
import { GameContext } from "../context/GameContext";
import { useContext } from "react";
import HomeConnected from "../components/HomeConnected";
import NotConnected from "../components/NotConnected";

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
  const { account, connectWallet } = useContext(GameContext);

  return (
    <>
      {!account ? (
        <Layout>
          <div className="absolute w-full h-full bg-[url('../assets/background.jpg')] bg-contain z-10"></div>
          <div className="fixed bg-gradient-to-b from-black to-transparet h-full w-full z-20"></div>
          <div className="z-30">
            <PageHeader>
              <div className="grid justify-items-stretch">
                <a className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-700 text-4xl font-bold justify-self-center">
                  NEXT GENERATION OF GAMING
                </a>
                <div className="flex items-center text-white text-base cursor-pointer h-10 px-8 pt-3 rounded-full w-auto justify-self-end -mt-10 bg-gradient-to-r from-violet-500 to-fuchsia-500">
                  <button
                    className="mb-3 cursor-pointer"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            </PageHeader>
            <div className="pt-60 text-center text-white">
              <NotConnected />
            </div>
          </div>
          <Footer
            style={{ textAlign: "center", background: "black" }}
            className="z-40 mt-[241px]"
          >
            <h5 className="text-white">
              Created by <strong>Juanchi</strong>
            </h5>
          </Footer>
        </Layout>
      ) : (
        <Layout hasSider>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <div className="p-8">
              <Image src={logo} alt={logo} />
            </div>
            <div className="container flex flex-col items-center">
              <Link href="/">
                <a className="text-white text-2xl font-bold my-8">Home</a>
              </Link>
              <Link href="/mint">
                <a className="text-white text-2xl font-bold my-8">Mint</a>
              </Link>
              <Link href="/arena">
                <a className="text-white text-2xl font-bold my-8">Arena</a>
              </Link>
              <Link href="/dashboard">
                <a className="text-white text-2xl font-bold my-8">Dashboard</a>
              </Link>
              <div className="flex flex-row m-10 pt-4">
                <div className="px-4">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/juan-cruz-yanez/"
                    rel="noopener noreferrer"
                  >
                    <Image src={linkedinLogo} alt={linkedinLogo} />
                  </a>
                </div>
                <div className="px-4">
                  <a
                    target="_blank"
                    href="https://github.com/learnissogood"
                    rel="noopener noreferrer"
                  >
                    <Image src={githubLogo} alt={githubLogo} />
                  </a>
                </div>
              </div>
            </div>
          </Sider>
          <Layout className="ml-[200px]">
            <Content className="h-[100vh] bg-gradient-to-b from-black to-cyan-900">
              <PageHeader>
                <div className="grid justify-items-stretch p-6">
                  <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-700 text-4xl font-bold justify-self-center">
                    NEXT GENERATION OF GAMING
                  </h1>
                  <div className="flex items-center font-bold text-grey text-base h-10 px-8 pt-3 rounded-full w-auto -mt-[55px] justify-self-end bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                    <p>
                      {" "}
                      Wallet: {account.slice(0, 6)}...
                      {account.slice(-4)}{" "}
                    </p>
                  </div>
                </div>
              </PageHeader>
              <HomeConnected />
            </Content>
            <Footer style={{ textAlign: "center", background: "black" }}>
              <h5 className="text-white">
                Created by <strong>Juanchi</strong>
              </h5>
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
}
