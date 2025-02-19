import { Suspense } from "react";
import { NotificationProvider } from "@/components/ui/notifications";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Web3Provider } from "@/providers/Web3Provider";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import Overview from "./pages/dashboard/Overview";
import Devices from "./pages/dashboard/Devices";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import Rewards from "./pages/dashboard/Rewards";

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <NotificationProvider>
          <Suspense fallback={<p>Loading...</p>}>
            <>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />}>
                  <Route index element={<Overview />} />
                  <Route path="devices" element={<Devices />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="rewards" element={<Rewards />} />
                </Route>
              </Routes>
              {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
            </>
          </Suspense>
        </NotificationProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
