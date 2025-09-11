import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FormattedMessage } from "react-intl";

import MapSeat from "./mapSeat.jsx";
import api from "../../../axios.js";
import { seatColors } from "../../../utils/constant.js";
import CountdownTimer from "./timer.jsx";
import { getPrice } from "../../../containers/price.js";

import "./booking.scss";
function trailerModal() {
  const { id } = useParams();
  const navigate = useNavigate();

  let language = useSelector((state) => state.app.language);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);
  let cityKey = useSelector((state) => state.app.cityKey);

  const baseWidth = 35;
  const posterURL = import.meta.env.VITE_BACKEND_URL + "/posters/";

  const [movieInfo, setMovieInfo] = useState({
    id: 0,
    name: { vi: "Tên phim demo", en: "Demo name" },
    genre: { vi: "Thể loại demo", en: "Demo genre" },
    runningTime: "120 phút",
  });
  const [screeningInfo, setScreeningInfo] = useState({
    room: undefined,
    typeOfRoom: undefined,
    date: new Date(),
  });
  const selectedSeats = useRef([]);
  const [totalmoney, setTotalMoney] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchScreening = async () => {
      try {
        const res = await api.get(`/api/screening/info`, {
          params: {
            id: id,
          },
          signal: controller.signal,
        });
        console.log(res);
        setMovieInfo({
          id: res.Movie.id,
          name: { vi: res.Movie.name, en: res.Movie.name_en },
          genre: { vi: res.Movie.genre, en: res.Movie.genre_en },
          runningTime: res.Movie.running_time,
        });
        setScreeningInfo({
          room: res.room,
          typeOfRoom: res.type_of_room,
          date: new Date(res.date),
        });
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("error: ", err.message);
      }
    };
    fetchScreening();

    return () => {
      if (controller) controller.abort();
    };
  }, []);
  return (
    <div className="booking">
      <div
        className="content-container"
        style={{
          width: 1200,
          maxWidth: "90%",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div className="col-md-9 col-12">
          <div className="header-container">
            <h4>
              <span className="text-button" onClick={() => {}}>
                Trang chủ
              </span>
              <span style={{ color: "blue" }}>
                &gt; <FormattedMessage id="common.booking" /> &gt;{" "}
                {movieInfo.name[language]}
              </span>
            </h4>
          </div>
          <div className="col-11 seats-map-container">
            <div className="seat-type">
              <div className="row">
                <div
                  className="seat-item"
                  style={{
                    height: baseWidth + "px",
                    width: baseWidth + "px",
                    maskImage: "url(/booking/seat-unselect-normal.png)",
                    WebkitMaskImage: "url(/booking/seat-unselect-normal.png)",
                    backgroundColor: seatColors[0],
                  }}
                ></div>
                <p
                  style={{
                    display: "inline-block",
                    width: 100,
                  }}
                >
                  <FormattedMessage id="common.seat.unselected" />
                </p>
              </div>

              <div className="row">
                <div
                  className="seat-item"
                  style={{
                    height: baseWidth + "px",
                    width: baseWidth + "px",
                    backgroundColor: seatColors[2],
                    maskImage: "url(/booking/seat-unselect-normal.png)",
                    WebkitMaskImage: "url(/booking/seat-unselect-normal.png)",
                  }}
                ></div>
                <p
                  style={{
                    display: "inline-block",
                    width: 100,
                  }}
                >
                  <FormattedMessage id="common.seat.onhold" />
                </p>
              </div>

              <div className="row">
                <div
                  className="seat-item"
                  style={{
                    height: baseWidth + "px",
                    width: baseWidth + "px",
                    maskImage: `url(/booking/seat-unselect-normal.png)`,
                    WebkitMaskImage: `url(/booking/seat-unselect-normal.png)`,
                    backgroundColor: seatColors[1],
                  }}
                ></div>
                <p
                  style={{
                    display: "inline-block",
                    width: 100,
                  }}
                >
                  <FormattedMessage id="common.seat.selected" />
                </p>
              </div>

              <div className="row">
                <div
                  className="seat-item"
                  style={{
                    display: "inline",
                    height: baseWidth + "px",
                    width: baseWidth + "px",
                    maskImage: "url(/booking/seat-unselect-normal.png)",
                    WebkitMaskImage: "url(/booking/seat-unselect-normal.png)",
                    backgroundColor: seatColors[3],
                  }}
                ></div>
                <p
                  style={{
                    display: "inline-block",
                    width: 100,
                  }}
                >
                  <FormattedMessage id="common.seat.bought" />
                </p>
              </div>
            </div>
            {screeningInfo.room && (
              <MapSeat
                typeOfRoom={screeningInfo.typeOfRoom}
                id={id}
                setTotalMoney={(money) => {
                  setTotalMoney(money);
                }}
                selectedSeats={selectedSeats}
              />
            )}
            <div className="tier-seats" style={{ backgroundColor: "white" }}>
              <div className="tier-seat-item">
                <div
                  style={{
                    display: "inline-block",
                    height: 40 + "px",
                    width: 40 + "px",
                    backgroundImage: "url(/booking/seat-unselect-normal.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="tier-seat-name">
                  <FormattedMessage id="common.seat.normal"></FormattedMessage>
                </div>
              </div>
              <div className="tier-seat-item">
                <div
                  style={{
                    display: "inline-block",
                    height: 40 + "px",
                    width: 40 + "px",
                    backgroundImage: "url(/booking/seat-unselect-vip.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="tier-seat-name">
                  <FormattedMessage id="common.seat.vip"></FormattedMessage>
                </div>
              </div>
              <div className="tier-seat-item">
                <div
                  style={{
                    display: "inline-block",
                    height: 40 + "px",
                    width: 80 + "px",
                    backgroundImage: "url(/booking/seat-unselect-double.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="tier-seat-name">
                  <FormattedMessage id="common.seat.couple"></FormattedMessage>
                </div>
              </div>
              <div className="total-money">
                <p
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0",
                    width: "100%",
                  }}
                >
                  {" "}
                  <FormattedMessage id="common.totalmoney" />
                </p>
                <p
                  className="money"
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    right: "0",
                    width: "100%",
                    textAlign: "end",
                    color: "blue",
                    fontSize: "larger",
                  }}
                >
                  {totalmoney + ".000đ"}
                </p>
              </div>
              <div
                className="total-money"
                style={{
                  width: "130px",
                }}
              >
                <p
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0",
                    width: "100%",
                  }}
                >
                  {" "}
                  <FormattedMessage id="common.remaintime" />
                </p>
                <CountdownTimer
                  onTimeOut={() => {
                    navigate("/");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="info">
          <div
            className="row"
            style={{
              paddingBottom: "2em",
            }}
          >
            <div className="poster col-md-6 col-12">
              <img
                src={posterURL + `${movieInfo.id}.jpg`}
                className="item-poster"
              ></img>
            </div>
            <div className="movie-info col-md-6 col-12">
              <h4 style={{ color: "blue" }}>{movieInfo.name[language]}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <FormattedMessage id="common.genre" />
            </div>
            <div className="col-6 bold">{movieInfo.genre[language]}</div>
          </div>
          <div className="row" style={{ borderBottom: " solid 1px black" }}>
            <div className="col-6">
              <FormattedMessage id="common.runningtime" />
            </div>
            <div className="col-6 bold">
              {movieInfo.runningTime} <FormattedMessage id="common.minute" />
            </div>
          </div>
          <div className=" screening-info">
            <div className="row">
              <div className="col-6">
                <FormattedMessage id="common.screeningtheater" />
                {": "}
              </div>
              <div className="col-6 bold">
                <FormattedMessage id={"cinema." + cityKey + "." + cinemaKey} />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <FormattedMessage id="common.screeningdate" />
                {": "}
              </div>
              <div className="col-6 bold">
                {screeningInfo.date.toLocaleDateString("vi-VN")}{" "}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <FormattedMessage id="common.screeningtime" />
                {": "}
              </div>
              <div className="col-6 bold">
                {`${screeningInfo.date.getHours()}:${screeningInfo.date.getMinutes()}`}
              </div>
            </div>{" "}
            <div className="row">
              <div className="col-6">
                <FormattedMessage id="common.screeningroom" />
                {": "}
              </div>
              <div className="col-6 bold">{screeningInfo.room}</div>
            </div>
            <div style={{ width: "100%" }}>
              <button
                className="buy-ticket"
                style={{ width: "75%" }}
                onClick={() => {
                  navigate(`/booking2/${id}`, {
                    state: {
                      bookingInfo: getPrice(
                        screeningInfo.typeOfRoom,
                        selectedSeats.current
                      ),
                    },
                  });
                }}
              >
                <i className="fa-solid fa-ticket buy-ticket-icon"></i>
                <FormattedMessage id="common.booking" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default trailerModal;
