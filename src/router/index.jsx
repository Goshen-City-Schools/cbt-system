import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import GeneralNotFound from "../pages/NotFound";

// Auth Pages
import LoginPage from "../pages/auth/Login";

// Layouts
import UserLayout from "../layouts/userLayout";
import AdminLayout from "../layouts/adminLayout";

// User pages
import MyExamsPage from "../pages/user/MyExams";
import ViewScoresPage from "../pages/user/ViewScores";
import MyAssessmentTestPage from "../pages/user/assessments";
import MoodlePage from "../screens/Moodle";
import HomePage from "../pages/admin/Home";
import AdminNotFound from "../pages/AdminNotFound";
import ExamsPage from "../pages/admin/Exams";
import AssessmentsPage from "../pages/admin/Assessments";
// import SetNewExamPage from "../pages/admin/Exams/New";
import SetNewTestPage from "../pages/admin/Assessments/New";
import WritePage from "../screens/Write";
import CreateExamQuestionsPage from "../pages/admin/Exams/Create";
import ExamSetup from "../screens/ExamSetup";

// Admin Pages

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth" element={<LoginPage />} />

      <Route element={<UserLayout />}>
        <Route index element={<GeneralNotFound />} />
        <Route path="/exams" element={<MyExamsPage />} />
        <Route path="/assessments">
          <Route index element={<MyAssessmentTestPage />} />
          <Route path=":assessmentID" element={<MoodlePage />} />
        </Route>
        <Route path="/view-scores" element={<ViewScoresPage />} />

        <Route path="*" element={<GeneralNotFound />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin">
          <Route index element={<HomePage />} />
          <Route path="exams">
            <Route index element={<ExamsPage />} />
            <Route path="new" element={<ExamSetup />} />
            <Route path="create" element={<CreateExamQuestionsPage />} />
            <Route path=":subjectExamId">
              <Route index element={<CreateExamQuestionsPage />} />
              <Route path="preview" element={<CreateExamQuestionsPage />} />
              <Route path="settings" element={<CreateExamQuestionsPage />} />
              <Route
                path=":questionIndex"
                element={<CreateExamQuestionsPage />}
              />
            </Route>
            <Route
              path="write"
              element={<WritePage type={"Exam"} subject={"Subject"} />}
            />
          </Route>
          <Route path="assessments">
            <Route index element={<AssessmentsPage />} />
            <Route path="new" element={<SetNewTestPage />} />
          </Route>

          <Route path="*" element={<AdminNotFound />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
