import { roomByType } from "../utils";

export const getPrice = (typeOfRoom, seatArray) => {
  const roomInfo = roomByType[typeOfRoom];
  let roomPrice = roomInfo.price;
  let seatType = roomInfo.seatNumber;
  let price = 0;
  let normal = 0,
    vip = 0,
    double = 0;

  seatArray.forEach((element) => {
    if (element < seatType[0]) {
      normal++;
      price += roomPrice[0];
    } else if (element < seatType[0] + seatType[1]) {
      vip++;
      price += roomPrice[1];
    } else {
      double++;
      price += roomPrice[2];
    }
  });
  return {
    price: price,
    normal: { quantity: normal, price: roomPrice[0] },
    vip: { quantity: vip, price: roomPrice[1] },
    couple: { quantity: double, price: roomPrice[2] },
  };
};
