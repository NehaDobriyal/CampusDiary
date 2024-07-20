import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// PAGES
// Auth Pages
import { LoginForm } from "./pages/Auth/LoginForm";
import { SignupForm } from "./pages/Auth/SignupForm";
import { VerifyForm } from "./pages/Auth/VerifyForm";

// Error Pages
import MaintenanceError from "./pages/error/maintenance-error";
import GeneralError from "./pages/error/general-error";
import NotFoundError from "./pages/error/not-found";

// User Pages
import UserLayout from "./pages/User/UserLayout";
import UserHome from "./pages/User/UserHome";
import UserCommunity from "./pages/User/UserCommunity";

// Context
import { useAuth } from "./context/authcontext";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Conditional Routing based on Authentication */}
          {isLoggedIn ? (
            <>
              {/* Private Routes with User Layout */}
              <Route element={<PrivateRoutes />}>
                <Route path="/community" element={<UserLayout />}>
                  <Route index element={<Navigate to="/community/chat" />} />
                  <Route path="chat" element={<UserCommunity />} />
                  <Route path="personalChat" element={<UserHome />} />
                  <Route path="tos" element={<UserHome />} />
                  <Route path="page4" element={<UserHome />} />
                  <Route path="page5" element={<UserHome />} />
                </Route>
              </Route>
              {/* Redirect to home or a specific page if authenticated */}
              <Route path="/" element={<Navigate to="/community" />} />
            </>
          ) : (
            <>
              {/* Auth Routes */}
              <Route path="/signin" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/verification-one-time-password" element={<VerifyForm />} />
              <Route path="/forgot-password" element={<Navigate to="/404" />} />
              <Route path="/reset-password" element={<Navigate to="/404" />} />
              <Route path="/change-password" element={<Navigate to="/404" />} />
              {/* Redirect to login page if not authenticated */}
              <Route path="/" element={<Navigate to="/signin" />} />
            </>
          )}

          {/* Error Routes */}
          <Route path="/404" element={<NotFoundError />} />
          <Route path="/503" element={<MaintenanceError />} />
          <Route path="/500" element={<GeneralError />} />

          {/* Catch-all Route */}
          <Route path="*" element={isLoggedIn?<Navigate to="/community"/>: <Navigate to="/signup"/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
