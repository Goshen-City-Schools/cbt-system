const gradingScale = [
  { minScore: 90, grade: "A+", remark: "Distinction" },
  { minScore: 80, maxScore: 89, grade: "A", remark: "Distinction" },
  { minScore: 70, maxScore: 79, grade: "B", remark: "Credit" },
  { minScore: 60, maxScore: 69, grade: "C", remark: "Credit" },
  { minScore: 50, maxScore: 59, grade: "D", remark: "Pass" },
  { minScore: 0, maxScore: 49, grade: "F", remark: "Fail" },
];

function assignGrade(totalScore) {
  // Define a grading scale with score ranges and corresponding grades

  // Iterate through the grading scale and find the grade for the given total score
  for (const gradeInfo of gradingScale) {
    if (
      gradeInfo.minScore <= totalScore &&
      (gradeInfo.maxScore === undefined || totalScore <= gradeInfo.maxScore)
    ) {
      return gradeInfo.grade;
    }
  }

  // If the total score doesn't match any range, return an appropriate default grade
  return "N/A";
}

function teacherRemark(totalScore) {
  // Define a grading scale with score ranges and corresponding grades

  // Iterate through the grading scale and find the grade for the given total score
  for (const gradeInfo of gradingScale) {
    if (
      gradeInfo.minScore <= totalScore &&
      (gradeInfo.maxScore === undefined || totalScore <= gradeInfo.maxScore)
    ) {
      return gradeInfo.remark;
    }
  }

  // If the total score doesn't match any range, return an appropriate default grade
  return "N/A";
}

export { assignGrade, teacherRemark };
