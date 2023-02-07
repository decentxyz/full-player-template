import Image from "next/image";
import Button from "../Button";

const LaunchPage = (props: any) => {
  const { onClick } = props;

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <Image src="/images/decent.png" height="100" width="150" alt="logo" />
      <div className="text-white">Warp Sound x Decent</div>
      <Button text="enter" onClick={onClick} />
    </div>
  );
};

export default LaunchPage;
