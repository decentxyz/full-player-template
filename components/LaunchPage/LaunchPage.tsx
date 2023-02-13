import Button from "../Button";
import Image from "next/image";

const LaunchPage = (props: any) => {
  const { onClick } = props;

  return (
    <div
      style={{ backgroundImage: "url('/images/bg.png')" }}
      className="bg-cover bg-right-bottom flex flex-col"
    >
      <Image className="object-contain object-right-bottom pl-16" src="/images/landing-bg.png" fill alt="bg" />
      <div className="min-h-screen grid md:grid-cols-2 grid-cols-1 relative">
        <div className="flex items-center justify-center">
          <div className="space-y-4">
            <h3>Application NFTs</h3>
            <h1 className="pb-4">
              Decent Full Audio<br></br> Player
            </h1>
            <Button text="Create yours" onClick={onClick} />
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          <iframe
            className="w-[350px] h-[350px] rounded-lg z-10"
            src="https://cdn.warpsound.ai/ipfs/QmVYW5vHaV322Kvp2So5ErngP1PrDUneYqo4e9TNygAGSn?playlist-url=https://nftstorage.link/ipfs/bafkreie4vojz7dj4iiy2k5kwzimq772xajwpkc6gmmxi2b3qv7r476aq5q"
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;
