import queryString from 'query-string';

export const colorsUrlParamsHandler = (colorFilters, history, location) => {
  const colorParamsArr = [...colorFilters.colors];
  const bestForQueryString = location.search
    ? queryString.parse(location.search).bestFor
    : '';

  // If the colorParamsArr includes the selected color, add the colorParamsArr as url query
  if (colorParamsArr.includes(colorFilters.selectedColor)) {
    history.push({
      pathname: location.pathname,
      search:
        '?' +
        new URLSearchParams({
          colors: colorParamsArr,
          ...(bestForQueryString && { bestFor: bestForQueryString.split(',') }),
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
        .split(',')
        .filter((param) => param !== colorFilters.selectedColor);

    // If there are filters applied
    if (filteredParamsArr.length > 0) {
      history.push({
        pathname: location.pathname,
        search:
          '?' +
          new URLSearchParams({
            colors: filteredParamsArr,
            ...(bestForQueryString && {
              bestFor: bestForQueryString.split(','),
            }),
          }),
      });
    } else {
      history.push({
        pathname: location.pathname,
      });
    }
  }
};

export const bestForUrlParamsHandler = (bestForFilters, history, location) => {
  const bestForParamsArr = [...bestForFilters];
  const colorQueryString = location.search
    ? queryString.parse(location.search).colors
    : '';
  history.push({
    pathname: location.pathname,
    search:
      '?' +
      new URLSearchParams({
        bestFor: bestForParamsArr,
        ...(colorQueryString && { colors: colorQueryString.split(',') }),
      }),
  });
};

export const captialiseFirstLetter = (string) => {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
};
