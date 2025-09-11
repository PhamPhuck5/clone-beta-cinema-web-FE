import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import axios from "axios";

import api from "../../../axios.js";
import Screening from "./screening.jsx";
import FacebookComments from "./facebookComment.jsx";
import "./movie.scss";

const posterURL = import.meta.env.VITE_BACKEND_URL + "/posters/";

export default function Movie() {
  const [movieInfo, setMovieInfo] = useState({
    id: null,
    name: { vi: "Tên phim demo", en: "Demo name" },
    content: { vi: "Nội dung demo", en: "Demo content" },
    director: "Demo director",
    cast: "Demo cast",
    genre: { vi: "Thể loại demo", en: "Demo genre" },
    runningTime: "120 phút",
    language: "Tiếng Việt",
    releaseDate: "2025-01-01",
    trailerLink: "",
  });
  let language = useSelector((state) => state.app.language);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);
  let cityKey = useSelector((state) => state.app.cityKey);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const res = await api.get(`/api/movie/infomation`, {
          params: {
            id: id,
          },
          signal: controller.signal,
        });

        setMovieInfo(res);
        console.log(res);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("error: ", err.message);
      }
    };
    fetchMovies();

    return () => {
      if (controller) controller.abort();
    };
  }, [cinemaKey]);

  return (
    <div className="movie">
      <div className="movie-container">
        <div className="movie-header">
          <h4>
            Trang chủ &gt;{" "}
            <span style={{ color: "blue" }}>{movieInfo.name[language]}</span>
          </h4>
        </div>
        <div className="movie-content">
          <div className="movie-info-container row">
            <div className="poster col-xl-3 col-md-6 col-12">
              <img src={posterURL + `${id}.jpg`} className="item-poster"></img>
            </div>
            <div className="movie-info col-xl-9 col-md-6 col-12">
              <h4 className="movie-name">{movieInfo.name[language]}</h4>
              <p>{movieInfo.content[language]}</p>
              <div className="row">
                <div className="col-3 bold">
                  <FormattedMessage id="common.director" />
                </div>
                <div className="col-9">{movieInfo.director}</div>
              </div>
              <div className="row">
                <div className="col-3 bold">
                  <FormattedMessage id="common.cast" />
                </div>
                <div className="col-9">{movieInfo.cast}</div>
              </div>
              <div className="row">
                <div className="col-3 bold">
                  <FormattedMessage id="common.genre" />
                </div>
                <div className="col-9">{movieInfo.genre[language]}</div>
              </div>
              <div className="row">
                <div className="col-3 bold">
                  <FormattedMessage id="common.runningtime" />
                </div>
                <div className="col-9">
                  {movieInfo.runningTime}{" "}
                  <FormattedMessage id="common.minute" />
                </div>
              </div>
              <div className="row">
                <div className="col-3 bold">
                  <FormattedMessage id="common.language" />
                </div>
                <div className="col-9">{movieInfo.language}</div>
              </div>
              <div className="row">
                <div className="col-3 bold">
                  <FormattedMessage id="common.releasedate" />
                </div>
                <div className="col-9">{movieInfo.releaseDate}</div>
              </div>
            </div>
          </div>
        </div>
        <Screening id={id} name={movieInfo.name[language]} />
      </div>
      <FacebookComments id={id} trailerLink={movieInfo.trailer} />
    </div>
  );
}
