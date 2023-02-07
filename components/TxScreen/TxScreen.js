import Image from "next/image";
import { DeployBackground } from "../DeployingContract/DeployBackground";
import ProgressModal, { PlayerDeployProgressModal } from "../ProgressModal";

const TxScreen = ({ step, chainName, titleText, hideUpload }) => (
  <div className="absolute inset-0">
    <DeployBackground text={titleText} />
    <div className="relative pt-12 lg:mx-16 mx-10 mb-28 mt-16">
      <div className="flex items-center mt-10 gap-2">
        <Image
          src="/icons/whitestar.png"
          height={12}
          width={12}
          alt="very web3 icon"
        />
        <span className="text-xs font-medium text-white">STEP 1/2</span>
      </div>
      <h3 className="border-b border-white py-2 text-white">{titleText}</h3>
    </div>

    {titleText.includes("Creating") ? (
      <ProgressModal step={step} chain={chainName} hideUpload={hideUpload} />
    ) : (
      <PlayerDeployProgressModal
        step={step}
        chain={chainName}
        hideUpload={hideUpload}
      />
    )}
  </div>
);

export default TxScreen;
