import React from "react";
import "./accordion.scss";
import downArrowIcon from "../../assets/down-chevron.svg";

const Accordion = ({ feature, index, handleToggle }) => {
  return (
    <div className="accordion">
      <button
        onClick={() => handleToggle(index)}
        className={feature.open ? "accordion__btn active" : "accordion__btn"}
      >
        {feature.title.toUpperCase()}
        <img src={downArrowIcon} alt="down arrow" />
      </button>
      <div
        className={
          feature.open ? "accordion__content active" : "accordion__content"
        }
      >
        {Array.isArray(feature.content) ? (
          feature.content.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))
        ) : (
          <p>{feature.content}</p>
        )}
      </div>
    </div>
  );
};

export default Accordion;
