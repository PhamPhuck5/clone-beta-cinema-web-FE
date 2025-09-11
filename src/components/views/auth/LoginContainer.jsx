import React, { useState } from "react";
import { login } from "../../../containers/auth/authContainer.js";
import { useDispatch } from "react-redux";
import actionTypes from "../../../store/actions/actionTypes.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="col-12">
          <label>Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div className="col-12">
          <label>Mật khẩu</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
      </form>
      <span className="text-button forgot-password" onClick={() => {}}>
        quên mật khẩu
      </span>
      <div className="request">
        <button
          className="btn-sendrequest"
          onClick={async () => {
            let name = (await login(email, password)).name;
            dispatch({
              type: actionTypes.USER_LOGIN_SUCCESS,
              userInfo: { name: name },
            });
            navigate(-1);
          }}
        >
          Đăng nhập bằng tài khoản
        </button>
      </div>
    </>
  );
};
export default Login;
