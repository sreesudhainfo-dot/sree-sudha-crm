import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/media-library" element={<MediaLibraryPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
<Route
    path="/customers"
    element={<CustomersPage />}
/>

{/* marketing */}
<Route path = "/marketing/dashboard" element = {<MarketingDashboard />} />
<Route
    path="/marketing/managers" element = {<ManagersPage />} />
 <Route
    path="/marketing/agents" element = {<AgentsPage />} />

    <Route
    path="/marketing/sub-agents" element = { <SubAgentsPage /> } />

    <Route
    path="/marketing/hierarchy" element = { <HierarchyPage /> } />

    <Route
    path="/marketing/reports" element = { <MarketingReports /> } />

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