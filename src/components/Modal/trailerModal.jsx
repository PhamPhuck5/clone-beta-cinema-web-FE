import { useState, useImperativeHandle, forwardRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./trailerModal.scss";

const trailerModal = forwardRef((prop, ref) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    show(name, link) {
      setName(name);
      setLink(link);
      handleShow();
    },
  }));

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>{"TRAILER - " + name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="video-container">
            <iframe
              src={`${link}?autoplay=1&mute=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default trailerModal;
