export const path = {
  HOME: "/",
  LOGIN: "/login",
  LOG_OUT: "/logout",
  SYSTEM: "/system",
  systemMenuPath: "/home",
};

export const languages = {
  VI: "vi",
  EN: "en",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};

export const seatColors = [
  "rgb(186 187 195)",
  "rgba(0, 254, 250, 0.95)",
  "rgba(80, 0, 254, 0.95)",
  "rgba(254, 0, 0, 0.95)",
];

const priceTypeA = {
  totalSeat: 191,
  seatNumber: [71, 120, 0],
  price: [40, 65, 90],
};
const priceTypeB = {
  totalSeat: 155,
  seatNumber: [55, 93, 5],
  price: [40, 65, 90],
};
const priceTypeC = {
  totalSeat: 155,
  seatNumber: [55, 93, 5],
  price: [60, 85, 130],
};
export const roomByType = {
  A: priceTypeA,
  B: priceTypeB,
  C: priceTypeC,
};
