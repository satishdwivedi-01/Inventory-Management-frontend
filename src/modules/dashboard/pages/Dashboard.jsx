import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchDashboard } from "../dashboardSlice";
import SummaryCards from "../components/SummaryCards";
import LowStockList from "../components/LowStockList";
import RecentMovements from "../components/RecentMovements";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((s) => s.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"/>
          </svg>
          <span className="text-lg font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/70 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <header className="mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-gray-600">Overview of your inventory status</p>
        </header>

        <SummaryCards
          totalProducts={data.totalProducts}
          lowStockCount={data.lowStockCount}
        />

        <div className="grid lg:grid-cols-2 gap-6 xl:gap-8">
          <LowStockList items={data.lowStockProducts} />
          <RecentMovements items={data.recentMovements} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;