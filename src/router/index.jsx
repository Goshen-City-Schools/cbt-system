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

// User pages
import HomePage from "../pages/user/Home";
import MyExamsPage from "../pages/user/MyExams";
import ViewScoresPage from "../pages/user/ViewScores";
import MyAssessmentTestPage from "../pages/user/assessments";

// Admin Pages

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth" element={<LoginPage />} />
      <Route element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/exams" element={<MyExamsPage />} />
        <Route path="/assessments" element={<MyAssessmentTestPage />} />
        <Route path="/view-scores" element={<ViewScoresPage />} />
      </Route>

      <Route path="*" element={<GeneralNotFound />} />
    </Route>
  )
);

export default router;
