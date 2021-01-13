import queryString from 'query-string';

export const urlParamsHandler = (colors, history, location, colorSelected) => {
  var paramsArr = [...colors];

  // If the paramsArr includes the selected color, add the paramsArr as url query
  if (paramsArr.includes(colorSelected)) {
    history.push({
      pathname: location.pathname,
      search: '?' + new URLSearchParams({ colors: paramsArr }),
    });
  } else {
    // If the paramsArr DOES NOT include the selected color, remove from paramsArr
    const params =
      location.search.length > 0 ? queryString.parse(location.search) : false;

    // Remove the color deselected from the url parameters
    const filteredParamsArr =
      params &&
      params.colors.split(',').filter((param) => param !== colorSelected);

    // If there are filters applied
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
