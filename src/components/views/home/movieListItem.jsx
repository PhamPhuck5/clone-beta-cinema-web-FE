import React from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import "./movieListItem.scss"; //todo write this

const baseURL = import.meta.env.VITE_BACKEND_URL + "/posters/";
export default function MovieListItem({ id, name, genre, length, show }) {
  const navigate = useNavigate();

  return (
    <div className="movie-list-item">
      <div className="item-container">
        <div className="item-content row">
          <div className="poster col-md-12 col-6">
            <img src={baseURL + `${id}.jpg`} className="item-poster"></img>
            <div className="overlay">
              <button onClick={show}>
                <i className="fa-solid fa-circle-play"></i>
              </button>
            </div>
          </div>
          <div className="item-info col-md-12 col-6">
            <div style={{ height: "7em" }}>
              <h5
                className="text-button movie-header ellipsis-2-lines"
                onClick={() => navigate(`/movie/${id}`)}
              >
                {name}
              </h5>
              <p className="movie-info">
                <s>
                  <FormattedMessage id="common.genre" />
                </s>
                {`: ${genre}`}
              </p>
              <p className="movie-info">
                <s>
                  <FormattedMessage id="common.runningtime" />
                </s>
                {`: ${length}`} <FormattedMessage id="common.minute" />
              </p>
            </div>
            <div className="buy-ticket">
              <i className="fa-solid fa-ticket buy-ticket-icon"></i>
              <FormattedMessage id="common.booking" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
