import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";
import Slider from "../slider/slider";
import closeBtn from "../../assets/cancel.svg";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <React.Fragment>
      <CSSTransition
        in={props.modalOpen}
        timeout={400}
        mountOnEnter
        unmountOnExit
        classNames="modal-animation"
      >
        <div className="modal">
          <div className="modal__content">
            <div className="modal__top">
              <button onClick={() => props.onClose()}>
                <img src={closeBtn} alt="close" />
              </button>
            </div>
            <Slider imageIndex={props.imageIndex} slideItems={props.content} />
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>,
    document.getElementById("root")
  );
};

export default Modal;
