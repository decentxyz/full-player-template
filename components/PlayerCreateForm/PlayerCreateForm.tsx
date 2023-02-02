import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import CreatePlayerButton from "../CreatePlayerButton";
import AudioUpload from "../MediaUpload/AudioUpload";
import ImageUpload from "../MediaUpload/ImageUpload";

const PlayerCreateForm = ({ setMetadata, setDeploymentStep }: any) => {
  const [nftImage, setNftImage] = useState();
  const [audioTracks, setAudioTracks] = useState();
  const [artist, setArtist] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

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
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="pb-2 font-medium">Artist Name</p>

          <input
            className={`input-text text-black rounded-full p-4`}
            placeholder="X&ND"
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-10">
        <ImageUpload
          nftImage={nftImage}
          setNftImage={setNftImage}
          label="cover art"
        />
        <AudioUpload
          audioFile={{
            preview: audioTracks
              ? "/icons/success.png"
              : "/icons/audio-placeholder.png",
          }}
          setAudioFile={setAudioTracks}
          header={audioTracks && `${audioTracks["raw"]["length"]} track(s)`}
          subtext={audioTracks && " "}
        />
      </div>

      <CreatePlayerButton
        coverArt={nftImage}
        tracks={audioTracks}
        projectTitle={projectTitle}
        artist={artist}
        setMetadata={setMetadata}
        setDeploymentStep={setDeploymentStep}
      />
    </main>
  );
};

export default PlayerCreateForm;
