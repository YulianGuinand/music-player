"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Audio from "../Audio/Audio";
import MusicAlbums from "../MusicAlbums/MusicAlbums";
import MusicDetails from "../MusicDetails/MusicDetails";
import Nav from "../Nav/Nav";
import NoSpan from "../NoSpan/NoSpan";

const Player = () => {
  const [Music, setMusic] = useState([
    {
      title: "Starboy",
      url: "https://aac.saavncdn.com/372/38de816bee7a6df4607f1f0e6822c5bc_320.mp4",
      image: "https://c.saavncdn.com/372/Starboy-English-2016-500x500.jpg",
    },
  ]);
  const [index, setIndex] = useState(0);

  const searchMusc = (title) => {
    const query = title;
    axios
      .get(`https://saavn.dev/api/search/songs?query=${query}`)
      .then((data) => {
        const musics = data.data.data.results;
        const musicsData = [];
        musics.forEach((music, index) => {
          if (index < 5) {
            const title = music.name;
            const image = music.image[2].url;
            const url = music.downloadUrl[4].url;
            const artist = music.artists.primary[0].name;
            musicsData.push({
              title: title,
              url: url,
              image: image,
              artist: artist,
            });
          }
        });
        setMusic(musicsData);
      })
      .catch((err) => console.log(err));
  };

  const onChange = useCallback((event) => {
    let query = event.target.value;
    if (query === "") {
      query = "starboy";
    }
    searchMusc(query);
  });

  useEffect(() => {
    searchMusc("starboy");
  }, []);
  return (
    <>
      <div className="music_modal_container" id="music_modal_container">
        <div className="music_img_container">
          <img src={Music[index].image}></img>
        </div>

        <div className="music_modal_content">
          <NoSpan number={index} />
          <Nav onChangeFunc={onChange} />

          <div className="music_details">
            <MusicDetails
              title={Music[index].title}
              artist={Music[index].artist}
            />

            <Audio
              url={Music[index].url}
              setIndex={setIndex}
              index={index}
              length={Music.length}
            />
          </div>
          <MusicAlbums urlsList={Music} setIndex={setIndex} />
        </div>
      </div>
    </>
  );
};

export default Player;
