import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import CreatePlayerButton from "../CreatePlayerButton";
import AudioUpload from "../MediaUpload/AudioUpload";
import ImageUpload from "../MediaUpload/ImageUpload";
import MintButton from "../MintButton";

const MintingForm = ({ metadata }: any) => {
  console.log("metadata", metadata);
  return (
    <main className={`${styles.main} flex gap-5`}>
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

      <h1 className={`${styles.title} font-medium`}>Minting Form</h1>

      <MintButton metadata={metadata} />
    </main>
  );
};

export default MintingForm;
