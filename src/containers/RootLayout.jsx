import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import "./RootLayout.scss";
const RootLayout = () => {
  return (
    <>
      <Header />
      <div className="row root-background">
        <div className="root-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default RootLayout;
