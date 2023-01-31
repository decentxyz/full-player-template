import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import CreatePlayerButton from "../CreatePlayerButton";
import AudioUpload from "../MediaUpload/AudioUpload";
import ImageUpload from "../MediaUpload/ImageUpload";

const PlayerCreateForm = () => {
  const [nftImage, setNftImage] = useState();

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

      <h1 className={`${styles.title} font-medium`}>Player Creator</h1>
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <p className="pb-2 font-medium">Project Name</p>

          <input
            className={`input-text text-black rounded-full p-4`}
            placeholder="XANDYLAND"
            onChange={console.log}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="pb-2 font-medium">Artist Name</p>

          <input
            className={`input-text text-black rounded-full p-4`}
            placeholder="X&ND"
            onChange={console.log}
          />
        </div>
      </div>
      <div className="flex gap-10">
        <ImageUpload
          nftImage={nftImage}
          setNftImage={setNftImage}
          formRegisterName="nftImage"
          label="cover art"
        />
        <AudioUpload
          audioFile={{ preview: "/icons/audio-placeholder.png" }}
          setAudioFile={console.log}
          formRegisterName="audioFile"
        />
      </div>

      <CreatePlayerButton coverArt={nftImage} />
    </main>
  );
};

export default PlayerCreateForm;
