const checkIfImageIsValid = (url) => {
  if (!url) {
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

const timeAgo = (date) => {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();

  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHrs = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHrs / 24);

  if (diffInSecs < 60) {
    return diffInSecs + "s";
  } else if (diffInMins < 60) {
    return diffInMins + " min";
  } else if (diffInHrs < 24) {
    return diffInHrs + "h";
  } else if (diffInDays == 1) {
    return "Yesterday";
  } else {
    return diffInDays + " days";
  }
};

export { checkIfImageIsValid, timeAgo };
