import Image from "next/image";

const AudioUpload = ({
  audioFile,
  setAudioFile,
  header = "Upload Audio Track(s)",
  subtext = "mp3 or .wav",
}: any) => {
  const updateAudioFile = (e: any) => {
    setAudioFile({
      preview: "/icons/success.png",
      raw: [...e.target.files],
    });
  };

  return (
    <label>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={updateAudioFile}
        multiple
      />
      <div className="relative cursor-pointer w-full flex items-center justify-center border border-gray-400 border-dashed rounded-md mt-6 gap-3 p-2">
        <p style={{ left: 17, top: 9 }}>
          <Image
            title=""
            width={68}
            height={59.23}
            src={audioFile.preview}
            alt="nft image"
          />
        </p>
        <div>
          <p className="upload-header">{header}</p>
          <p className="upload-subtext">{subtext}</p>
        </div>
      </div>
    </label>
  );
};

export default AudioUpload;
