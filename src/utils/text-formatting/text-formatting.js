export const capitaliseFirstLetter = (string) => {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
};

export const capitaliseFirstLetterArr = (string) => {
  string = string.replace("-", " ").split(" ");
  let capitalised = string
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return capitalised;
};

export const formatUrl = (string) => {
  return string
    .replace("ns", "n's")
    .replace("-", " ")
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};
