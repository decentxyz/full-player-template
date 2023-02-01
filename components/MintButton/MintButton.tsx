import { useNetwork, useSigner } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { NFTStorage } from "nft.storage";
import { DecentSDK, edition, ipfs } from "@decent.xyz/sdk";
import getIpfsLink from "../../lib/getIpfsLink";
import { BigNumber } from "ethers";

const MintButton = ({ metadata }: any) => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(false);

  const isTestnet = () => {
    return chain?.id === 80001 || chain?.id === 5 || chain?.id === 420;
  };

  const onClick = async () => {
    if (!chain || !signer) {
      openConnectModal?.();
      return;
    }
    setLoading(true);
    try {
      const sdk = new DecentSDK(chain.id, signer);
      console.log("sdk", sdk);
      console.log("metadata", metadata);
      const response = (await ipfs.createMetadata(metadata)) as any;
      console.log("IPFS", response);
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
        console.log,
        console.log,
        undefined
      );
      console.log("contract", contract);
      const tx = await contract.mint(1);
      await tx.wait();
      toast.success(
        <a
          href={`https://${isTestnet() ? "testnets." : ""}opensea.io/assets/${
            chain.name
          }/${contract.address}/0`}
          target="_blank"
          rel="noreferrer"
        >
          view nft here
        </a>
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={onClick}
      className={`${styles.card} disabled:opacity-75`}
      disabled={loading}
    >
      <h2 className="font-medium">Mint Player &rarr;</h2>
    </button>
  );
};

export default MintButton;