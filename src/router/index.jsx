import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// layouts

// pages
import Home from "./pages/Home";
import InvoicesPage from "./pages/payments/Invoices.page";
import GenerateInvoicePage from "./pages/payments/GenerateInvoice.page";
import ReceiptsPage from "./pages/payments/Receipts";
import PrintReceiptScreen from "./screens/PrintReceipt.screen";
import PrintInvoiceScreen from "./screens/PrintInvoice.screen";
import LoginScreen from "./screens/Login.screen";
import AdminHome from "./pages/admin/Home";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

import StudentsPage from "./pages/admin/students/Students.page";
import StaffPage from "./pages/admin/staff/Staff.page";
import ResultPage from "./pages/admin/results/Results.page";
import AuthLayout from "./layouts/AuthLayout";
import ParentPage from "./pages/admin/parents/Parents.page";
// import ClassesPage from "./pages/admin/classes/Classes.page";
import TransactionHistory from "./pages/admin/finance/TransactionHistory.page";
import TuitionPage from "./pages/admin/finance/Tuition.page";
import SessionTermPage from "./pages/admin/configs/SessionTerm";
import ResultsViewPage from "./pages/admin/results/ResultsViewPage";
import ResultSinglePage from "./pages/admin/results/Result.page";
import ResultSettingsPage from "./pages/admin/results/ResultSettings.page";
import MyProfilePage from "./pages/admin/profile/MyProfile.page";
import UploadResultPage from "./pages/admin/results/UploadResult.page";
import ExamHomePage from "./pages/admin/cbt/exam/Home.page";
import NotFound from "./pages/admin/NotFound";
import GeneralNotFound from "./pages/NotFound";
import ClassesPage from "./pages/admin/classes/Index.page";
import ClassPage from "./pages/admin/classes/Class.page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth" element={<LoginScreen />} />

      <Route
        path="/admin"
        element={
          <AuthLayout>
            <AdminLayout />
          </AuthLayout>
        }
      >
        {/* Home Route */}

        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="profile" element={<MyProfilePage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="parents" element={<ParentPage />} />
        <Route path="classes">
          <Route index element={<ClassesPage />} />
          <Route path=":class" element={<ClassPage />} />
        </Route>

        <Route path="results">
          <Route index element={<ResultPage />} />
          <Route path="view" element={<ResultsViewPage />} />
          <Route path="upload" element={<UploadResultPage />} />
          <Route path="settings" element={<ResultSettingsPage />} />
          <Route path=":session/:term/:userId" element={<ResultSinglePage />} />
        </Route>

        <Route path="cbt">
          <Route index element={<ExamHomePage />} />
          <Route path="examinations" element={<ExamHomePage />} />
        </Route>

        <Route path="finance">
          <Route index element={<TransactionHistory />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="tuition" element={<TuitionPage />} />
        </Route>

        <Route path="config">
          <Route index element={<SessionTermPage />} />
          <Route path="session-term" element={<SessionTermPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/"
        element={
          <AuthLayout>
            <StudentLayout />
          </AuthLayout>
        }
      >
        {/* Home Route */}
        <Route index element={<Home />} />

        {/* Fees Routes */}
        <Route path="/fees">
          {/* Invoices */}
          <Route path="invoices">
            <Route index element={<InvoicesPage />} />
            <Route path="new" element={<GenerateInvoicePage />} />
            <Route path=":invoiceID" element={<PrintInvoiceScreen />} />
          </Route>

          {/* Receipts */}
          <Route path="receipts">
            <Route index element={<ReceiptsPage />} />
            <Route path="new" element={<PrintReceiptScreen />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<GeneralNotFound />} />
    </Route>
  )
);

export default router;
