import { useState, useImperativeHandle, forwardRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

import "./confirmModal.scss";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const trailerModal = forwardRef((prop, ref) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({
    name: "name",
    day: new Date().toLocaleDateString("vi-VN"),
    time: "00:00",
    id: null,
  });
  let cityKey = useSelector((state) => state.app.cityKey);
  let cinemaKey = useSelector((state) => state.app.cinemaKey);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    show(name, day, time, id) {
      setInfo({
        name: name,
        day: day,
        time: time,
        id: id,
      });
      handleShow();
    },
  }));

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>
          <div className="ConfirmModal">
            <div style={{ padding: "0em" }}>
              <FormattedMessage id="common.youarebooking" />
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <div className="ConfirmModal">
          <div className="movie-name">
            <p>{info.name}</p>
          </div>
          <div className="screening-info row">
            <div className="col-4">
              <p className="small-title text-center">
                <FormattedMessage id="common.screeningtheater" />
              </p>
              <p className="screening-info text-center">
                <FormattedMessage id={"cinema." + cityKey + "." + cinemaKey} />
              </p>
            </div>
            <div className="col-4">
              <p className="small-title text-center">
                <FormattedMessage id="common.screeningdate" />
              </p>
              <p className="screening-info  text-center"> {info.day}</p>
            </div>
            <div className="col-4">
              <p className="small-title text-center">
                <FormattedMessage id="common.screeningtime" />
              </p>
              <p className="screening-info text-center"> {info.time}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="ConfirmModal" style={{ width: "100%" }}>
          <Button
            className="buy-ticket"
            onClick={() => navigate(`/booking/${info.id}`)}
          >
            <FormattedMessage id="common.ok" />
            <i className="fa-solid fa-ticket buy-ticket-icon"></i>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});

export default trailerModal;
