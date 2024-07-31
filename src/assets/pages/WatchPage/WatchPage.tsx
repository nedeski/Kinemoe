import "./watch-page.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieInterface } from "../../components/SliderMovieItem/SliderMovieItem";
import { Player } from "../../components/VideoPlayer/Player";

export const WatchPage = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState<MovieInterface>();

  const movieAPI = `http://localhost:5001/movies/${id}`;

  useEffect(() => {
    axios
      .get(movieAPI)
      .then((res: any) => {
        setCurrentMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return currentMovie ? (
    <div className="watchPage">
      <Player videoLink={currentMovie.video} />
    </div>
  ) : null;
};
