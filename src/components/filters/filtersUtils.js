import queryString from 'query-string';

export const paramsHandler = (colors, history, location, colorSelected) => {
  var paramsArr = [colors];

  if (colors.includes(colorSelected)) {
    history.push({
      pathname: location.pathname,
      search: '?' + new URLSearchParams({ colors: paramsArr }),
    });
  } else {
    const params =
      location.search.length > 0 ? queryString.parse(location.search) : false;

    const filteredParamsArr =
      params &&
      params.colors.split(',').filter((param) => param !== colorSelected);

    if (filteredParamsArr.length > 0) {
      history.push({
        pathname: location.pathname,
        search: '?' + new URLSearchParams({ colors: filteredParamsArr }),
      });
    } else {
      history.push({
        pathname: location.pathname,
      });
    }
  }
};
