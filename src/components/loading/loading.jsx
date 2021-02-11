import React from "react";
import "./loading.scss";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner
        style={{
          height: "3rem",
          width: "3rem",
          borderWidth: ".4rem",
        }}
        animation="border"
        variant="primary"
      />
    </div>
  );
};

export default Loading;
