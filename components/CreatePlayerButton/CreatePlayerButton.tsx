import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { NFTStorage } from "nft.storage";
import { ipfs } from "@decent.xyz/sdk";
import getIpfsLink from "../../lib/getIpfsLink";
import Button from "../Button";

const CreatePlayerButton = ({
  coverArt,
  tracks,
  trackNames,
  artist,
  artistNames,
  projectTitle,
  setMetadata,
  setDeploymentStep,
}: any) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    setDeploymentStep(1);
    try {
      const client = new NFTStorage({
        token: String(process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN),
      });

      const contentUris = (await ipfs.createMetadata({
        name: "metadata",
        description: "desc",
        image: coverArt.raw,
        tracks: tracks,
      })) as any;
      setDeploymentStep(2);

      const trackItems = contentUris.data.tracks.map(function (
        item: any,
        index: number
      ) {
        return {
          url: getIpfsLink(item["href"]),
          kind: "audio",
          artist: artistNames[index],
          title: trackNames[index],
        };
      });

      const coverArtUrl = getIpfsLink(contentUris.data.image.href);

      const jsonString = JSON.stringify({
        schemaVersion: "1",
        coverArtUrl: coverArtUrl,
        title: projectTitle,
        artist,
        chain: "",
        contractAddress: "",
        tokenId: "",
        tokenType: "ERC-721",
        hideBranding: true,
        items: trackItems,
      });

      const bytes = new TextEncoder().encode(jsonString);
      const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8",
      });

      setDeploymentStep(3);

      const ipfsResponse = (await client.storeBlob(blob)) as any;

      if (ipfsResponse?.error) throw ipfsResponse?.error;

      const baseAnimationUrl =
        "https://cdn.warpsound.ai/ipfs/QmVYW5vHaV322Kvp2So5ErngP1PrDUneYqo4e9TNygAGSn?playlist-url=";
      const playlistUrl = `https://nftstorage.link/ipfs/${ipfsResponse}`;
      setDeploymentStep(0);

      setMetadata({
        animation_url: baseAnimationUrl + playlistUrl,
        artist,
        name: projectTitle,
        description: "",
        image: coverArt.raw,
      });
    } catch (err) {
      console.error(err);
    }
    setDeploymentStep(0);

    setLoading(false);
  };

  return (
    <Button disabled={loading} text="Create Player &rarr;" onClick={onClick} />
  );
};

export default CreatePlayerButton;
