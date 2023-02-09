import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import DeployContract from "../DeployContract";
import MintButton from "../MintButton";

const MintingForm = ({ metadata, setDeploymentStep }: any) => {
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
      {metadata?.animation_url && (
        <iframe
          title="HTML in an iframe"
          height={500}
          width={500}
          src={metadata.animation_url}
        />
      )}

      <DeployContract
        metadata={metadata}
        setDeploymentStep={setDeploymentStep}
      />
    </main>
  );
};

export default MintingForm;
