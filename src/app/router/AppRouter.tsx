import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

/* Authentication */
import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute";

/* Dashboard */
import DashboardPage from "../../features/dashboard/pages/DashboardPage";

/* Employees */
import EmployeesPage from "../../features/employees/pages/EmployeesPage";
import AddEmployeePage from "../../features/employees/pages/AddEmployeePage";
import EmployeesRolePage from "../../features/employees/pages/EmployeesRolePage";
import EditEmployeePage from "../../features/employees/components/EditEmployeePage";

/* Leads */
import LeadsPage from "../../features/leads/pages/LeadsPage";

/* Customers */
import CustomersPage from "../../features/customers/pages/CustomersPage";

/* Site Visits */
import SiteVisitsPage from "../../features/site-visits/pages/SiteVisitsPage";

/* Attendance */
import AttendancePage from "../../features/attendence/pages/AttendencePage";

/* Accounts */
import AccountsPage from "../../features/accounts/pages/AccountsPage";

/* Marketing */
import MarketingDashboard from "../../features/marketing/pages/MarketingDashboard";
import MarketingEmployeesPage from "../../features/marketing/pages/MarketingEmployeesPage";
import ManagersPage from "../../features/marketing/pages/MangersPage";
import AgentsPage from "../../features/marketing/pages/AgentsPage";
import SubAgentsPage from "../../features/marketing/pages/SubAgentsPage";
import HierarchyPage from "../../features/marketing/pages/HirerarchyPage";
import MarketingReports from "../../features/marketing/pages/MarketingReports";

/* Media */
import MediaLibraryPage from "../../features/media-library/pages/MediaLibraryPage";

/* Reports */
import ReportsDashboard from "../../features/reports/pages/ReportsDashboard";
import EmployeePerformancePage from "../../features/reports/pages/EmployeePerformancePage";
import AttendanceReportPage from "../../features/reports/pages/AttendanceReportPage";
import CustomerAssignmentPage from "../../features/reports/pages/CustomerAssignmentPage";
import MonthlyActivityPage from "../../features/reports/pages/MonthlyActivityPage";
import BookingReportPage from "../../features/reports/pages/BookingReports";
import SiteVisitReportPage from "../../features/reports/pages/SiteVisitReportPage";

export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>

          <Route element={<AppLayout />}>

            {/* Dashboard */}
            <Route
              path="/"
              element={<DashboardPage />}
            />

            {/* Employees */}
            <Route
              path="/employees"
              element={<EmployeesPage />}
            />

            <Route
              path="/employees/new"
              element={<AddEmployeePage />}
            />

            <Route
              path="/employees/edit/:id"
              element={<EditEmployeePage />}
            />

            <Route
              path="/employees/:role"
              element={<EmployeesRolePage />}
            />

            {/* Leads */}
            <Route
              path="/leads"
              element={<LeadsPage />}
            />

            {/* Customers */}
            <Route
              path="/customers"
              element={<CustomersPage />}
            />

            {/* Site Visits */}
            <Route
              path="/site-visits"
              element={<SiteVisitsPage />}
            />

            {/* Attendance */}
            <Route
              path="/attendance"
              element={<AttendancePage />}
            />

            {/* Accounts */}
            <Route
              path="/accounts"
              element={<AccountsPage />}
            />

            {/* Media */}
            <Route
              path="/media-library"
              element={<MediaLibraryPage />}
            />

            {/* Marketing */}
            <Route
              path="/marketing/dashboard"
              element={<MarketingDashboard />}
            />

            <Route
              path="/marketing/employees"
              element={<MarketingEmployeesPage />}
            />

            <Route
              path="/marketing/inactive-employees"
              element={<MarketingEmployeesPage />}
            />

            <Route
              path="/marketing/managers"
              element={<ManagersPage />}
            />

            <Route
              path="/marketing/agents"
              element={<AgentsPage />}
            />

            <Route
              path="/marketing/sub-agents"
              element={<SubAgentsPage />}
            />

            <Route
              path="/marketing/hierarchy"
              element={<HierarchyPage />}
            />

            <Route
              path="/marketing/reports"
              element={<MarketingReports />}
            />

            {/* Reports */}
            <Route
              path="/reports"
              element={<ReportsDashboard />}
            />

            <Route
              path="/reports/employee-performance"
              element={<EmployeePerformancePage />}
            />

            <Route
              path="/reports/attendance"
              element={<AttendanceReportPage />}
            />

            <Route
              path="/reports/customer-assignment"
              element={<CustomerAssignmentPage />}
            />

            <Route
              path="/reports/monthly-activity"
              element={<MonthlyActivityPage />}
            />

            <Route
              path="/reports/bookings"
              element={<BookingReportPage />}
            />

            <Route
              path="/reports/site-visits"
              element={<SiteVisitReportPage />}
            />

            {/* Temporary */}
            <Route
              path="/digital-marketers"
              element={<EmployeesPage />}
            />

            <Route
              path="/telecallers"
              element={<EmployeesPage />}
            />

            <Route
              path="/marketers"
              element={<EmployeesPage />}
            />

            <Route
              path="/receptionist"
              element={<EmployeesPage />}
            />

            <Route
              path="/office-boy"
              element={<EmployeesPage />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}