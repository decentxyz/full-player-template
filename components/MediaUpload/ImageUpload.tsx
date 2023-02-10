import Image from "next/image";

const ImageUpload = ({ nftImage, setNftImage, label }: any) => {
  const updateNftImage = (e: any) => {
    if (e.target.files.length) {
      setNftImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <label>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={updateNftImage}
      />
      <div className="relative cursor-pointer w-full flex items-center justify-center border border-gray-400 border-dashed rounded-md mt-6 gap-3 p-2">
        <p style={{ left: 17, top: 9 }}>
          <Image
            title=""
            width={30}
            height={26.32}
            src={nftImage?.preview || "/icons/img-placeholder.png"}
            alt="nft image"
          />
        </p>
        <div>
          <p className="upload-header">{label}</p>
          <p className="upload-subtext">Image, video, pdfs, 3D {"&"} html</p>
        </div>
      </div>
    </label>
  );
};

export default ImageUpload;
