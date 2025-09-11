// didn't tested
import { useEffect } from "react";
const webUrl = import.meta.env.VITE_REACT_APP_ROUTER_BASE_NAME;
const testURL = "https://9ece3c32034a.ngrok-free.app";
const env = import.meta.env.VITE_NODE_ENV;
export default function FacebookComments({ id, trailerLink }) {
  let link = env === "development" ? testURL : webUrl + "/movies/" + id;
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
      //   document.body.removeChild(script);
    };
  }, []);

  return (
    <>
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
      <div className="trainer">
        <div className="trainer-container">
          <div className="text-center trainer-header">
            <p>TRAILER</p>
          </div>
          <div className="video-container">
            <div className="video-content">
              <iframe
                src={`${trailerLink}?autoplay=1&controls=2&rel=0&modestbranding=1&iv_load_policy=3&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div
            className="fb-comments"
            data-href={link}
            data-width="100%"
            data-numposts="5"
          ></div>
        </div>
      </div>
    </>
  );
}
