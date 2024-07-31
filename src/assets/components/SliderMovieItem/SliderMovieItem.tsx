import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./slider-movie-item.css";
import axios from "axios";
import { ConectToolbar } from "../ConectToolbar/ConectToolbar";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";
import { faVolumeHigh as volume } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute as mute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostInterface } from "../../context/LogedInContext/LogedInContextInterfaces";
import { Posts } from "../PostsComponent/Posts";

export interface MovieInterface {
  id: string;
  title: string;
  year: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  artists: string[];
  producers: string;
  cinematography: string;
  editing: string;
  costumeDesign: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  imdbRating: string;
  imdbVotes: string;
  type: string;
  production: string;
  img: string;
  video: string;
  commingSoon?: boolean;
}

export interface ArtistInterface {
  name: string;
  bio: string;
  img: string;
  movies: string[];
  awards: string[];
}

export const SliderMovieItem = (movie: MovieInterface) => {
  const [movieShow, setMovieShow] = useState(false);
  const [artisShow, setArtistShow] = useState(false);
  const [allArtists, setAllArtists] = useState<ArtistInterface[]>();
  const [currentArtist, setCurrentArtist] = useState<ArtistInterface>();
  const [allMovies, setAllMovies] = useState<MovieInterface[]>();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [logedUser, setLogedUser] = useState<UserInterface>();
  const [muted, setMuted] = useState(false);

  const artistsAPI = "http://localhost:5001/artists";
  const moviesAPI = "http://localhost:5001/movies";
  const usersAPI = `http://localhost:5001/users`;
  const postsAPI = `http://localhost:5001/posts`;

  useEffect(() => {
    axios
      .get(artistsAPI)
      .then((res: any) => {
        setAllArtists(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(moviesAPI)
      .then((res: any) => {
        setAllMovies(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(usersAPI)
      .then((res: any) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(postsAPI)
      .then((res: any) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));

    const userObj = localStorage.getItem("user");
    if (userObj) {
      setLogedUser(JSON.parse(userObj));
    }
  }, []);

  useEffect(() => {}, [posts]);

  const onArtistClick = (artist: string) => {
    const thisArtist = allArtists?.find((el) => el.name === artist);
    setCurrentArtist(thisArtist);
    setArtistShow(true);
  };

  const likeAndAddMovieHandler = (
    plaseToAddOrRemove: string[] | undefined,
    itemToAddOrRemove: string
  ) => {
    if (users && plaseToAddOrRemove !== undefined && logedUser) {
      const checkToggle = plaseToAddOrRemove?.includes(itemToAddOrRemove);

      if (!checkToggle) {
        plaseToAddOrRemove?.push(itemToAddOrRemove);
        const index = users.findIndex((obj) => obj.id === logedUser.id);
        users.splice(index, 1, logedUser);

        axios
          .put(`http://localhost:5001/users/${logedUser.id}`, logedUser)
          .then((res) => {
            if (res.status === 200) {
              setLogedUser(logedUser);
              setUsers(users);
              localStorage.setItem("user", JSON.stringify(logedUser));
            }
          })
          .catch((err) => console.log(err));
      } else {
        const likeIndex = plaseToAddOrRemove?.indexOf(itemToAddOrRemove);
        plaseToAddOrRemove?.splice(likeIndex, 1);
        const index = users.findIndex((obj) => obj.id === logedUser.id);
        users.splice(index, 1, logedUser);
        axios
          .put(`http://localhost:5001/users/${logedUser.id}`, logedUser)
          .then((res) => {
            if (res.status === 200) {
              setLogedUser(logedUser);
              setUsers(users);
              localStorage.setItem("user", JSON.stringify(logedUser));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <Link
        onClick={() => setMovieShow(true)}
        to=""
        className="moviePoster"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
        <img src={movie.poster} alt="movie" />
      </Link>

      <Modal
        size="xl"
        show={movieShow}
        onHide={() => setMovieShow(false)}
        aria-labelledby="example-modal-sizes-title-xl"
      >
        <div onClick={() => setMovieShow(false)} className="closeModalBtn">
          <img
            className="playBtnImg"
            src={require(`../../images/icons/close.png`)}
            alt="icon"
          />
        </div>
        <div className="movieModal">
          <div className="modalBannerText">
            <div className="innerModalBannerText">
              <h2>{movie.title}</h2>
              <p>
                {movie.plot}
                <button className="seeMoreMoiveBtn">
                  <i>See more...</i>
                </button>
              </p>

              <div className="btnContainer">
                <Link className="button  relative" to={`/Watch/${movie.id}`}>
                  <img
                    className="playBtnImg"
                    src={require(`../../images/icons/play.png`)}
                    alt="icon"
                  />
                  <span className="play">Play</span>
                </Link>
                <ConectToolbar
                  onHeartClickHandler={() =>
                    likeAndAddMovieHandler(logedUser?.likedMovies, movie.id)
                  }
                  onAddClickHandler={() =>
                    likeAndAddMovieHandler(logedUser?.watchList, movie.id)
                  }
                  shareUrlProp="locahlost:3000/Movies"
                />
              </div>
            </div>
          </div>
          <img className="movieBannerImgModal" src={movie.img} alt="" />
          <div className="aboutMovie">
            <button
              onClick={() => setMuted((prevState) => !prevState)}
              className="voiceButton"
            >
              <FontAwesomeIcon
                icon={muted ? mute : volume}
                className="playVideoIcon"
              />
            </button>
            <div className="movieDetails">
              <ul>
                <li>
                  <span className="movieTeam">Genres: </span>
                  {movie.genre}
                </li>
                <li>
                  <span className="movieTeam">Cast: </span>
                  {movie.artists.map((artist, key) =>
                    allArtists?.find((el) => el.name === artist) ? (
                      <div key={key} className="artistBtnContainer">
                        <button
                          onClick={() => onArtistClick(artist)}
                          className="artistBtb"
                        >
                          {artist}
                        </button>
                        <span>,</span>
                      </div>
                    ) : (
                      <span className="artistName" key={key}>
                        {artist},
                      </span>
                    )
                  )}
                  <span>...</span>
                </li>
                <li>
                  <span className="movieTeam">Director: </span>
                  {movie.director}
                </li>
              </ul>
              <ul>
                <li>
                  <span className="movieTeam">Writers: </span>
                  {movie.writer}
                </li>
                <li>
                  <span className="movieTeam">Producers: </span>
                  {movie.producers}
                </li>
                <li>
                  <span className="movieTeam">Cinematography: </span>
                  {movie.cinematography}
                </li>
              </ul>
              <ul>
                <li>
                  <span className="movieTeam">Editing: </span>
                  {movie.editing}
                </li>
                <li>
                  <span className="movieTeam">Costume Design: </span>
                  {movie.costumeDesign}
                </li>
              </ul>
            </div>
            <div className="movieComments">
              <Posts
                posts={posts.filter((post) => post.movieId == movie.id)}
                users={users}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        size="xl"
        show={artisShow}
        onHide={() => setArtistShow(false)}
        aria-labelledby="example-modal-sizes-title-xl"
      >
        <div onClick={() => setArtistShow(false)} className="closeModalBtn">
          <img
            className="playBtnImg"
            src={require(`../../images/icons/close.png`)}
            alt="icon"
          />
        </div>
        <div className="movieModal">
          <div className="firstContainer">
            <img className="artistPageImg" src={currentArtist?.img} alt="" />
            <div className="movieText">
              <h3>{currentArtist?.name}</h3>
              <p>{currentArtist?.bio}</p>
              <button className="button">See more</button>
            </div>
          </div>

          <div className="artMovies">
            <h4>Movies</h4>
            <div className="artMoviesContainer">
              {allMovies?.map((movie, key) =>
                currentArtist?.movies.find((el) => el === movie.title) ? (
                  <div className="movieCard" key={key}>
                    <img src={movie.poster} alt="" />
                  </div>
                ) : null
              )}
            </div>
          </div>
          <ul className="artAwards">
            {currentArtist?.awards.map((award, key) => (
              <li key={key}>{award}</li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};
