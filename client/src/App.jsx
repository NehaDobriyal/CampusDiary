// Modules
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"

// PAGES

// Auth Pages
import { LoginForm } from "./pages/Auth/LoginForm"
import { SignupForm } from "./pages/Auth/SignupForm"
import { VerifyForm } from "./pages/Auth/VerifyForm"

// Error pages
import MaintenanceError from "./pages/error/maintenance-error"
import GeneralError from "./pages/error/general-error"
import NotFoundError from "./pages/error/not-found"

// User Pages
import UserLayout from "./pages/User/UserLayout"
import UserHome from "./pages/User/UserHome"
import UserCommunity from "./pages/User/UserCommunity"




function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>

            {/* Demo Page */}
            {/* <Route path="/" element={<Navigate to="/signin" />} /> */}
            
            {/* Landing Page */} 
            <Route path="/" element={<UserLayout />} >
              <Route path="" element={<Navigate to="/community" />} />
              <Route path="community" element={<UserCommunity />} />
              <Route path="personalChat" element={<UserHome />} />
              <Route path="tos" element={<UserHome />} />
              <Route path="page4" element={<UserHome />} />
              <Route path="page5" element={<UserHome />} />
            </Route>


            {/* Auth */}
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/verification-one-time-password" element={<VerifyForm />} />
            <Route path="/forgot-password" element={<Navigate to="/404" />} />
            <Route path="/reset-password" element={<Navigate to="/404" />} />
            <Route path="/change-password" element={<Navigate to="/404" />} />


            {/* Errors */}
            <Route path="/404" element={<NotFoundError />} />
            <Route path="/503" element={<MaintenanceError />} />
            <Route path="/500" element={<GeneralError />} />

            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </>
  )
}

export default App