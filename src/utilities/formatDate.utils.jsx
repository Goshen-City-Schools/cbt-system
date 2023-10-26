function formatDate(dateString, format = "short") {
  const options = {
    year: "numeric",
    month: format === "short" ? "short" : "numeric",
    day: "numeric",
  };

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  if (format === "short") {
    return date.toLocaleDateString("en-US", options);
  } else {
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${date.getDate()}-${monthName}-${year}`;
  }
}

export default formatDate;
