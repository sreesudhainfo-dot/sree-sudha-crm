import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../components/navigation/Sidebar";
import Header from "../../components/navigation/Header";

export default function AppLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          search={search}
          setSearch={setSearch}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}