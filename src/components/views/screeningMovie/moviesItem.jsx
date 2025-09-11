import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

const posterURL = import.meta.env.VITE_BACKEND_URL + "/posters/";

export default function moviesItem({
  modalShow,
  movieInfo,
  normalPosterWidth,
}) {
  //   const [movieInfo, setMovieInfo] = useState({
  //     id: null,
  //     name: { vi: "Tên phim demo", en: "Demo name" },
  //     genre: { vi: "Thể loại demo", en: "Demo genre" },
  //     runningTime: "120 phút",
  //     trailerLink: "",
  //     screenings: [],
  //   });
  let language = useSelector((state) => state.app.language);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);
  let cityKey = useSelector((state) => state.app.cityKey);

  return (
    <div className="movie-content">
      <div className="movie-info-container row">
        <div className={`poster col-xl-${normalPosterWidth} col-4`}>
          <img
            src={posterURL + `${movieInfo.id}.jpg`}
            className="item-poster"
          ></img>
        </div>
        <div className={`movie-info col-xl-${12 - normalPosterWidth} col-8`}>
          <h4 className="movie-name">{movieInfo.name[language]}</h4>
          <div className="row">
            <div className="movie-info-container">
              <i className="fa-solid fa-tag icon-width-10" />
              <div className="movie-info-field">
                {movieInfo.genre[language]}
              </div>
            </div>
            <div className="movie-info-container">
              <i className="fa-regular fa-clock icon-width-10" />
              <div className="movie-info-field">
                {movieInfo.runningTime} <FormattedMessage id="common.minute" />
              </div>
            </div>
          </div>
          <div className="screenings">
            <p
              style={{
                fontSize: "x-larger",
                fontWeight: "bold",
                marginTop: "1em",
              }}
            >
              <FormattedMessage id="common.2dsubtitle" />
            </p>

            {movieInfo.screenings &&
              movieInfo.screenings.map((value, _) => {
                let date = new Date(value.date);
                return (
                  <div
                    className="screening-container"
                    key={
                      date.getHours() +
                      " " +
                      date.getMinutes() +
                      " " +
                      date.getDate() +
                      " " +
                      value.room
                    }
                  >
                    <button
                      onClick={() => {
                        if (value.freeSeat == 0) {
                          return;
                        }
                        modalShow(
                          movieInfo.name[language],
                          date.getHours() + ":" + date.getMinutes(),
                          value.screeningID
                        );
                      }}
                      style={value.freeSeat == 0 ? { color: "red" } : {}}
                    >
                      {date.getHours()}:{date.getMinutes()}
                    </button>
                    <p className="empty-seat text-center">
                      {value.freeSeat}{" "}
                      <FormattedMessage id="common.emptyseat" />
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
