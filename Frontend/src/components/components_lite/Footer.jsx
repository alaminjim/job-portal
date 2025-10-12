import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Branding */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
              JobPortal
            </h1>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            A Job Portal is an online platform that connects job seekers with
            employers. It acts as a digital marketplace where companies post job
            openings and candidates search and apply for relevant positions.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 text-gray-600 mt-2">
            <a
              href="https://github.com/alaminjim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition transform hover:scale-110"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://twitter.com/md_alamin_jim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition transform hover:scale-110"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com/in/alaminjim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition transform hover:scale-110"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-gray-800 text-lg">Company</h2>
          <ul className="text-sm space-y-2">
            {[
              { name: "Home", to: "/" },
              { name: "About Us", to: "/about" },
              { name: "Contact Us", to: "/contact" },
              { name: "Privacy Policy", to: "/privacy" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="relative inline-block text-gray-600 font-medium transition-all duration-300 group"
                >
                  <span className="group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-indigo-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {link.name}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-gray-800 text-lg">
            Subscribe to our Newsletter
          </h2>
          <p className="text-sm text-gray-600">
            Get the latest job updates, resources, and tips — straight to your
            inbox.
          </p>

          {/* Input + Button */}
          <div className="flex sm:flex-row sm:items-center mt-2 w-full gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none flex-1 w-full"
            />
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium  sm:mt-0 h-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
        © 2024 Sunfire Sensei. All rights reserved. <br className="sm:hidden" />
        Powered by{" "}
        <a
          href="https://github.com/alaminjim"
          className="underline text-gray-700 bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 bg-clip-text  hover:opacity-80 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Al Amin Islam
        </a>
      </div>
    </footer>
  );
};

export default Footer;
