import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import GeneralNotFound from "../pages/NotFound";

// User pages
import HomePage from "../pages/Home";

// Admin Pages

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="/auth" element={<LoginScreen />} /> */}
      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<GeneralNotFound />} />
    </Route>
  )
);

export default router;
