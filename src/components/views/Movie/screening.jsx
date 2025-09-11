import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import axios from "axios";

import api from "../../../axios.js";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import en from "../../../translations/en.json";

export default function Movie({ id, name }) {
  const [screeningDays, setScreeningDays] = useState([]);
  const [screeningSchedule, setScreeningSchedule] = useState({});
  const [scheduleDay, setScheduleDay] = useState();

  let language = useSelector((state) => state.app.language);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);
  let cityKey = useSelector((state) => state.app.cityKey);

  const modalRef = useRef();

  function groupByDate(data) {
    let dateObject = data.reduce((acc, item) => {
      const dateKey = new Date(item.date).toLocaleDateString("vi-VN");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {});
    const keys = Object.keys(dateObject);

    // 2. Sort key (ở đây sort theo ngày tăng dần)
    keys.sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number);
      const [dayB, monthB, yearB] = b.split("/").map(Number);
      return (
        new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
      );
    });
    setScreeningDays(keys);
    setScreeningSchedule(dateObject);
    return keys;
  }

  useEffect(() => {
    const controller = new AbortController();
    const fetchScreening = async () => {
      try {
        const res = await api.get(`/api/screening/schedule`, {
          params: {
            movieID: id,
            theater: en.cinema[cityKey][cinemaKey] + " " + en.city[cityKey],
          },
          signal: controller.signal,
        });

        if (res.length != 0) {
          setScheduleDay(groupByDate(res)[0]);
        }
        console.log(res);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("error: ", err.message);
      }
    };

    fetchScreening();

    return () => {
      if (controller) controller.abort();
    };
  }, [cinemaKey, id]);

  let getSchedule = () => {
    return (
      <>
        <ConfirmModal ref={modalRef} />
        <div className="schedule-container">
          <div className="days">
            {screeningDays.map((value, _) => {
              const [day, month, year] = value.split("/").map(Number);
              const date = new Date(year, month - 1, day);
              return (
                <div
                  className={
                    value == scheduleDay
                      ? "screening-day-container-active screening-day-container"
                      : "screening-day-container"
                  }
                  key={day}
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
          <div className="screenings">
            <h5 className="screening-type">
              <FormattedMessage id="common.2dsubtitle" />
            </h5>
            {screeningSchedule[scheduleDay] &&
              screeningSchedule[scheduleDay].map((value, _) => {
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
                        modalRef.current.show(
                          name,
                          scheduleDay,
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
      </>
    );
  };

  return <>{scheduleDay && getSchedule()}</>;
}
