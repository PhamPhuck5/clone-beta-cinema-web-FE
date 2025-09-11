import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import axios from "axios";

import api from "../../../axios.js";
import EmblaCarousel from "../useEmblaCarouselController.jsx";
import MovieListItem from "./movieListItem.jsx";

import "./oneImageCarousel.scss";
import "./home.scss";
import en from "../../../translations/en.json";
import TrailerModal from "../../Modal/trailerModal.jsx";

const slides = [];

export default function Home() {
  const [selectedMoviesType, setSelectedMoviesType] = useState("screening");
  //ENUM("screening", "speical", "upcoming", "stoped"),
  const [movieList, setMovieList] = useState([]);
  let language = useSelector((state) => state.app.language);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);
  let cityKey = useSelector((state) => state.app.cityKey);
  const modalShow = useRef();

  const getMoviesList = () => {
    return movieList.map((v) => (
      <div key={v.id} className="film-container col-md-3 col-12">
        <MovieListItem
          id={v.id}
          name={v.name[language]}
          genre={v.genre[language]}
          length={v.running_time}
          show={() => {
            modalShow.current.show(v.name[language], v.trailer);
          }}
        />
      </div>
    ));
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        const res = await api.get(`/api/movie/${selectedMoviesType}`, {
          params: {
            theater: en.cinema[cityKey][cinemaKey] + " " + en.city[cityKey],
          },
          signal: controller.signal,
        });

        setMovieList(res);
        console.log(res);
      } catch (err) {
        if (axios.isCancel(err)) return; // bỏ qua
        console.error("error: ", err.message);
      }
    };

    fetchMovies();

    return () => {
      if (controller) controller.abort();
    };
  }, [selectedMoviesType]);

  return (
    <div className="home">
      <TrailerModal ref={modalShow} />
      <EmblaCarousel slides={slides} slidesNull={true} />
      <div className="movies-container">
        <div className="movies-header">
          <div className="movies-header-content">
            <button
              onClick={() => setSelectedMoviesType("upcoming")}
              className={`${
                selectedMoviesType === "upcoming" && "movie-type-active"
              }`}
            >
              <FormattedMessage id="common.commingsoon" />
            </button>
            <button
              onClick={() => setSelectedMoviesType("screening")}
              className={`${
                selectedMoviesType === "screening" && "movie-type-active"
              }`}
            >
              <FormattedMessage id="common.nowshowing" />
            </button>
            <button
              onClick={() => setSelectedMoviesType("speical")}
              className={`${
                selectedMoviesType === "speical" && "movie-type-active"
              }`}
            >
              <FormattedMessage id="common.sneakshow" />
            </button>
          </div>
        </div>
        <div className="movies-content">
          <div className="movies-content-container row">{getMoviesList()}</div>
        </div>
      </div>
    </div>
  );
}
