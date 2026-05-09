import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/authSlice";

// Loader component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Lazy Loaded Components
const Home = lazy(() => import("@/components/components_lite/Home"));
const Jobs = lazy(() => import("@/components/components_lite/Jobs"));
const Browse = lazy(() => import("@/components/components_lite/Browse"));
const Profile = lazy(() => import("@/components/components_lite/Profile"));
const Description = lazy(() => import("@/components/components_lite/Description"));
const UserApplications = lazy(() => import("@/components/components_lite/UserApplications"));
const SavedJobs = lazy(() => import("@/components/components_lite/SavedJobs"));

const Companies = lazy(() => import("@/components/admincomponent/Companies"));
const CompanyCreate = lazy(() => import("@/components/admincomponent/CompanyCreate"));
const CompanySetup = lazy(() => import("@/components/admincomponent/CompanySetup"));
const AdminJobs = lazy(() => import("@/components/admincomponent/AdminJobs"));
const PostJob = lazy(() => import("@/components/admincomponent/PostJob"));
const Applicants = lazy(() => import("@/components/admincomponent/Applicants"));
const AdminAllApplicants = lazy(() => import("@/components/admincomponent/AdminAllApplicants"));
const ProtectedRoute = lazy(() => import("@/components/admincomponent/ProtectedRoute"));

const Login = lazy(() => import("@/components/authentication/Login"));
const Register = lazy(() => import("@/components/authentication/Register"));

// Helper to wrap elements in Suspense
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const appRouter = createBrowserRouter([
  // Public Routes
  { path: "/", element: <SuspenseWrapper><Home /></SuspenseWrapper> },
  { path: "/Home", element: <SuspenseWrapper><Home /></SuspenseWrapper> },
  { path: "/login", element: <SuspenseWrapper><Login /></SuspenseWrapper> },
  { path: "/register", element: <SuspenseWrapper><Register /></SuspenseWrapper> },
  { path: "/description/:id", element: <SuspenseWrapper><Description /></SuspenseWrapper> },
  { path: "/Profile", element: <SuspenseWrapper><Profile /></SuspenseWrapper> },
  { path: "/Jobs", element: <SuspenseWrapper><Jobs /></SuspenseWrapper> },
  { path: "/Browse", element: <SuspenseWrapper><Browse /></SuspenseWrapper> },
  { path: "/my-applications", element: <SuspenseWrapper><UserApplications /></SuspenseWrapper> },
  { path: "/saved-jobs", element: <SuspenseWrapper><SavedJobs /></SuspenseWrapper> },

  // Admin Routes (Protected)
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper><Companies /></SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper><CompanyCreate /></SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper><CompanySetup /></SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper><AdminJobs /></SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper><PostJob /></SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/applicants",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper><AdminAllApplicants /></SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper><Applicants /></SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset loading state on app mount in case redux-persist saved it as true
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
