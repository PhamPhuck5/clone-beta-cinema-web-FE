import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import axios from "axios";
import api from "../../../axios.js";

import en from "../../../translations/en.json";
import "./screeningMovie.scss";

import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import MoviesItem from "./moviesItem.jsx";

function getVNDateString(date) {
  const d = new Date(date.getTime());

  // VN UTC+7
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const vnTime = new Date(utc + 7 * 60 * 60000);

  const year = vnTime.getFullYear();
  const month = String(vnTime.getMonth() + 1).padStart(2, "0");
  const day = String(vnTime.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function getTodayAndNextDaysVN(n) {
  const now = new Date();
  const result = [];

  for (let i = 0; i <= n; i++) {
    const next = new Date(now);
    next.setDate(now.getDate() + i);
    result.push(getVNDateString(next));
  }

  return result;
}

export default function ScreeningMovie() {
  const screenDays = getTodayAndNextDaysVN(4);
  console.log(screenDays);
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [scheduleDay, setScheduleDay] = useState(screenDays[0]);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);
  let cityKey = useSelector((state) => state.app.cityKey);
  const modalRef = useRef();

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const res = await api.get(`/api/movie/screeningByDay`, {
          params: {
            theater: en.cinema[cityKey][cinemaKey] + " " + en.city[cityKey],
            date: scheduleDay,
          },
          signal: controller.signal,
        });

        setMoviesInfo(res);
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
  }, [cinemaKey, scheduleDay]);

  return (
    <div className="screening-movies-in-theater">
      <ConfirmModal ref={modalRef} />

      <div className="row day-picker-container">
        {screenDays.map((value, _) => {
          const [year, month, day] = value.split("-").map(Number);
          const date = new Date(year, month - 1, day);
          return (
            <div
              className={
                value == scheduleDay
                  ? "screening-day-container-active screening-day-container"
                  : "screening-day-container"
              }
              key={day + "day-picker"}
            >
              <button
                onClick={() => {
                  setScheduleDay(value);
                }}
              >
                <s>{date.getDate()}</s>/{date.getMonth() + 1} -{" T"}
                {date.getDay()}
              </button>
            </div>
          );
        })}
      </div>

      <div className="content-container row">
        {moviesInfo.map((value, index) => {
          let date = new Date(value.date);
          return (
            <div
              key={"movieItem" + value.id}
              className={index == 0 ? "col-12" : "col-xxl-6 col-12"}
              style={{ borderTop: "solid 1px gray" }}
            >
              <MoviesItem
                modalShow={(name, date, screeningID) => {
                  modalRef.current.show(name, scheduleDay, date, screeningID);
                }}
                movieInfo={value}
                normalPosterWidth={index == 0 ? 3 : 5}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
