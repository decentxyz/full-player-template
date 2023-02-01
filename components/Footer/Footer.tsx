import Image from "next/image";

const Footer = () => (
  <footer className="py-8 border-t border-white text-white">
    <div>
      <p className="flex justify-center pb-4 text-xl">for the musicians 💿</p>
      <a
        className="flex justify-center items-center text-xl"
        href="https://decent.xyz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="pr-4">🏗️</span>
        <Image
          src="/images/decent.png"
          height={18}
          width={100}
          alt="Decent 💪"
        />
      </a>
    </div>
  </footer>
);

export default Footer;
