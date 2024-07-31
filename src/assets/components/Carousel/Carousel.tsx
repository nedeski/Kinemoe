import React, { useState, useEffect } from "react";
import "./carousel.css";
import axios from "axios";
import { MovieInterface } from "../SliderMovieItem/SliderMovieItem";
import { Link } from "react-router-dom";
import { ConectToolbar } from "../ConectToolbar/ConectToolbar";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";

export const Carousel = () => {
  const [allMovies, setAllMovies] = useState<MovieInterface[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logedUser, setLogedUser] = useState<UserInterface>();
  const [users, setUsers] = useState<UserInterface[]>();
  const API = "http://localhost:5001/movies";
  const usersAPI = `http://localhost:5001/users`;

  useEffect(() => {
    axios
      .get(API)
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

    const userObj = localStorage.getItem("user");
    if (userObj) {
      setLogedUser(JSON.parse(userObj));
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allMovies.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [allMovies]);

  const likeAndAddMovieHandler = (
    plaseToAddOrRemove: string[] | undefined,
    itemToAddOrRemove: string
  ) => {
    if (users && plaseToAddOrRemove !== undefined && logedUser) {
      const checkToggle = plaseToAddOrRemove?.includes(itemToAddOrRemove);

      if (!checkToggle) {
        plaseToAddOrRemove?.push(itemToAddOrRemove);
        const index = users.indexOf(logedUser);
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
        const index = users.indexOf(logedUser);
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
    <div className="carousel-container">
      {allMovies.map((movie, index) => (
        <div
          key={index}
          className={index === currentIndex ? "slide active" : "slide"}
        >
          <div className="caruselText">
            <div className="innerCaruselText">
              <h2>{movie.title}</h2>
              <p>{movie.plot}</p>
              <div className="btnContainer">
                <Link className="button relative" to={`/Watch/${movie.id}`}>
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
                  shareUrlProp="locahlost:3000/Home"
                />
              </div>
            </div>
          </div>
          <img src={movie.img} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
};
