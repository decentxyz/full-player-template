import type { NextPage } from "next";
import SeoHead from "../SeoHead";
import PlayerCreateForm from "../PlayerCreateForm";
import TxScreen from "../TxScreen";
import Footer from "../Footer";
import { useState } from "react";
import MintingForm from "../MintingForm";
import { useNetwork } from "wagmi";

const PlayerCreatePage: NextPage = () => {
  const [metadata, setMetadata] = useState();
  const [deploymentStep, setDeploymentStep] = useState(0);
  const { chain } = useNetwork();

  return (
    <main
      style={{ backgroundImage: "url('/images/bg.png')" }}
      className="w-full min-h-screen bg-cover bg-right-bottom px-8 flex flex-col"
    >
      <SeoHead />
      {deploymentStep > 0 ? (
        <TxScreen
          step={deploymentStep}
          chainName={chain?.name}
          titleText={metadata ? "Deploying" : "Creating Player"}
          hideUpload={false}
        />
      ) : (
        <>
          {metadata ? (
            <MintingForm
              metadata={metadata}
              setDeploymentStep={setDeploymentStep}
              setMetadata={setMetadata}
            />
          ) : (
            <PlayerCreateForm
              setMetadata={setMetadata}
              setDeploymentStep={setDeploymentStep}
            />
          )}
        </>
      )}
      <Footer />
    </main>
  );
};

export default PlayerCreatePage;
