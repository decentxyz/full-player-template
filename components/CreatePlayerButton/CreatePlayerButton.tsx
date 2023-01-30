import { useNetwork, useSigner } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { useState } from "react";

const CreatePlayerButton = (props: any) => {
  const { contractAddress } = props;
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!chain || !signer) {
      openConnectModal?.();
      return;
    }
    const recipients = [contractAddress];
    setLoading(true);
    try {
      console.log(
        "TODO: USE DECENT SDK TO CREATE IPFS METADATA IN PLAYLIST JSON FORMAT"
      );
      console.log("TODO: TOAST / REDIRECT to PLAYER? SHARE ON LENS BUTTON");
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
      <h2 className="font-medium">Create Player &rarr;</h2>
    </button>
  );
};

export default CreatePlayerButton;
