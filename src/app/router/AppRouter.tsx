import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import MarketingEmployeesPage from "../../features/marketing/pages/MarketingEmployeesPage";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import EmployeesPage from "../../features/employees/pages/EmployeesPage";
import LeadsPage from "../../features/leads/pages/LeadsPage";
// import LeadsPage from "../../features/leads/pages/LeadsPage";
import CustomersPage from "../../features/customers/pages/CustomersPage";
import SiteVisitsPage from "../../features/site-visits/pages/SiteVisitsPage";
import AccountsPage from "../../features/accounts/pages/AccountsPage";
import AttendancePage from "../../features/attendence/pages/AttendencePage";
import MarketingDashboard from "../../features/marketing/pages/MarketingDashboard";
import ManagersPage from "../../features/marketing/pages/MangersPage";
import AgentsPage from "../../features/marketing/pages/AgentsPage";
import SubAgentsPage from "../../features/marketing/pages/SubAgentsPage";
import HierarchyPage from "../../features/marketing/pages/HirerarchyPage";
import MarketingReports from "../../features/marketing/pages/MarketingReports";
import MediaLibraryPage from "../../features/media-library/pages/MediaLibraryPage";
import ReportsDashboard from "../../features/reports/pages/ReportsDashboard";
import EmployeePerformancePage from "../../features/reports/pages/EmployeePerformancePage";
import AttendanceReportPage from "../../features/reports/pages/AttendanceReportPage";
import CustomerAssignmentPage from "../../features/reports/pages/CustomerAssignmentPage";
// import MonthlyActivityPage from "../../features/reports/pages/MonthlyActivityPage";
import SiteVisitReportPage from "../../features/reports/pages/SiteVisitReportPage";
import BookingReportPage from "../../features/reports/pages/BookingReports";
import MonthlyActivityPage from "../../features/reports/pages/MonthlyActivityPage";
import AddEmployeePage from "../../features/employees/pages/AddEmployeePage";
import EmployeesRolePage from "../../features/employees/pages/EmployeesRolePage";
import EditEmployeePage from "../../features/employees/components/EditEmployeePage";

import InactiveMarketingEmployeesPage from "../../features/marketing/pages/MarketingEmployeesPage";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/media-library" element={<MediaLibraryPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
<Route
  path="/marketing/inactive-employees"
  element={<InactiveMarketingEmployeesPage />}
/>
<Route
  path="/employees/new"
  element={<AddEmployeePage />}
/>
<Route
    path="/customers"
    element={<CustomersPage />}
/>
<Route
  path="/marketing/employees"
  element={<MarketingEmployeesPage />}
/>
<Route
  path="/employees/edit/:id"
  element={<EditEmployeePage /> } />

<Route
  path="/employees/:role"
  element={<EmployeesRolePage />}
/>
<Route path="/reports" element = {<ReportsDashboard />} />
{/* marketing */}
<Route path = "/marketing/dashboard" element = {<MarketingDashboard />} />
<Route
    path="/marketing/managers" element = {<ManagersPage />} />
 <Route
    path="/marketing/agents" element = {<AgentsPage />} />
<Route
  path="/reports/site-visits"
  element={<SiteVisitReportPage />}
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
    path="/marketing/sub-agents" element = { <SubAgentsPage /> } />

    <Route
    path="/marketing/hierarchy" element = { <HierarchyPage /> } />

    <Route
    path="/marketing/reports" element = { <MarketingReports /> } />
{/* Report */}
<Route path="/reports" element= {<ReportsDashboard /> } />
<Route
  path="/reports/employee-performance" element={<EmployeePerformancePage />} />
 
<Route path="/reports/attendance"  element= {<AttendanceReportPage /> } />
<Route path="/reports/customer-assignment" element={<CustomerAssignmentPage />} />
<Route path="
/reports/monthly-activity" element={<MonthlyActivityPage /> } />
<Route path="/reports/site-visits" element={<SiteVisitsPage />} />
          {/* Employees */}
          <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/site-visits" element={<SiteVisitsPage />} />
          {/* Temporary Pages */}
          <Route path="/digital-marketers" element={<EmployeesPage />} />
          <Route path="/telecallers" element={<EmployeesPage />} />
          <Route path="/marketers" element={<EmployeesPage />} />
          <Route path="/receptionist" element={<EmployeesPage />} />
<Route path="/office-boy" element={<EmployeesPage />} />
<Route path="/accounts" element={<AccountsPage /> } />
<Route path="/attendance" element={<AttendancePage />} />
        </Route>
      </Routes>
      {/* <Route
  path="/leads"
  element={< LeadsPage />}
/> */}
    </BrowserRouter>
  );
}