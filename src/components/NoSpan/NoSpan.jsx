const NoSpan = ({ number }) => {
  return (
    <div className="music_no_container">
      <span className="no_big music_no">0{parseInt(number) + 1}</span>
      <span className="no_small music_no">0{parseInt(number) + 1}</span>
    </div>
  );
};

export default NoSpan;
