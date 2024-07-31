import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import "./search-page.css";
import axios from "axios";
import {
  MovieInterface,
  SliderMovieItem,
} from "../../components/SliderMovieItem/SliderMovieItem";
import { Footer } from "../../components/Footer/Footer";

export const SearchPage = () => {
  const [searchUrl, setSearchUrl] = useState();
  const [searchMovies, setSearchMovies] = useState<MovieInterface[]>([]);
  const [simularResults, setSimularResults] = useState<MovieInterface[]>([]);
  useEffect(() => {
    let urlMovies = "";

    if (searchUrl) {
      urlMovies = `http://localhost:5001/movies?title_like=^${searchUrl}`;
    } else {
      setSearchMovies([]);
    }
    axios
      .get(urlMovies)
      .then((res: any) => {
        setSearchMovies(res.data);
      })
      .catch((err) => console.log(err));
  }, [searchUrl]);

  useEffect(() => {
    let urlMovies = "";

    if (searchMovies.length > 0) {
      let movieType = searchMovies[0].type;
      urlMovies += `http://localhost:5001/movies?type=${movieType}`;
    } else {
      setSimularResults([]);
    }
    axios
      .get(urlMovies)
      .then((res: any) => {
        setSimularResults(res.data);
      })
      .catch((err) => console.log(err));

    if (searchMovies.length == 0) {
      setSimularResults([]);
    }
  }, [searchMovies]);

  return (
    <div className="searchPage">
      <Header />
      <div className="formContainer">
        <form className="searchForm">
          <button className="searchFormBtn">
            <img src={require(`../../images/icons/search.png`)} alt="" />
          </button>

          <input
            onChange={(e: any) => setSearchUrl(e.target.value)}
            className="searchInput"
            type="text"
            name="search"
            placeholder="Search..."
          />
        </form>
      </div>

      {searchMovies.length > 0 && (
        <div className="searchResults">
          <h3>Search Results</h3>
          <div className="searchMoviesContainer">
            {searchMovies.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
          <hr />
        </div>
      )}

      {simularResults.length > 0 && (
        <div className="simularResults">
          <h3>Simular Results</h3>
          <div className="searchMoviesContainer">
            {simularResults.map((movie: MovieInterface, key: number) => (
              <SliderMovieItem key={key} {...movie} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
