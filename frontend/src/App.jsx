import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Landing from "./components/shared/Landing";
import Companies from "./components/admin/Companies";
import AdminHome from "./components/admin/AdminHome";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import { useSelector } from "react-redux";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import ApplicantDetails from "./components/admin/ApplicantDetails";
import ScrollToTop from "./components/shared/ScrolledTop";
import {
  ProtectedRoute,
  RecruiterRoute,
  PublicOnlyRoute,
} from "./components/shared/ProtectedRoute";

/* Component that CAN use useLocation */
function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const hideNavbarRoutes = ["/login", "/signup", "/landing"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    if (user?.role === "recruiter" && location.pathname === "/") {
      navigate("/admin/home");
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      <ScrollToTop />

      {!shouldHideNavbar && <Navbar />}

    <Routes>

  {/* Public only */}
  <Route
    path="/login"
    element={
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    }
  />

  <Route
    path="/signup"
    element={
      <PublicOnlyRoute>
        <SignUp />
      </PublicOnlyRoute>
    }
  />

  <Route path="/landing" element={
    <PublicOnlyRoute>
    <Landing />
    </PublicOnlyRoute>
    }/>

  {/* Protected USER routes */}
  <Route
    element={
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    }
  >
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/findjobs" element={<Jobs />} />
    <Route path="/findjobs/description/:id" element={<JobDescription />} />
    <Route path="/description/:id" element={<JobDescription />} />
    <Route path="/browse" element={<Browse />} />
    <Route path="/profile" element={<Profile />} />
  </Route>

  {/* Admin Routes */}
  <Route
    path="/admin"
    element={
      <RecruiterRoute>
        <Outlet />
      </RecruiterRoute>
    }
  >
    <Route path="home" element={<AdminHome />} />
    <Route path="companies" element={<Companies />} />
    <Route path="companies/:id" element={<CompanySetup />} />
    <Route path="home/create" element={<CreateCompany />} />
    <Route path="companies/create" element={<CreateCompany />} />
    <Route path="myjobs" element={<AdminJobs />} />
    <Route path="myjobs/create" element={<PostJob />} />
    <Route path="myjobs/:id/applicants" element={<ApplicantDetails />} />
  </Route>

</Routes>
    </>
  );
}

/* Main App ONLY provides Router */
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
