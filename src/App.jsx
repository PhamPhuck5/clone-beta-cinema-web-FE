import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalDispatch from "./store/dispatch/globaDispatch.jsx";
import { CustomToastCloseButton } from "./components/CustomToast";
import System from "./routes/System";

const App = () => {
  let isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <Fragment>
      <GlobalDispatch />
      <div className="main-container">
        <span className="content-container">
          <System />
        </span>

        <ToastContainer
          className="toast-container"
          toastClassName="toast-item"
          bodyClassName="toast-item-body"
          autoClose={false}
          hideProgressBar={true}
          pauseOnHover={false}
          pauseOnFocusLoss={true}
          closeOnClick={false}
          draggable={false}
          closeButton={<CustomToastCloseButton />}
        />
      </div>
    </Fragment>
  );
};

export default App;
