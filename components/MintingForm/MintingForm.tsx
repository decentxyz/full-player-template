import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import CreatePlayerButton from "../CreatePlayerButton";
import AudioUpload from "../MediaUpload/AudioUpload";
import ImageUpload from "../MediaUpload/ImageUpload";
import MintButton from "../MintButton";

const MintingForm = ({ metadata, setDeploymentStep }: any) => {
  const [htmlPlayer, setHtmlPlayer] = useState("");
  console.log("metadata", metadata);
  console.log(metadata.animation_url);

  useEffect(() => {
    const init = async () => {
      const response = await axios.get(metadata.animation_url);
      // const text = await response.text();
      console.log("data", response);
      setHtmlPlayer(response.data);
    };

    if (!metadata.animation_url) return;
    init();
  }, [metadata]);
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

      <h1 className={`${styles.title} font-medium`}>
        ⬇️ mint your player onchain ⬇️
      </h1>
      {htmlPlayer && (
        <iframe
          title="HTML in an iframe"
          height={500}
          width={500}
          src={metadata.animation_url}
        />
      )}

      <MintButton metadata={metadata} setDeploymentStep={setDeploymentStep} />
    </main>
  );
};

export default MintingForm;
