import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";
import Slider from "../slider/slider";
import closeBtn from "../../assets/cancel.svg";

class Modal extends React.Component {
  render() {
    if (!this.props.modalOpen) return null;
    return ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal">
          <div className="modal__content">
            <div className="modal__top">
              <button onClick={() => this.props.onClose()}>
                <img src={closeBtn} />
              </button>
            </div>
            <Slider
              imageIndex={this.props.imageIndex}
              slideItems={this.props.content}
            />
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("root")
    );
  }
}

export default Modal;
