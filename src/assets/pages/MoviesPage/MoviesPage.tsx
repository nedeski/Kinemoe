import { Carousel } from "../../components/Carousel/Carousel";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  MovieInterface,
  SliderMovieItem,
} from "../../components/SliderMovieItem/SliderMovieItem";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

export const MoviesPage = () => {
  const [popular, setPopular] = useState<MovieInterface[]>([]);
  const [action, setAction] = useState<MovieInterface[]>([]);
  const [comedy, setComedy] = useState<MovieInterface[]>([]);
  const [horror, setHorror] = useState<MovieInterface[]>([]);
  const [drama, setDrama] = useState<MovieInterface[]>([]);
  const [history, setHistory] = useState<MovieInterface[]>([]);

  const API = "http://localhost:5001/movies";
  useEffect(() => {
    axios
      .get(API)
      .then((res: any) => {
        setPopular(
          res.data
            .filter(
              (el: any) => el.type.includes("movie") && +el.imdbVotes > 500000
            )
            .slice(0, 5)
        );
        setAction(
          res.data
            .filter(
              (el: any) =>
                el.type.includes("movie") && el.genre.includes("Action")
            )
            .slice(0, 5)
        );
        setComedy(
          res.data
            .filter(
              (el: any) =>
                el.type.includes("movie") && el.genre.includes("Comedy")
            )
            .slice(0, 5)
        );
        setHorror(
          res.data
            .filter(
              (el: any) =>
                el.type.includes("movie") && el.genre.includes("Horror")
            )
            .slice(0, 5)
        );
        setDrama(
          res.data
            .filter(
              (el: any) =>
                el.type.includes("movie") && el.genre.includes("Drama")
            )
            .slice(0, 5)
        );
        setHistory(
          res.data
            .filter(
              (el: any) =>
                el.type.includes("movie") && el.genre.includes("History")
            )
            .slice(0, 5)
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homePage">
      <Carousel />
      <Header />
      <Link className="searchBtn headerBtn" to="/Search">
        <img src={require(`../../images/icons/search.png`)} alt="" />
        <p className="headerBtnText">Search</p>
      </Link>

      <main className="main">
        <section className="popular">
          <h3>Popular</h3>
          <div className="moviesContainer">
            {popular.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
        <section className="action">
          <h3>Action</h3>
          <div className="moviesContainer">
            {action.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>

        <section className="comedy">
          <h3>Comedy</h3>
          <div className="moviesContainer">
            {comedy.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>

        <section className="horror">
          <h3>Horror</h3>
          <div className="moviesContainer">
            {horror.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
        <section className="drama">
          <h3>Drama</h3>
          <div className="moviesContainer">
            {drama.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
        <section className="History">
          <h3>History</h3>
          <div className="moviesContainer">
            {history.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
        <div className="showMoreContainer">
          <button className="showMoreBtn ">Show more</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
