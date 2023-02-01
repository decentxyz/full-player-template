import { useNetwork, useSigner } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { NFTStorage } from "nft.storage";
import { ipfs } from "@decent.xyz/sdk";
import getIpfsLink from "../../lib/getIpfsLink";

const CreatePlayerButton = ({
  coverArt,
  tracks,
  artist,
  projectTitle,
}: any) => {
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
        token: String(process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN),
      });
      const trackNames = tracks.raw.map((track: any) => {
        return track.name;
      });

      const contentUris = (await ipfs.createMetadata({
        name: "metadata",
        description: "desc",
        image: coverArt.raw,
        tracks: tracks.raw,
      })) as any;
      const trackItems = contentUris.data.tracks.map(function (
        item: any,
        index: number
      ) {
        return {
          url: getIpfsLink(item["href"]),
          kind: "audio",
          artist: artist,
          title: trackNames[index],
        };
      });

      const coverArtUrl = getIpfsLink(contentUris.data.image.href);

      const jsonString = JSON.stringify({
        schemaVersion: "1",
        coverArtUrl: coverArtUrl,
        title: projectTitle,
        artist,
        chain: "Ethereum",
        contractAddress: "0xeacf3bc37a3bf1c1166a0d9a4df3f1679c26b52e",
        tokenId: "1",
        tokenType: "ERC-721",
        hideBranding: true,
        items: trackItems,
      });

      const bytes = new TextEncoder().encode(jsonString);
      const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8",
      });

      const ipfsResponse = (await client.storeBlob(blob)) as any;

      if (ipfsResponse?.error) throw ipfsResponse?.error;

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
