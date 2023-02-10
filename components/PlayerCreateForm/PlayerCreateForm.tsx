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
    <main style={{ backgroundImage: "url('/images/bg.png')"}} className="w-screen min-h-screen bg-cover">
      <div className="min-h-screen grid md:grid-cols-2 grid-cols-1">
        <div className="flex flex-wrap items-center">
          <div className="space-y-8">
            <h1>Create Player</h1>
            <p className="w-2/3">
              Step 1 / 2: Upload the media that you would like to include in your full player NFT.{" "}
              <a
                href="https://sweetman-eth.gitbook.io/music-nft-player/"
                target="_blank"
                rel="noreferrer"
                className="font-medium tracking-widest text-sm hover:text-violet-700"
              >
                Learn more here.
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div>
            <div className="flex gap-10">
              <div>
                <p className="pb-2 font-medium">Project Name</p>
                <input
                  className={`input-text text-black rounded-full py-2 px-4 border border-black`}
                  placeholder="Artist name"
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>
              <div>
                <p className="pb-2 font-medium">Artist Name</p>
                <input
                  className={`input-text text-black rounded-full  py-2 px-4 border border-black`}
                  placeholder="X&ND"
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-8">
              <ImageUpload
                nftImage={nftImage}
                setNftImage={setNftImage}
                label="Cover art"
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlayerCreateForm;
