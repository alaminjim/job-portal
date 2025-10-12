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
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">Categories</h1>
        <p className="text-gray-400 mt-2">Explore our extensive job market.</p>
      </div>

      <Carousel
        className="w-full max-w-5xl mx-auto relative px-4 sm:px-6 lg:px-8"
        loop
      >
        <CarouselContent className="flex gap-3">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              onClick={() => searchjobHandler(category.name)}
              className="flex-none px-5 py-3 bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-400 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer flex items-center gap-2"
            >
              <div className="flex items-center justify-center text-white">
                {category.icon}
              </div>
              <p className="text-sm font-medium whitespace-nowrap">
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
