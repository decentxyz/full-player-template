import Image from "next/image";

const Footer = () => (
  <footer className="py-8 border-t border-black">
    <div>
      <a
        className="flex justify-center items-center text-xl"
        href="https://decent.xyz"
        target="_blank"
        rel="noopener noreferrer"
      >
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
