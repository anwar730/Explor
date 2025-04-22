import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Form from "./Form";
import { useLoading } from "../components/LoadingContext"; // Import the loading context

function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const [filtered, setFiltered] = useState({});
  const [showGoalBox, setShowGoalBox] = useState(false);
  const { setLoading } = useLoading(); // Access the loading state

  useEffect(() => {
    const resourceType = location.pathname.split("/")[2]; // e.g. 'beaches'
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when the fetch starts
        const res = await fetch(`https://explorr.onrender.com/${resourceType}/${id}`);
        const data = await res.json();
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch completes
      }
    };
    
    fetchData();
  }, [id, location.pathname, setLoading]);

  const handleShowGoalBox = () => {
    setShowGoalBox((prev) => !prev);
  };

  if (!filtered.name) {
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
    <>
      <section className="px-4 md:px-12 lg:px-24 py-12 bg-white">
        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={filtered.image}
              alt={filtered.name}
              className=" h-80 md:h-[450px] object-cover rounded-lg shadow-md"
            />
            <h2 className="text-2xl md:text-3xl font-semibold text-[#FB8500] mt-4 text-center lg:text-left">
              {filtered.name}
            </h2>
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h4 className="text-lg font-medium mb-2 text-gray-700">
              Location: <span className="text-black">{filtered.location}</span>
            </h4>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Description:</h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              {filtered.details}
            </p>

            <button
              onClick={handleShowGoalBox}
              className="bg-[#FB8500] hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {showGoalBox ? "Hide Trip Form" : "Save for a Trip"}
            </button>

            {/* Trip Form */}
            {showGoalBox && (
              <div className="mt-8">
                <Form />
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer1 />
      <Footer2 />
    </>
  );
}

export default Detail;
