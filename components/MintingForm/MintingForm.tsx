import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import DeployContract from "../DeployContract";

const MintingForm = ({ metadata, setDeploymentStep }: any) => {
  return (
    <main style={{ backgroundImage: "url('/images/bg.png')"}} className="w-screen min-h-screen bg-cover">
      <div className="min-h-screen grid md:grid-cols-2 grid-cols-1">
        <div className="flex flex-wrap items-center">
          <div className="space-y-8">
            <h1>Create Player</h1>
            <p className="w-2/3">
              Step 2 / 2: Enter the information you would like to include in your contract, connect your wallet, and deploy your player as an NFT.
            </p>
            <ConnectButton />
          </div>
        </div>   
        <div className="flex flex-wrap items-center">
          <div className="space-y-8">
            {metadata?.animation_url && (
              <iframe
                title="HTML in an iframe"
                height={350}
                width={350}
                src={metadata.animation_url}
              />
            )}
            <DeployContract
              metadata={metadata}
              setDeploymentStep={setDeploymentStep}
              />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MintingForm;
