import "./home-page.css";
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

export const HomePage = () => {
  const [allMovies, setAllMovies] = useState<MovieInterface[]>([]);
  const [series, setSeries] = useState<MovieInterface[]>([]);
  const [popular, setPopular] = useState<MovieInterface[]>([]);
  const [newRealise, setNewRealise] = useState<MovieInterface[]>([]);
  const [comingSoon, setComingSoon] = useState<MovieInterface[]>([]);
  const [recommendation, setRecomendation] = useState<MovieInterface[]>([]);
  const [podcasts, setPodcasts] = useState<MovieInterface[]>([]);
  const [kids, setKids] = useState<MovieInterface[]>([]);

  let randomIndex = Math.floor(Math.random() * allMovies.length);
  let randomSoonIndex = Math.floor(Math.random() * comingSoon.length);
  if (randomSoonIndex !== 0 && randomSoonIndex === randomIndex) {
    randomSoonIndex = randomSoonIndex + randomIndex;
  }

  const API = "http://localhost:5001/movies";
  useEffect(() => {
    axios
      .get(API)
      .then((res: any) => {
        setAllMovies(res.data);
        setSeries(res.data.filter((el: any) => el.type.includes("series")));
        setPopular(res.data.filter((el: any) => +el.imdbVotes > 900000));
        setNewRealise(res.data.filter((el: any) => +el.year > 2018));
        setComingSoon(res.data.filter((el: any) => el.comingSoon === true));
        setRecomendation(res.data.filter((el: any) => +el.imdbRating > 8.5));
        setPodcasts(res.data.filter((el: any) => el.type.includes("podcast")));
        setKids(res.data.filter((el: any) => el.type.includes("kids")));
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
      <div className="bannerSideSlider">
        <div className="moviesContainer moviesContainer">
          {series.slice(0, 2).map((movie: MovieInterface, key: number) => (
            <SliderMovieItem key={key} {...movie} />
          ))}
        </div>
      </div>
      <main className="main">
        <section className="popular">
          <h3>Popular</h3>
          <div className="moviesContainer moviesContainerLeft">
            {popular.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}

            {popular.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
        <section className="newRealise">
          <h3>New Realise</h3>
          <div className="moviesContainer moviesContainerRight">
            {newRealise.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}

            {newRealise.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
        {comingSoon.length > 0 && (
          <section className="comingSoon">
            <h3>Coming Soon</h3>
            <div className="bannerInner">
              <img src={comingSoon[randomSoonIndex].img} alt="" />
            </div>
          </section>
        )}
        <section className="ourRecommendation">
          <h3>Our Recommendation</h3>
          <div className="moviesContainer moviesContainerLeft">
            {recommendation.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}

            {recommendation.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
        {allMovies.length > 0 && (
          <section className="randomBanner">
            <div className="bannerInner">
              <img src={allMovies[randomIndex].img} alt="" />
            </div>
          </section>
        )}
        <section className="podcasts">
          <h3>Podcasts</h3>
          <div className="moviesContainer moviesContainerRight">
            {podcasts.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}

            {podcasts.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
        <section className="kids">
          <h3>Kids</h3>
          <div className="moviesContainer moviesContainerLeft">
            {kids.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}

            {kids.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
