const Playlist = ({
  tracks,
  artists,
  handleTrackOrderChange,
  handleArtistChange,
  handleTrackChange,
}: any) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {tracks.map((track: any, index: number) => (
        <div key={"key" + index} className="flex justify-center gap-10">
          <div className="flex flex-col justify-center">
            {index > 0 && (
              <button onClick={() => handleTrackOrderChange(index, true)}>
                up
              </button>
            )}
            {index < tracks.length - 1 && (
              <button onClick={() => handleTrackOrderChange(index, false)}>
                down
              </button>
            )}
          </div>

          <input
            className="text-black rounded-full p-5"
            value={artists[index]}
            onChange={(e) => handleArtistChange(index, e.target.value)}
          />
          <input
            className="text-black rounded-full p-5"
            value={track}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleTrackChange(index, e.target.value);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Playlist;
