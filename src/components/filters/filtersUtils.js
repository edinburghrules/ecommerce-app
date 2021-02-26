import queryString from "query-string";

export const colorsUrlParamsHandler = (colorFilters, history, location) => {
  const colorParamsArr = [...colorFilters.colors];
  const bestForQueryString = location.search
    ? queryString.parse(location.search).bestfor
    : false;
  const weatherQueryString = location.search
    ? queryString.parse(location.search).weather
    : false;
  // If the colorParamsArr includes the selected color, add the colorParamsArr as url query
  if (colorParamsArr.includes(colorFilters.selectedColor)) {
    history.push({
      pathname: location.pathname,
      search:
        "?" +
        new URLSearchParams({
          colors: colorParamsArr,
          ...(bestForQueryString && { bestfor: bestForQueryString.split(",") }),
          ...(weatherQueryString && { weather: weatherQueryString.split(",") }),
        }),
    });
  } else {
    // If the colorParamsArr DOES NOT include the selected color, remove from colorParamsArr
    const params =
      location.search.length > 0 ? queryString.parse(location.search) : false;

    // Remove the color deselected from the url parameters
    const filteredParamsArr =
      params &&
      params.colors
        .split(",")
        .filter((param) => param !== colorFilters.selectedColor);

    // If there are filters applied
    if (filteredParamsArr.length > 0) {
      history.push({
        pathname: location.pathname,
        search:
          "?" +
          new URLSearchParams({
            colors: filteredParamsArr,
            ...(bestForQueryString && {
              bestfor: bestForQueryString.split(","),
            }),
          }),
      });
    } else {
      history.push({
        pathname: location.pathname,
        search:
          bestForQueryString || weatherQueryString
            ? "?" +
              new URLSearchParams({
                ...(bestForQueryString && {
                  bestfor: bestForQueryString.split(","),
                }),
                ...(weatherQueryString && {
                  weather: weatherQueryString.split(","),
                }),
              })
            : "",
      });
    }
  }
};

export const bestForUrlParamsHandler = (bestForFilters, history, location) => {
  const bestForParamsArr = [...bestForFilters];
  const colorQueryString = location.search
    ? queryString.parse(location.search).colors
    : false;
  const weatherQueryString = location.search
    ? queryString.parse(location.search).weather
    : false;
  if (bestForFilters.length > 0) {
    history.push({
      pathname: location.pathname,
      search:
        "?" +
        new URLSearchParams({
          bestfor: bestForParamsArr,
          ...(colorQueryString && { colors: colorQueryString.split(",") }),
          ...(weatherQueryString && { weather: weatherQueryString.split(",") }),
        }),
    });
  } else {
    history.push({
      pathname: location.pathname,
      search:
        colorQueryString || weatherQueryString
          ? "?" +
            new URLSearchParams({
              ...(colorQueryString && { colors: colorQueryString.split(",") }),
              ...(weatherQueryString && {
                weather: weatherQueryString.split(","),
              }),
            })
          : "",
    });
  }
};

export const weatherParamsHandler = (weatherFilters, history, location) => {
  const weatherParamsArr = [...weatherFilters];
  console.log(location.search);
  const colorQueryString = location.search
    ? queryString.parse(location.search).colors
    : false;
  const bestForQueryString = location.search
    ? queryString.parse(location.search).bestfor
    : false;
  if (weatherFilters.length > 0) {
    history.push({
      pathname: location.pathname,
      search:
        "?" +
        new URLSearchParams({
          weather: weatherParamsArr,
          ...(colorQueryString && { colors: colorQueryString.split(",") }),
          ...(bestForQueryString && { bestfor: bestForQueryString.split(",") }),
        }),
    });
  } else {
    history.push({
      pathname: location.pathname,
      search:
        colorQueryString || bestForQueryString
          ? "?" +
            new URLSearchParams({
              ...(colorQueryString && { colors: colorQueryString.split(",") }),
              ...(bestForQueryString && {
                bestfor: bestForQueryString.split(","),
              }),
            })
          : "",
    });
  }
};

export const captialiseFirstLetter = (string) => {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
};
