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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>

          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
<Route
    path="/customers"
    element={<CustomersPage />}
/>
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