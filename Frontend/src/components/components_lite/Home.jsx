import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllJobs(); // Trigger data fetch
  const jobs = useSelector((state) => state.jobs.allJobs); // Access Redux state

  // Log to check state
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      {/* LatestJobs now handles its own internal skeleton state */}
      <LatestJobs loading={loading} />
      <Footer />
    </div>
  );
};

export default Home;
