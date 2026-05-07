import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import HomeStats from "./HomeStats";
import FeatureAura from "./FeatureAura";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import TopCompanies from "./TopCompanies";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useGetAllJobs(); // Trigger data fetch
  const jobs = useSelector((state) => state.jobs.allJobs); // Access Redux state

  // Log to check state
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchedQuery(""));
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <TopCompanies />
      <HomeStats />
      <Categories />
      <LatestJobs loading={loading} />
      <Testimonials />
      <FeatureAura />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
