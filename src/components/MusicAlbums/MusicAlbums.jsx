const MusicAlbums = ({ urlsList, setIndex }) => {
  const onClickFun = (number) => {
    setIndex(number.target.className);
  };

  return (
    <div className="music_albums">
      {urlsList.map(({ image }, i) => {
        return (
          <div key={i} onClick={onClickFun}>
            <img className={i} src={image}></img>
          </div>
        );
      })}
    </div>
  );
};

export default MusicAlbums;
