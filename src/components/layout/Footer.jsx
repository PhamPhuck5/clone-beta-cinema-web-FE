import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";

import vi from "../../translations/vi.json";
import "./footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  let redirectToNews = (id) => {
    navigate("/generalNew", { state: { id: id } });
  };

  const cityKeys = Object.keys(vi.city);

  let getCinemaList = (cityKey) => {
    return (
      <Fragment key={cityKey}>
        {Object.keys(vi.cinema[cityKey]).map((cinemaKey) => {
          return (
            <li key={cinemaKey}>
              <button
                className="cinemas-item"
                onClick={() => {
                  navigate("/sidenews/" + cinemaKey);
                }}
              >
                <FormattedMessage id={"cinema." + cityKey + "." + cinemaKey} />
                {", "}
                <FormattedMessage id={"city." + cityKey} />
              </button>
            </li>
          );
        })}
      </Fragment>
    );
  };

  return (
    <div className="footer">
      <div className="mx-auto footer-container">
        <div className="row">
          <div className="col-md-3 col-12 new-container">
            <div className="logo" />
            <ul>
              <li>
                <button onClick={() => redirectToNews(1)}>
                  <FormattedMessage id="footerlinks.recruitment" />
                </button>
              </li>
              <li>
                <button onClick={() => redirectToNews(2)}>
                  <FormattedMessage id="footerlinks.aboutus" />
                </button>
              </li>
              <li>
                <button onClick={() => redirectToNews(3)}>
                  <FormattedMessage id="footerlinks.contact" />
                </button>
              </li>
              <li>
                <button onClick={() => redirectToNews(4)}>
                  <FormattedMessage id="footerlinks.faq" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/introduce/socialactivity")}>
                  <FormattedMessage id="footerlinks.socialactivities" />
                </button>
              </li>
              <li>
                <button onClick={() => redirectToNews(5)}>
                  <FormattedMessage id="footerlinks.termsofuse" />
                </button>
              </li>
              <li>
                <div>
                  <button onClick={() => navigate("/term/payment")}>
                    <FormattedMessage id="footerlinks.paymentrefundpolicy" />
                  </button>
                </div>
              </li>
              <li>
                <button onClick={() => redirectToNews(6)}>
                  <FormattedMessage id="footerlinks.advertisingcontact" />
                </button>
              </li>
              <li>
                <button onClick={() => redirectToNews(7)}>
                  <FormattedMessage id="footerlinks.privacypolicy" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/term/ticketbooking")}>
                  <FormattedMessage id="footerlinks.onlinebookingguide" />
                </button>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-12 cinemas">
            <p className="footer-header">
              <FormattedMessage id="footerlinks.betatheaters" />
            </p>
            <ul>{cityKeys.map((cityKey) => getCinemaList(cityKey))}</ul>
          </div>
          <div className="col-md-2 col-12 contact">
            <p className="footer-header">
              <FormattedMessage id="footerlinks.contactus" />
            </p>
            <ul className="contact-list">
              <li>
                <a
                  className="facebook"
                  href="https://www.facebook.com/betacinemas/"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook hover-animated-icon"></i>
                </a>
              </li>
              <li>
                <a
                  className="youtube"
                  href="https://www.youtube.com/channel/UCGj6uah35-eNiH_2mdubYRw/"
                  target="_blank"
                >
                  <i className="fa-brands fa-youtube hover-animated-icon"></i>
                </a>
              </li>
              <li>
                <a
                  className="tiktok"
                  href="https://www.tiktok.com/@beta_cinemas/"
                  target="_blank"
                >
                  <i className="fa-brands fa-tiktok hover-animated-icon"></i>
                </a>
              </li>
              <li>
                <a
                  className="instagram"
                  href="https://www.instagram.com/betacinemas/"
                  target="_blank"
                >
                  <i className="fa-brands fa-instagram hover-animated-icon"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-12">
            <p className="footer-header">
              <FormattedMessage id="footerlinks.contacthead" />
            </p>
            <div>
              <h4>
                <FormattedMessage id="footerlinks.betamediajsc" />
              </h4>
              <h6>
                <FormattedMessage id="footerlinks.businessregistration" />
              </h6>
              <h6>
                <FormattedMessage id="footerlinks.businessaddress" />
              </h6>
              <p></p>
              <h6>Hotline: 1900 636807 / 1800 646420</h6>
              <h6>Email: mkt@betacinemas.vn</h6>
              <p></p>
              <p></p>
              <h4>
                <strong>
                  <FormattedMessage id="footerlinks.foradver" />
                </strong>
              </h4>
              <h4>Hotline: 0934 632 682</h4>
              <h4>Email: ad@betagroup.vn</h4>
              <p></p>
              <p></p>
              <h4>
                <strong>
                  <FormattedMessage id="footerlinks.forbus" />
                </strong>
              </h4>
              <h4>Hotline: 1800 646420</h4>
              <h4>Email: bachtx@betagroup.vn</h4>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
