const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${("0" + date.getMinutes()).slice(
    -2
  )}`;
};

export { formatDate };
