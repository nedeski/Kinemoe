import { useEffect, useRef, useState } from "react";
import "./player.css";
import { faPlay as play } from "@fortawesome/free-solid-svg-icons";
import { faPause as pause } from "@fortawesome/free-solid-svg-icons";
import { faBackward as backward } from "@fortawesome/free-solid-svg-icons";
import { faForward as forward } from "@fortawesome/free-solid-svg-icons";
import { faExpand as expand } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard as keyboard } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh as volume } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute as mute } from "@fortawesome/free-solid-svg-icons";
import { faComments as comments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogedInContext } from "../../context/LogedInContext/LogedInContext";
import { WatchCommentInterface } from "../../context/LogedInContext/LogedInContextInterfaces";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import { SeekBar } from "../SeekBar.tsx/SeekBar";

interface VideoInterface {
  videoLink: string;
}

export const Player = ({ videoLink }: VideoInterface) => {
  const { watchComments, setWatchComments } = useLogedInContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [commentText, setCommentText] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>();
  const [showComments, setShowComments] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      if (div.requestFullscreen) {
        div.requestFullscreen();
      } else if ((div as any).webkitRequestFullscreen) {
        (div as any).webkitRequestFullscreen();
      } else if ((div as any).msRequestFullscreen) {
        (div as any).msRequestFullscreen();
      } else if ((div as any).mozRequestFullScreen) {
        (div as any).mozRequestFullScreen();
      }
    }
    const userObj = localStorage.getItem("user");

    if (userObj) {
      setUserInfo(JSON.parse(userObj));
    }
  }, []);

  useEffect(() => {
    const watchCommentsAPI = `http://localhost:5001/watchComments`;
    if (id) {
      axios
        .get(watchCommentsAPI)
        .then((res: any) => {
          setWatchComments(
            res.data.map(
              (comment: WatchCommentInterface) =>
                comment.movieId == id && comment
            )
          );
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime -= 10;
    }
  };

  const handleForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += 10;
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleFullScreen = () => {
    const div = divRef.current;
    if (div && isFullscreen) {
      if (div.requestFullscreen) {
        div.requestFullscreen();
      } else if ((div as any).webkitRequestFullscreen) {
        (div as any).webkitRequestFullscreen();
      } else if ((div as any).msRequestFullscreen) {
        (div as any).msRequestFullscreen();
      } else if ((div as any).mozRequestFullScreen) {
        (div as any).mozRequestFullScreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMute = () => {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    setMuted((prevState) => !prevState);
  };

  const onSubmitHendler = (event: any) => {
    event.preventDefault();
    const newId = uuidv4();

    if (userInfo && id) {
      const newCommentObj: WatchCommentInterface = {
        id: newId,
        movieId: id,
        authorId: userInfo.id,
        authorUsername: userInfo.username,
        time: currentTime,
        content: commentText,
      };

      axios
        .post(`http://localhost:5001/watchComments/`, newCommentObj)
        .then((res) => {
          if (res.status === 200) {
            setWatchComments([...watchComments, newCommentObj]);
          }
        })
        .catch((err) => console.log(err));
      event.target.reset();
    }
  };

  return (
    <div ref={divRef} className="videoPlayer">
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        width="100%"
        height="100%"
        controls={false}
      >
        <source src={videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="backAndInfo">
        <Link to="*" className="controlButton">
          <img src={require(`../../images/icons/BackButton.png`)} alt="" />
        </Link>
        <button className="controlButton">
          <img src={require(`../../images/icons/ico-info.png`)} alt="" />
        </button>
      </div>
      <div className="controls">
        <SeekBar
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <div className="movieTime">
          <span className="videoSpan">{formatTime(currentTime)}</span>
          <span className="videoSpan">/</span>
          <span className="videoSpan">{formatTime(duration)}</span>
        </div>
        <div className="centralBar">
          <button className="controlButton" onClick={handleBackward}>
            <FontAwesomeIcon icon={backward} className="playVideoIcon" />
          </button>
          <button className="controlButton" onClick={togglePlay}>
            <FontAwesomeIcon
              icon={isPlaying ? pause : play}
              className="playVideoIcon"
            />
          </button>
          <button className="controlButton" onClick={handleForward}>
            <FontAwesomeIcon icon={forward} className="playVideoIcon" />
          </button>
        </div>
        <div className="sideBar">
          <div className="commentsAndForm">
            <div className="sideBarComments">
              {showComments &&
                !isPlaying &&
                watchComments.map(
                  (comment) =>
                    videoRef.current &&
                    videoRef?.current?.currentTime <= comment.time + 4 &&
                    videoRef?.current?.currentTime >= comment.time - 4 && (
                      <div className="commentBox">
                        <div className="commentAuthor">
                          <img
                            className="smallProfileImg"
                            src={require(`../../images/ProfilePics/Profile PictureSmall.png`)}
                            alt=""
                          />
                          <span className="videoSpan">
                            {comment.authorUsername.split(" ")[0]}:
                          </span>
                        </div>
                        <span className="videoSpan">{comment.content}</span>
                      </div>
                    )
                )}
            </div>
            <div className="sideBarForm">
              {showForm && (
                <form onSubmit={(e) => onSubmitHendler(e)} action="submit">
                  <textarea
                    onChange={(e) => setCommentText(e.target.value)}
                    cols={23}
                  ></textarea>
                  <button className="button" type="submit">
                    Post Comment
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="sideBarButtons">
            <button className="controlButton" onClick={handleFullScreen}>
              <FontAwesomeIcon icon={expand} className="playVideoIcon" />
            </button>
            <button
              className="controlButton"
              onClick={() => setShowForm((prev) => !prev)}
            >
              <FontAwesomeIcon
                icon={keyboard}
                className={`playVideoIcon ${showForm && "activeControlBtn"}`}
              />
            </button>
            <button className="controlButton" onClick={handleMute}>
              <FontAwesomeIcon
                icon={muted ? mute : volume}
                className="playVideoIcon"
              />
            </button>
            <button
              className="controlButton"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <FontAwesomeIcon
                icon={comments}
                className={`playVideoIcon ${
                  showComments && "activeControlBtn"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
