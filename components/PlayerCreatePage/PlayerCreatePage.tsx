import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useForm, FormProvider } from "react-hook-form";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import SeoHead from "../SeoHead";
import ImageUpload from "../MediaUpload/ImageUpload";
import AudioUpload from "../MediaUpload/AudioUpload";
import CreatePlayerButton from "../CreatePlayerButton";

const PlayerCreatePage: NextPage = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
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

          <h1 className={`${styles.title} font-medium`}>Player Creator</h1>
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <p className="pb-2 font-medium">Project Name</p>

              <input
                className={`input-text text-black rounded-full p-4`}
                placeholder="X&NDYLAND"
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
          <ImageUpload
            nftImage={{ preview: "/icons/img-placeholder.png" }}
            setNftImage={console.log}
            formRegisterName="formRegisterName"
            label="cover art"
          />
          <AudioUpload
            audioFile={{ preview: "/icons/audio-placeholder.png" }}
            setAudioFile={console.log}
            formRegisterName="formRegisterName"
          />
          <CreatePlayerButton />
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
    </FormProvider>
  );
};

export default PlayerCreatePage;
