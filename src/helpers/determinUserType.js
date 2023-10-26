function determineUserType(userID) {
  // Check if the user ID matches the expected format
  if (/^GSHN\/(STF|STU)\/\d{4}$/.test(userID)) {
    // Extract the user type part (STF or STU)
    const userType = userID.split("/")[1];

    // Determine the user type
    if (userType === "STF") {
      return "Staff";
    } else if (userType === "STU") {
      return "Student";
    }
  }

  // If the user ID doesn't match the format or the user type is not recognized, return 'Unknown'
  return "Unknown";
}

export default determineUserType;
