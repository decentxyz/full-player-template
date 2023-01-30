import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import SeoHead from "../SeoHead";
import Developers from "../Developers";
import { useEffect, useState } from "react";
import Downloads from "../Downloads";

const DashboardPage: NextPage = () => {
  const DEFAULT = "Dashboard Starter Kit";
  const [title, setTitle] = useState(DEFAULT);
  const [audio, setAudio] = useState("" as any);

  useEffect(() => {
    setAudio(
      new Audio(
        "https://nftstorage.link/ipfs/bafybeicpllju7qdpzyjsxm7czwn7wimx2fkq7hfcykf7noumefqgvterrm?id=1"
      )
    );
  }, []);

  const toggle = (newTitle: string) => {
    if (!audio) return;

    if (title === DEFAULT) {
      setTitle(newTitle);
      audio.play();
    } else {
      setTitle(DEFAULT);
      audio.pause();
    }
  };

  return (
    <div className={`${styles.container} background`}>
      <SeoHead />
      <main className={styles.main}>
        <div className="flex items-center gap-4">
          <ConnectButton />
          <Link
            href="https://github.com/SweetmanTech/kpi-dashboard"
            target="_blank"
          >
            <Image
              src="/images/github-mark-white.svg"
              height={22}
              width={22}
              alt="link to repository"
            />
          </Link>
        </div>

        <h1 className={`${styles.title} font-medium`}>{title}</h1>
        <div className="flex gap-20 flex-col sm:flex-row">
          <Developers toggle={toggle} />
          <Downloads toggle={toggle} />
        </div>
      </main>

      <footer className="py-8 border-t border-white text-white">
        <div>
          <p className="flex justify-center pb-4 text-xl">
            for the musicians 💿
          </p>
          <a
            className="flex justify-center items-center text-xl"
            href="https://decent.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="pr-4">🏗️</span>
            <Image
              src="/images/decent.png"
              height={18}
              width={100}
              alt="Decent 💪"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
