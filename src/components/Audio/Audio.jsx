import { useEffect, useRef, useState } from "react";

const Audio = ({ url, setIndex, index, length }) => {
  // STATE
  const [isPlaying, setisPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);

  // REFERENCES
  const audioPlayer = useRef(); // reference for audio components
  const progressBar = useRef(); // reference for progressBar
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setisPlaying(!isPlaying);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    progressBar.current.value = audioPlayer.current.currentTime;
    setcurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setcurrentTime(progressBar.current.value);
  };

  const prevMusic = () => {
    setIndex((parseInt(index) - 1) % length);
  };

  const nextMusic = () => {
    setIndex((parseInt(index) + 1) % length);
  };

  return (
    <div className="audioContainer">
      <div className="progress_bar" id="progress_bar">
        <div className="progress_bar_times">
          <span id="currentTime">{calculateTime(currentTime)}</span>
          <span id="duration">
            {duration && !isNaN(duration) && calculateTime(duration)}
          </span>
        </div>
        <input
          ref={progressBar}
          onChange={changeRange}
          className="progress"
          type="range"
          defaultValue="0"
        />
      </div>

      <audio ref={audioPlayer} src={url}></audio>

      <div className="controls">
        <button onClick={prevMusic} id="prev" className="action_btn">
          <svg
            className="w-10 h-10 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </button>

        <button
          onClick={togglePlayPause}
          id="play"
          className="action_btn action_btn_big"
        >
          {isPlaying ? (
            <svg
              id="pause_btn"
              className="w-10 h-10 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 6H8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 0h-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"
              />
            </svg>
          ) : (
            <svg
              id="play_btn"
              className="w-10 h-10 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 18V6l8 6-8 6Z"
              />
            </svg>
          )}
        </button>

        <button onClick={nextMusic} id="next" className="action_btn">
          <svg
            className="w-10 h-10 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Audio;
