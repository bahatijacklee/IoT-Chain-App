import Header from "@/components/dashboard/Header";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto p-6 ml-16">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;
