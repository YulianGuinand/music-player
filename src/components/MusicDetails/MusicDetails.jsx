const MusicDetails = ({ title, artist }) => {
  return (
    <>
      <span className="title" id="title">
        {title}
      </span>
      <span className="artist" id="artist">
        {artist}
      </span>
    </>
  );
};

export default MusicDetails;
