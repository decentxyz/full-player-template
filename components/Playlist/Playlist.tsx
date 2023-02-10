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
        <div key={"key" + index} className="flex gap-10">
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
            className="text-black rounded-full px-4 py-2 border border-black"
            value={artists[index]}
            onChange={(e) => handleArtistChange(index, e.target.value)}
          />
          <input
            className="text-black rounded-full px-4 py-2 border border-black"
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
