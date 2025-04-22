import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";

function Snowmountains() {
  const [snowMountainsArray, setSnowMountainsArray] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold mb-8 text-center">Snow Mountains</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {snowMountainsArray.map((snm) => (
          <div key={snm.id} className="mountain-card rounded-lg shadow-lg overflow-hidden">
            <img
              src={snm.image || "default-image-url.jpg"} // Fallback image if no image is provided
              alt={snm.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-center mb-2">{snm.name}</h2>
              <h3 className="text-lg text-center text-gray-500 flex items-center justify-center">
                <MdLocationPin className="mr-2" /> {snm.location}
              </h3>
              <div className="text-center mt-4">
                <NavLink to={`/explore/snowmountains/${snm.id}`}>
                  <button className="detail-btn bg-[#FB8500] text-white px-4 py-2 rounded-md hover:bg-[#FB6A00]">
                    See Detail
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Snowmountains;
