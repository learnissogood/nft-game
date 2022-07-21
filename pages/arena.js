import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import Link from "next/link";
import { Layout } from "antd";
import Image from "next/image";
import logo from "../public/vercel.svg";
import linkedinLogo from "../public/linkedin.svg";
import githubLogo from "../public/git.svg";
import ArenaComponent from "../components/ArenaComponent";

const { Content, Footer, Sider } = Layout;

const Arena = () => {
  const { account } = useContext(GameContext);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          buttom: 0,
        }}
      >
        <div className="p-8">
          <Image src={logo} alt={"logo-web-digg"} />
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
          <nav className="p-6">
            <div className="grid justify-items-stretch p-6">
              <div className="text-center justify-self-center">
                <h3 className="h-20 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-700 text-4xl font-bold">
                  ATTACK THE BOSS
                </h3>
              </div>
              <div className="flex -mt-[100px] items-center font-bold text-grey text-base h-10 px-8 pt-3 rounded-full w-auto justify-self-end bg-gradient-to-r from-cyan-500 to-fuchsia-500">
                <p>
                  {" "}
                  Wallet: {account.slice(0, 6)}...
                  {account.slice(-4)}{" "}
                </p>
              </div>
            </div>
          </nav>
          <ArenaComponent />
        </Content>
        <Footer style={{ textAlign: "center", background: "black" }}>
          <h5 className="text-white">
            Created by <strong>Juanchi</strong>
          </h5>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Arena;
