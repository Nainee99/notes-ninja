import { Sidebar } from "./_components/Sidebar";
import { TopNavBar } from "./_components/TopNavBar";
import { NewNoteButton } from "./_components/NewNoteButton";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden ml-64">
        <TopNavBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6">
          {children}
        </main>
      </div>
      <NewNoteButton />
    </div>
  );
}
