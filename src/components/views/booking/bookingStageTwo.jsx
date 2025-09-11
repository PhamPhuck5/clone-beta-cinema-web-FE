import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FormattedMessage } from "react-intl";

import api from "../../../axios.js";
import CountdownTimer from "./timer.jsx";

import "./booking.scss";
function trailerModal() {
  const { id } = useParams();
  const location = useLocation();
  const { bookingInfo } = location.state || {};
  console.log(location.state);
  const navigate = useNavigate();

  let language = useSelector((state) => state.app.language);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);
  let cityKey = useSelector((state) => state.app.cityKey);

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
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [combo, setCombo] = useState({
    sime: 0,
    beta: 0,
  });

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

        const info = (await api.get(`/api/user/info`)).data;
        console.log(res);
        setUserInfo({
          name: info.name,
          phoneNumber: info.phoneNumber,
          email: info.email,
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

  const postOrder = async () => {
    try {
      const res = await api.post(`/api/order/buy`, {
        screeningID: id,
        combos: [
          { type_combo: "Combo See Mê - Trứng Ốp La", quantity: combo.sime },
          { type_combo: "Beta Combo 69oz", quantity: combo.beta },
        ],
      });
      alert("vé đã được mua");
      navigate("/");
    } catch (err) {
      alert("yêu cầu mua thất bại");
      console.error("error: ", err.message);
    }
  };

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

          <div className="payment-info-container row">
            <div className="col-12 payment-info-header">
              <i
                className="fa-solid fa-user"
                style={{ width: "1em", height: "auto" }}
              ></i>
              <FormattedMessage id="common.paymentInfo" />
            </div>
            <div className="col-md-4 col-12 payment-info">
              <p>
                <b>
                  <FormattedMessage id="common.fullname" />
                </b>
              </p>
              <p>{userInfo.name}</p>
            </div>
            <div className="col-md-4 col-12 payment-info">
              <p>
                <b>
                  <FormattedMessage id="common.phonenumber" />
                </b>
              </p>
              <p>{userInfo.phoneNumber}</p>
            </div>
            <div className="col-md-4 col-12 payment-info">
              <p>
                <b>
                  <FormattedMessage id="common.email" />
                </b>
              </p>
              <p>{userInfo.name}</p>
            </div>
          </div>

          <div className="booked-seat-info">
            {bookingInfo.normal.quantity != 0 && (
              <div className="booked-seat row">
                <div className="col-7">
                  <b>
                    <FormattedMessage id="common.seat.normal"></FormattedMessage>
                  </b>
                </div>
                <div className="col-3">
                  {bookingInfo.normal.price}
                  {".000 x "}
                  {bookingInfo.normal.quantity}
                </div>
                <div className="col-2">{`=${
                  bookingInfo.normal.price * bookingInfo.normal.quantity
                }000đ`}</div>
              </div>
            )}
            {bookingInfo.vip.quantity != 0 && (
              <div className="booked-seat row">
                <div className="col-7">
                  <b>
                    <FormattedMessage id="common.seat.vip"></FormattedMessage>
                  </b>
                </div>
                <div className="col-3">
                  {bookingInfo.vip.price}
                  {".000 x "}
                  {bookingInfo.vip.quantity}
                </div>
                <div className="col-2">{`=${
                  bookingInfo.vip.price * bookingInfo.vip.quantity
                }000đ`}</div>
              </div>
            )}
            {bookingInfo.couple.quantity != 0 && (
              <div className="booked-seat row">
                <div className="col-7">
                  <b>
                    <FormattedMessage id="common.seat.couple"></FormattedMessage>
                  </b>
                </div>
                <div className="col-3">
                  {bookingInfo.couple.price}
                  {".000 x "}
                  {bookingInfo.couple.quantity}
                </div>
                <div className="col-2">
                  {`=${
                    bookingInfo.couple.price * bookingInfo.couple.quantity
                  }000đ`}
                </div>
              </div>
            )}
          </div>

          <div className="combo">
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "40%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <FormattedMessage id="common.comboname" />
                  </th>
                  <th>
                    <FormattedMessage id="common.description" />
                  </th>
                  <th>
                    <FormattedMessage id="common.quantity" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="/combo/combo-online-trung-op-la-35-145502-050925-34.png" />
                  </td>
                  <td>
                    <p>
                      <s>Combo See Mê - Trứng Ốp La</s>
                    </p>
                  </td>
                  <td>
                    <p>
                      TIẾT KIỆM 56K!!! Sở hữu ngay: 1 Ly Trứng ốp la kèm nước +
                      1 bắp (69oz)
                    </p>
                  </td>
                  <td>
                    <div style={{ width: 20 }}>{combo.sime}</div>
                    <div
                      className="quantity-button"
                      onClick={() => {
                        setCombo((prev) => ({
                          ...prev,
                          sime: prev.sime + 1,
                        }));
                      }}
                    >
                      +
                    </div>
                    <div
                      className="quantity-button"
                      onClick={() => {
                        if (combo.sime > 0) {
                          setCombo((prev) => ({
                            ...prev,
                            sime: prev.sime - 1,
                          }));
                        }
                      }}
                    >
                      -
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="/combo/combo-online-03-134211-020725-96.png" />
                  </td>
                  <td>
                    <p>
                      <s>Beta Combo 69oz</s>
                    </p>
                  </td>
                  <td>
                    <p>
                      TIẾT KIỆM 28K!!! Gồm: 1 Bắp (69oz) + 1 Nước có gaz (22oz)
                    </p>
                  </td>
                  <td>
                    <div style={{ width: 20 }}>{combo.beta}</div>
                    <div
                      className="text-button quantity-button"
                      onClick={() => {
                        setCombo((prev) => ({
                          ...prev,
                          beta: prev.beta + 1,
                        }));
                      }}
                    >
                      +
                    </div>
                    <div
                      className="text-button quantity-button"
                      onClick={() => {
                        if (combo.beta > 0) {
                          setCombo((prev) => ({
                            ...prev,
                            beta: prev.beta - 1,
                          }));
                        }
                      }}
                    >
                      -
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-11 seats-map-container">
            <div className="tier-seats" style={{ backgroundColor: "white" }}>
              <div
                className="total-money"
                style={{
                  width: "130px",
                  marginLeft: "auto",
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

          <div className="total-money">
            <div className="col-8">
              <FormattedMessage id="common.totalmoney" />
              {": " + bookingInfo.price + combo.sime * 139 + combo.beta * 88}
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
          </div>
          <div style={{ width: "90%", margin: "auto" }}>
            <div className="row">
              <div className="col-6">
                <button
                  style={{ width: "100%" }}
                  onClick={postOrder}
                  className="buy-ticket"
                >
                  <i className="fa-solid fa-ticket buy-ticket-icon"></i>
                  <FormattedMessage id="common.continue" />
                </button>
              </div>
              <div className="col-6" onClick={() => navigate(`/booking/${id}`)}>
                <button style={{ width: "100%" }} className="buy-ticket">
                  <i className="fa-solid fa-ticket buy-ticket-icon"></i>
                  <FormattedMessage id="common.turnback" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default trailerModal;
