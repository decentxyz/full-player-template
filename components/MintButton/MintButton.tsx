import { useNetwork, useSigner } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { NFTStorage } from "nft.storage";
import { DecentSDK, edition, ipfs } from "@decent.xyz/sdk";
import getIpfsLink from "../../lib/getIpfsLink";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import Button from "../Button";

const MintButton = ({ metadata, setDeploymentStep }: any) => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isTestnet = () => {
    return chain?.id === 80001 || chain?.id === 5 || chain?.id === 420;
  };

  const getChainName = () => {
    if (chain?.id === 80001) {
      return "mumbai";
    }
    if (chain?.id === 5) {
      return "goerli";
    }
    if (chain?.id === 420) {
      return "optimism-goerli";
    }
  };

  const onClick = async () => {
    if (!chain || !signer) {
      openConnectModal?.();
      return;
    }
    setLoading(true);
    setDeploymentStep(1);
    try {
      const sdk = new DecentSDK(chain.id, signer);
      const response = (await ipfs.createMetadata(metadata)) as any;
      setDeploymentStep(2);
      const contract = await edition.deploy(
        sdk,
        metadata.name,
        metadata.artist,
        false,
        11,
        BigNumber.from("0"),
        0,
        null,
        0,
        0,
        0,
        0,
        0,
        response.url,
        response.url + "?",
        null,
        null,
        () => setDeploymentStep(3),
        () => setDeploymentStep(4),
        undefined
      );
      const tx = await contract.mint(1);
      setDeploymentStep(5);
      await tx.wait();
      setDeploymentStep(0);
      toast.success(
        <a
          href={`https://${
            isTestnet() ? "testnets." : ""
          }opensea.io/assets/${getChainName()}/${contract.address}/0`}
          target="_blank"
          rel="noreferrer"
        >
          view nft here
        </a>
      );

      router.push(
        `https://hq.decent.xyz/${chain.id}/Editions/${contract.address}`
      );
    } catch (err) {
      console.error(err);
      setDeploymentStep(0);
    }
    setLoading(false);
  };

  return (
    <Button disabled={loading} onClick={onClick} text="Mint Player &rarr;" />
  );
};

export default MintButton;
