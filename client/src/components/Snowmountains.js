import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Snowmountains({ currentUser }) {
  const [snowMountainsArray, setSnowMountainsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSnowMountain, setHoveredSnowMountain] = useState(null);
  const randomRating = Math.floor(Math.random() * 3) + 3; // 3 to 5 stars
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    fetch("https://explorr.onrender.com/snowmountains")
      .then((res) => res.json())
      .then((snowMountainsArray) => {
        setSnowMountainsArray(snowMountainsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  const handleButtonClick = (id) => {
    if (isAuthenticated) {
      navigate(`/explore/snowmountains/${id}`);
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-12 w-12 text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-orange-50 to-orange-100 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative  h-64 md:h-80 mb-8">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center flex-col text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-wide text-center">
            Discover Paradise
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-center">
            Explore the world's most beautiful Snow Mountains with Explorr
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Popular Snow Mountains
          </h2>
          <div className="bg-white px-3 py-1 rounded-full shadow-sm text-sm text-gray-600">
            {snowMountainsArray.length} destinations
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {snowMountainsArray.map((snowmountain) => (
            <div
              key={snowmountain.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredSnowMountain(snowmountain.id)}
              onMouseLeave={() => setHoveredSnowMountain(null)}
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={snowmountain.image}
                  alt={`${snowmountain.name} Beach`}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredSnowMountain === snowmountain.id
                      ? "scale-110"
                      : "scale-100"
                  }`}
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {snowmountain.name}
                </h3>
                <div className="text-l font-bold text-gray-800 mb-2 flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {snowmountain.location}
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= randomRating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleButtonClick(snowmountain.id)}
                  className="w-full bg-[#FB8500] hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center group"
                >
                  <span>Explore Details</span>
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                {!currentUser && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Login required to view details
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-orange-500 rounded-xl p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">
                Can't find your perfect Forest?
              </h3>
              <p className="text-white text-opacity-90">
                Join our community and discover hidden gems around the world.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-white text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              {currentUser ? "Explore More" : "Sign In to Explore"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Snowmountains;
