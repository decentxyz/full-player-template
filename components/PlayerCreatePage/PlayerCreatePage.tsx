import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
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
    <div className={`${styles.container}`}>
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
    </div>
  );
};

export default PlayerCreatePage;
