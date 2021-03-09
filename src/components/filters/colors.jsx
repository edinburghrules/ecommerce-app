import { captialiseFirstLetter } from "./filtersUtils";

const COLOR_FILTER_OPTIONS = [
  "black",
  "grey",
  "blue",
  "teal",
  "brown",
  "green",
  "pink",
  "purple",
  "red",
  "white",
];

const ColorFilters = (props) => {
  const { handleSelect, selectedColors } = props;
  return (
    <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {COLOR_FILTER_OPTIONS.map((colorFilterOption, index) => (
        <li key={index}>
          <label
            className={
              selectedColors.includes(colorFilterOption) ? "active" : ""
            }
          >
            <button
              id={colorFilterOption}
              onClick={handleSelect}
              className={
                selectedColors.includes(colorFilterOption)
                  ? `filters__color-btn filters__color-btn--${colorFilterOption} active`
                  : `filters__color-btn filters__color-btn--${colorFilterOption}`
              }
            ></button>
            {captialiseFirstLetter(colorFilterOption)}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ColorFilters;
