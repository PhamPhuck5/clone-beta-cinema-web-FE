import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../../store/actions/actionTypes.js";

import { FormattedMessage } from "react-intl";

import CinemaDropdown from "./HeaderDropdown.jsx";
import { path } from "../../utils/constant.js";

import "./Header.scss";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const systemMenuPath = path.systemMenuPath;
  let language = useSelector((state) => state.app.language);
  let isLogin = useSelector((state) => state.user.isLoggedIn);
  let userInfo = useSelector((state) => state.user.userInfo);
  console.log(isLogin);

  const dispatch = useDispatch();

  let handleChangeLanguage = () => {
    if (language == "vi") {
      dispatch({ type: actionTypes.APP_CHANGE_TO_ENGLISH });
    } else {
      dispatch({ type: actionTypes.APP_CHANGE_TO_VIETNAMESE });
    }
  };

  return (
    <>
      <div className="row header-top">
        <div className="mx-auto header-top-container">
          <div className="header-top-content">
            {!isLogin ? (
              <>
                <Link to="/login?target=login" className="link-to-login">
                  login
                </Link>
                <Link to="/login?target=register" className="link-to-register">
                  register
                </Link>
              </>
            ) : (
              <>
                <p style={{ display: "inline", color: "White" }}>
                  <FormattedMessage id="common.hello" /> {userInfo.name}
                </p>
              </>
            )}
            <button
              className="btn-change-language"
              onClick={() => {
                handleChangeLanguage();
              }}
            >
              {language == "vi" ? (
                <img src="/icon/frag/united-kingdom.png" className="fragLang" />
              ) : (
                <img src="/icon/frag/vietnam.png" className="fragLang" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="row header-sticky">
        <div className="mx-auto header-top-container">
          <div className="second-header-content">
            <div
              className="logo on-hover-cursor"
              style={{ display: "inline-block" }}
              onClick={() => {
                navigate("/");
              }}
            ></div>
            <div
              className="dropdown-wrapper"
              style={{ display: "inline-block" }}
            >
              <CinemaDropdown />
            </div>
            <ul
              style={{
                display: "flex",
                gap: "5px",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <button
                  className="navi-btn"
                  onClick={() => {
                    navigate("/screeningMovie");
                  }}
                >
                  <FormattedMessage id="headerlinks.moviesscheduke"></FormattedMessage>
                </button>
              </li>
              <li>
                <button
                  className="navi-btn"
                  onClick={() => {
                    navigate("/Movies");
                  }}
                >
                  <FormattedMessage id="headerlinks.movies"></FormattedMessage>
                </button>
              </li>
              <li>
                <button className="navi-btn">
                  <FormattedMessage id="headerlinks.theaters"></FormattedMessage>
                </button>
              </li>
              <li>
                <button
                  className="navi-btn"
                  onClick={() => {
                    navigate("/Price");
                  }}
                >
                  <FormattedMessage id="headerlinks.ticketprices"></FormattedMessage>
                </button>
              </li>
              <li>
                <button className="navi-btn">
                  <FormattedMessage id="headerlinks.newsandoffers"></FormattedMessage>
                </button>
              </li>
              <li>
                <button
                  className="navi-btn"
                  onClick={() => {
                    navigate("/Partner");
                  }}
                >
                  <FormattedMessage id="headerlinks.franchise"></FormattedMessage>
                </button>
              </li>
              <li>
                <button className="navi-btn">
                  <FormattedMessage id="headerlinks.membership"></FormattedMessage>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
