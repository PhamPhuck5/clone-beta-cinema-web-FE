// didn't tested
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

const webUrl = import.meta.env.VITE_REACT_APP_ROUTER_BASE_NAME;
const testURL = "https://9ece3c32034a.ngrok-free.app";
const env = import.meta.env.VITE_NODE_ENV;

export default function FacebookComments({ id, trailerLink }) {
  let cityKey = useSelector((state) => state.app.cityKey);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);
  let link = env === "development" ? testURL : webUrl + "/price/" + cinemaKey;
  useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
      document.body.appendChild(script);
    }

    const checkFB = setInterval(() => {
      if (window.FB) {
        window.FB.XFBML.parse();
        clearInterval(checkFB);
      }
    }, 100);

    return () => {
      // cleanup
      clearInterval(checkFB);
    };
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h4>
        <FormattedMessage id="common.pricetable" />{" "}
        <FormattedMessage id={"cinema." + cityKey + "." + cinemaKey} />
      </h4>
      <div className="price-container">
        <div className="like-share-container movie-container">
          <div
            className="fb-like"
            data-href={link}
            data-width=""
            data-layout="standard" // standard, button_count, box_count
            data-action="like"
            data-size="small"
            data-share="true"
          ></div>
        </div>
        <img
          src="/bang-gia-ve-tn-ve-2d-va-3d-1920x2400-150958-030424-19.png"
          style={{ width: "100%", height: "auto" }}
        />
        <div
          className="fb-comments"
          data-href={link}
          data-width="100%"
          data-numposts="5"
        ></div>
      </div>
    </div>
  );
}
