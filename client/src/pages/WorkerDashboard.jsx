import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCard from "../components/DashboardCard";
import JobTable from "../components/JobTable";
import { Briefcase, CheckCircle, Wallet } from "lucide-react";

const WorkerDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64 w-full min-h-screen bg-gray-50">
        <Topbar />

        <main className="p-6 space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Active Jobs"
              value="3"
              icon={<Briefcase size={20} />}
              color="bg-blue-100 text-blue-700"
            />
            <DashboardCard
              title="Completed Jobs"
              value="12"
              icon={<CheckCircle size={20} />}
              color="bg-green-100 text-green-700"
            />
            <DashboardCard
              title="Total Earnings"
              value="$345"
              icon={<Wallet size={20} />}
              color="bg-yellow-100 text-yellow-700"
            />
          </div>

          {/* Recent Jobs Table */}
          <JobTable />
        </main>
      </div>
    </div>
  );
};

export default WorkerDashboard;
