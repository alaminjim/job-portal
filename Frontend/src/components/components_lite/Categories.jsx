import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  FaLaptopCode,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaRobot,
  FaShieldAlt,
  FaProductHunt,
  FaPalette,
  FaVideo,
} from "react-icons/fa";

const categories = [
  { name: "Frontend Developer", icon: <FaLaptopCode size={20} /> },
  { name: "Backend Developer", icon: <FaServer size={20} /> },
  { name: "Full Stack Developer", icon: <FaLaptopCode size={20} /> },
  { name: "Mern Developer", icon: <FaDatabase size={20} /> },
  { name: "Data Scientist", icon: <FaRobot size={20} /> },
  { name: "DevOps Engineer", icon: <FaNetworkWired size={20} /> },
  { name: "Machine Learning Engineer", icon: <FaRobot size={20} /> },
  { name: "Artificial Intelligence Engineer", icon: <FaRobot size={20} /> },
  { name: "Cybersecurity Engineer", icon: <FaShieldAlt size={20} /> },
  { name: "Product Manager", icon: <FaProductHunt size={20} /> },
  { name: "UX/UI Designer", icon: <FaPalette size={20} /> },
  { name: "Video Editor", icon: <FaVideo size={20} /> },
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-aura tracking-tight">Categories</h1>
        <p className="text-gray-500 mt-2 font-medium">Explore trending career paths and industries.</p>
      </div>

      <Carousel
        className="w-full max-w-5xl mx-auto relative px-4"
        loop
      >
        <CarouselContent className="flex gap-4">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              onClick={() => searchjobHandler(category.name)}
              className="flex-none px-6 py-4 aura-gradient text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-3 border border-white/20"
            >
              <div className="flex items-center justify-center text-white drop-shadow-md">
                {category.icon}
              </div>
              <p className="text-base font-semibold whitespace-nowrap">
                {category.name}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons - subtle gap from items */}
        <CarouselPrevious className="absolute top-1/2 -left-0.5 sm:-left-1 md:-left-1.5 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition z-20" />
        <CarouselNext className="absolute top-1/2 -right-0.5 sm:-right-1 md:-right-1.5 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition z-20" />
      </Carousel>
    </div>
  );
};

export default Categories;
