import { useNetwork, useSigner } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { NFTStorage } from "nft.storage";
import { ipfs } from "@decent.xyz/sdk";
import getIpfsLink from "../../lib/getIpfsLink";

const CreatePlayerButton = (props: any) => {
  const { coverArt } = props;
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!chain || !signer) {
      openConnectModal?.();
      return;
    }
    setLoading(true);
    try {
      const client = new NFTStorage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0NUY3MmE2RTE4ZTc1REZBMTA3Qjc3REIzNDM1NDNjOTQzMEI0RmQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Mjc1MDI4MjU5NiwibmFtZSI6IkRFQ0VOVCJ9.KaoP8CYmUESkkDo5XoCMEomfQBZiK7E_hpkMUX8uHFY",
      });

      console.log("nftImage", coverArt);

      const contentUris = (await ipfs.createMetadata({
        name: "metadata",
        description: "desc",
        image: coverArt.raw,
      })) as any;
      console.log("contentUris", contentUris);
      const coverArtUrl = getIpfsLink(contentUris.data.image.href);
      console.log("image", coverArtUrl);

      const jsonString = JSON.stringify({
        schemaVersion: "1",
        coverArtUrl: coverArtUrl,
        title: "the record store_best of (2022)",
        artist: "Nayomi",
        chain: "Ethereum",
        contractAddress: "0xeacf3bc37a3bf1c1166a0d9a4df3f1679c26b52e",
        tokenId: "1",
        tokenType: "ERC-1155",
        hideBranding: false,
        items: [
          {
            kind: "audio",
            title: "Lonely",
            artist: "X&ND",
            url: "https://maroon-quickest-ocelot-736.mypinata.cloud/ipfs/QmfQRWph2EGZi6CnLF3w2DWGt57FHRYxXKTBDVUiGFhJhy/LONELY_X_ND--online-audio-convert.com.mp3",
          },
          {
            kind: "audio",
            title: "Beg For It (Explicit)",
            artist: "X&ND",
            url: "https://maroon-quickest-ocelot-736.mypinata.cloud/ipfs/QmfQRWph2EGZi6CnLF3w2DWGt57FHRYxXKTBDVUiGFhJhy/BEG%20FOR%20IT%28EXPLICIT%29_X_ND--online-audio-convert.com.mp3",
          },
          {
            kind: "audio",
            title: "Can You Let Me In? (feat Melody Wagner)",
            artist: "X&ND",
            url: "https://maroon-quickest-ocelot-736.mypinata.cloud/ipfs/QmfQRWph2EGZi6CnLF3w2DWGt57FHRYxXKTBDVUiGFhJhy/CAN%20YOU%20LET%20ME%20IN_X_ND_Melodie%20Wagner--online-audio-convert.com.mp3",
          },
        ],
      });

      const bytes = new TextEncoder().encode(jsonString);
      const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8",
      });

      const ipfsResponse = (await client.storeBlob(blob)) as any;

      console.log("ipfsResponse", ipfsResponse);
      if (ipfsResponse?.error) throw ipfsResponse?.error;
      console.log(
        "TODO: DECENT SDK TO CREATE IPFS METADATA IN PLAYLIST JSON FORMAT"
      );

      const baseAnimationUrl =
        "https://cdn.warpsound.ai/ipfs/QmVYW5vHaV322Kvp2So5ErngP1PrDUneYqo4e9TNygAGSn?playlist-url=";
      const playlistUrl = `https://nftstorage.link/ipfs/${ipfsResponse}`;
      toast.success(
        <a
          target="_blank"
          rel="noreferrer"
          href={baseAnimationUrl + playlistUrl}
        >
          View your player here
        </a>,
        { autoClose: false }
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
