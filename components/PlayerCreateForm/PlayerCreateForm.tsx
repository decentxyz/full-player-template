import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import CreatePlayerButton from "../CreatePlayerButton";
import Playlist from "../Playlist";
import AudioUpload from "../MediaUpload/AudioUpload";
import ImageUpload from "../MediaUpload/ImageUpload";

const PlayerCreateForm = ({ setMetadata, setDeploymentStep }: any) => {
  const [nftImage, setNftImage] = useState();
  const [audioTracks, setAudioTracks] = useState([]);
  const [trackNames, setTrackNames] = useState([] as string[]);
  const [artists, setArtists] = useState([] as string[]);
  const [artist, setArtist] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  const updateTrackList = (newTracks: any) => {
    setAudioTracks(newTracks);
    setArtists(Array(newTracks.length).fill(artist) as any);
    const newTrackNames = newTracks.map((track: any) => track.name);
    setTrackNames(newTrackNames);
  };

  const handleTrackOrderChange = (
    trackNumber: number,
    isMoveEarlier: boolean
  ) => {
    const newTrackArray = [...audioTracks];
    const newArtistArray = [...artists];
    const newTrackNameArray = [...trackNames];
    const item1Index = trackNumber;
    const item2Index = isMoveEarlier ? trackNumber - 1 : trackNumber + 1;

    [newTrackArray[item1Index], newTrackArray[item2Index]] = [
      newTrackArray[item2Index],
      newTrackArray[item1Index],
    ];

    [newArtistArray[item1Index], newArtistArray[item2Index]] = [
      newArtistArray[item2Index],
      newArtistArray[item1Index],
    ];

    [newTrackNameArray[item1Index], newTrackNameArray[item2Index]] = [
      newTrackNameArray[item2Index],
      newTrackNameArray[item1Index],
    ];

    setAudioTracks(newTrackArray);
    setArtists(newArtistArray);
    setTrackNames(newTrackNameArray);
  };

  const handleArtistChange = (trackNumber: number, value: string) => {
    const newArtistNames: string[] = [...artists];
    newArtistNames[trackNumber] = value;
    setArtists(newArtistNames);
    return false;
  };

  const handleTrackChange = (trackNumber: number, value: string) => {
    const newTrackNames: string[] = [...trackNames];
    newTrackNames[trackNumber] = value;
    setTrackNames(newTrackNames);
    return false;
  };

  const hasAudioTracks = audioTracks.length > 0;

  return (
    <main className={`${styles.main} flex gap-5`}>
      <div className="flex items-center gap-4">
        <ConnectButton />
        <Link
          href="https://github.com/SweetmanTech/kpi-dashboard"
          target="_blank"
        >
          <Image
            src="/images/github-mark-white.svg"
            height={22}
            width={22}
            alt="link to repository"
          />
        </Link>
      </div>

      <h1 className={`${styles.title} font-medium`}>Player Creator</h1>
      <p className="text-center">
        Welcome to the Music NFT Player Creator, a gateway to the harmonious
        fusion of onchain and offchain artistry. It empowers musicians to
        unleash their creative energies, imprinting them onto the blockchain as
        ethereal offerings for the world to behold. Unlike other music NFTs, the
        player within each unique creation invites listeners on a journey of
        sound and emotion, elevating the musical experience to a higher plane.{" "}
        <a
          href="https://sweetman-eth.gitbook.io/music-nft-player/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#3b1675]"
        >
          Learn more here.
        </a>
      </p>
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <p className="pb-2 font-medium">Project Name</p>

          <input
            className={`input-text text-black rounded-full p-4`}
            placeholder="XANDYLAND"
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="pb-2 font-medium">Artist Name</p>

          <input
            className={`input-text text-black rounded-full p-4`}
            placeholder="X&ND"
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-10">
        <ImageUpload
          nftImage={nftImage}
          setNftImage={setNftImage}
          label="cover art"
        />
        <AudioUpload
          previewImage={
            hasAudioTracks
              ? "/icons/success.png"
              : "/icons/audio-placeholder.png"
          }
          setAudioFile={updateTrackList}
          header={hasAudioTracks ? `${audioTracks.length} track(s)` : undefined}
          subtext={audioTracks ? " " : undefined}
        />
      </div>

      <Playlist
        tracks={trackNames}
        artists={artists}
        handleTrackOrderChange={handleTrackOrderChange}
        handleArtistChange={handleArtistChange}
        handleTrackChange={handleTrackChange}
      />

      <CreatePlayerButton
        coverArt={nftImage}
        tracks={audioTracks}
        trackNames={trackNames}
        projectTitle={projectTitle}
        artist={artist}
        artistNames={artists}
        setMetadata={setMetadata}
        setDeploymentStep={setDeploymentStep}
      />
    </main>
  );
};

export default PlayerCreateForm;
