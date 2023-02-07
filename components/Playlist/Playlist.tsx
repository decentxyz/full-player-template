const Playlist = ({ audioTracks, artists, handleTrackOrderChange }: any) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {audioTracks.map((track: any, index: number) => (
        <div key={track.name} className="flex">
          <div className="flex flex-col">
            {index > 0 && (
              <button onClick={() => handleTrackOrderChange(index, true)}>
                up
              </button>
            )}
            {index < audioTracks.length - 1 && (
              <button onClick={() => handleTrackOrderChange(index, false)}>
                down
              </button>
            )}
          </div>
          <li className="flex">
            <input
              className="text-black rounded-full p-5"
              value={artists[index]}
            />
            <input
              className="text-black rounded-full p-5"
              value={track["name"]}
            />
          </li>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
