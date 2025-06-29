import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../SidebarContext";

function AdminLayoutContent() {
  const { collapsed } = useSidebar();
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="fixed left-0 top-0 h-screen z-30">
        <Sidebar />
      </div>
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'} h-screen overflow-y-auto`}
      >
        <main className="p-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminLayoutContent />
    </SidebarProvider>
  );
} 