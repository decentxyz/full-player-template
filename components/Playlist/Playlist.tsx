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
        <div key={"key" + index} className="flex">
          <div className="flex flex-col">
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
          <li className="flex">
            <input
              className="text-black rounded-full p-5"
              placeholder={artists[index]}
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
          </li>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
