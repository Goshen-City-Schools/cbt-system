import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import GeneralNotFound from "../pages/NotFound";

// Auth Pages
import LoginPage from "../pages/auth/Login";

// User pages
import HomePage from "../pages/Home";

// Admin Pages

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<GeneralNotFound />} />
    </Route>
  )
);

export default router;
