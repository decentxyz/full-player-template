import { ConnectButton } from "@rainbow-me/rainbowkit";
import DeployContract from "../DeployContract";

const MintingForm = ({ metadata, setMetadata, setDeploymentStep }: any) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="flex flex-wrap items-center">
        <div className="space-y-8 sm:pl-11">
          <h1>Create Player</h1>
          <p className="w-2/3">
            Step 2 / 2: Enter the information you would like to include in your
            contract, connect your wallet, and deploy your player as an NFT.
          </p>
          <ConnectButton />
          {metadata?.animation_url && (
            <iframe
              title="HTML in an iframe"
              height={350}
              width={350}
              src={metadata.animation_url}
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center sm:pt-10 sm:pr-3">
        <div className="space-y-8">
          <DeployContract
            metadata={metadata}
            setDeploymentStep={setDeploymentStep}
            setMetadata={setMetadata}
          />
        </div>
      </div>
    </div>
  );
};

export default MintingForm;
