const getFormattedDate = () => {
  const date = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );

  const formatted = `${date.getMonth()}:${date.getDate()}:${date.getFullYear()}`;

  return formatted;
};

module.exports = getFormattedDate;
