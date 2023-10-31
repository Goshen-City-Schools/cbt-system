const generateId = () => {
  // Generate a random unique ID for the exam
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default generateId;
