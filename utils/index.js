const checkIfImageIsValid = (url) => {
  if (!url.trim()) {
    return false;
  }

  // Regular expression to validate URL format
  const urlRegex =
    /^(http[s]?:\/\/)?(www\.)?([^\/\s]+\/)([^?\s]+)?\.(jpg|jpeg|png|gif|bmp|svg)$/i;

  if (!urlRegex.test(url)) {
    return false;
  }

  return true;
};

export { checkIfImageIsValid };
