import { roomMap } from "../../../utils/room.js";

import React, { useEffect, useRef, useState } from "react";
import api from "../../../axios.js";
import axios from "axios";

import { seatColors } from "../../../utils/constant.js";

const baseWidth = 40; //px

const seatImgSrc = [
  "/booking/seat-unselect-normal.png",
  "/booking/seat-unselect-vip.png",
  "/booking/seat-unselect-double.png",
];

export default function SeatMap({
  typeOfRoom,
  id,
  setTotalMoney,
  selectedSeats,
}) {
  const [statusBytes, setStatusBytes] = useState(undefined);
  const countSeat = useRef(0);

  const chossenRoomMap = roomMap[typeOfRoom];

  const controllerRef = useRef(null);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    const fetchSeatsStatus = async () => {
      try {
        const res = await api.get(`/api/screening/status`, {
          params: {
            id: id,
          },
          signal: controllerRef.current.signal,
        });
        setTotalMoney(res.price);
        selectedSeats.current = JSON.parse(res.selectedSeat);
        setStatusBytes(mapStatus(new Uint8Array(res.status)));
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("error: ", err.message);
      }
    };
    fetchSeatsStatus();

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  let mapStatus = (resStatus) => {
    for (const seat of selectedSeats.current) {
      let byteIndex = Math.floor(seat / 4); // seat*2/8
      let bitPos = (seat * 2) % 8;
      //01 -> 10
      let mask = 3 << bitPos;
      resStatus[byteIndex] &= ~mask;
      resStatus[byteIndex] |= 2 << bitPos;
    }

    return resStatus;
  };

  const selectSeat = async (seatNumber) => {
    try {
      console.log("try to select seat number: " + seatNumber);
      const res = await api.post(
        `/api/screening/select`,
        {
          screeningID: id,
          seatNumber: seatNumber,
        },
        {
          signal: controllerRef.current.signal,
        }
      );
      if (!res.choosed) {
        alert("error when select seat");
      } else {
        selectedSeats.current.push(seatNumber);
      }
      setTotalMoney(res.price);
      setStatusBytes(mapStatus(new Uint8Array(res.newStatus)));
    } catch (err) {
      if (axios.isCancel(err)) return;
      console.error("error: ", err.message);
    }
  };

  const unselectSeat = async (seatNumber) => {
    try {
      const res = await api.post(
        `/api/screening/unselect`,
        {
          screeningID: id,
          seatNumber: seatNumber,
        },
        {
          signal: controllerRef.current.signal,
        }
      );
      if (!res.unchoosed) {
        alert("error when unselect seat");
      } else {
        selectedSeats.current = selectedSeats.current.filter(
          (value) => value !== seatNumber
        );
      }
      setTotalMoney(res.price);
      setStatusBytes(mapStatus(new Uint8Array(res.newStatus)));
    } catch (err) {
      if (axios.isCancel(err)) return;
      console.error("error: ", err.message);
    }
  };
  const actionOnClickSeat = [selectSeat, () => {}, unselectSeat, () => {}];
  let getstatus = (i) => {
    let byteIndex = Math.floor(i / 4); // seat*2/8
    let bitPos = (i * 2) % 8;
    return (statusBytes[byteIndex] >> bitPos) & 3;
  };

  let getRow = (rowName, typeSeat, srcBG, seatWidth) => {
    return (
      <div className="row seats-row on-hover-cursor" key={rowName}>
        {chossenRoomMap.switching &&
          (rowName.toUpperCase().charCodeAt(0) - "A".charCodeAt(0)) % 2 ==
            0 && <div style={{ width: baseWidth / 2 }} />}

        {chossenRoomMap[typeSeat][rowName].map((value, i) => {
          if (value == 0) {
            return (
              <div
                className="seat-item"
                key={rowName + i + " " + value}
                style={{
                  height: baseWidth + "px",
                  width: baseWidth + "px",
                  backgroundColor: "transparent",
                }}
              ></div>
            );
          } else {
            const seatOrder = countSeat.current;
            countSeat.current = countSeat.current + 1;
            const seatStatus = getstatus(seatOrder);
            let color = seatColors[seatStatus];

            return (
              <div
                className="seat-item"
                style={{
                  height: baseWidth + "px",
                  width: seatWidth * baseWidth + "px",
                  maskImage: `url(${srcBG})`,
                  WebkitMaskImage: `url(${srcBG})`,
                  backgroundColor: color,
                }}
                key={rowName + i + " " + value}
                onClick={() => {
                  actionOnClickSeat[seatStatus](seatOrder);
                }}
              >
                {rowName + value}
              </div>
            );
          }
        })}
      </div>
    );
  };

  countSeat.current = 0;

  return (
    <div className="seat-map">
      <div className="screen-in-map" style={{ width: "98%" }}>
        <img src="/booking/ic-screen.png" style={{ width: "100%" }}></img>
      </div>
      {statusBytes && chossenRoomMap && (
        <>
          <>
            {Object.keys(chossenRoomMap.normal).map((value, index) =>
              getRow(value, "normal", seatImgSrc[0], 1)
            )}
          </>
          <>
            {Object.keys(chossenRoomMap.vip).map((value, index) =>
              getRow(value, "vip", seatImgSrc[1], 1)
            )}
          </>
          <>
            {Object.keys(chossenRoomMap.double).map((value, index) =>
              getRow(value, "double", seatImgSrc[2], 2)
            )}
          </>
        </>
      )}
    </div>
  );
}
