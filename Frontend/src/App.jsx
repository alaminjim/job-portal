import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lite Components

import Home from "@/components/components_lite/Home";
import Jobs from "@/components/components_lite/Jobs";
import Browse from "@/components/components_lite/Browse";
import Profile from "@/components/components_lite/Profile";
import Description from "@/components/components_lite/Description";

// Admin Components
import Companies from "@/components/admincomponent/Companies";
import CompanyCreate from "@/components/admincomponent/CompanyCreate";
import CompanySetup from "@/components/admincomponent/CompanySetup";
import AdminJobs from "@/components/admincomponent/AdminJobs";
import PostJob from "@/components/admincomponent/PostJob";
import Applicants from "@/components/admincomponent/Applicants";
import AdminAllApplicants from "@/components/admincomponent/AdminAllApplicants";
import ProtectedRoute from "@/components/admincomponent/ProtectedRoute";

// Auth Components
import Login from "@/components/authentication/Login";
import Register from "@/components/authentication/Register";

const appRouter = createBrowserRouter([
  // Public Routes
  { path: "/", element: <Home /> },
  { path: "/Home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/description/:id", element: <Description /> },
  { path: "/Profile", element: <Profile /> },
  { path: "/Jobs", element: <Jobs /> },
  { path: "/Browse", element: <Browse /> },

  // Admin Routes (Protected)
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/applicants",
    element: (
      <ProtectedRoute>
        <AdminAllApplicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
