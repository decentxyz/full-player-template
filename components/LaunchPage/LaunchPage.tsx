import Image from "next/image";

const LaunchPage = (props: any) => {
  const { onClick } = props;

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <Image src="/images/decent.png" height="100" width="150" alt="logo" />
      <div className="text-white">Dashboard x Decent</div>
      <button
        type="button"
        onClick={onClick}
        className="bg-white text-[#3b1675] font-bold py-2 px-4 rounded-full hover:bg-[#3b1675] hover:text-white"
      >
        enter
      </button>
    </div>
  );
};

export default LaunchPage;
