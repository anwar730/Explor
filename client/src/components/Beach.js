import React, { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useLoading } from "../components/LoadingContext";

function Beach() {
  const [beachesArray, setBeachesArray] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://explorr.onrender.com/beaches");
        const data = await res.json();
        setBeachesArray(data);
      } catch (error) {
        console.error("Error fetching beaches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeaches();
  }, [setLoading]);

  return (
    <section className="px-4 md:px-8 lg:px-16 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Beaches</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {beachesArray.map((beach) => (
          <div
            key={beach.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] flex flex-col"
          >
            <img
              src={beach.image}
              alt={`${beach.name} Beach`}
              className="w-full h-56 object-cover"
            />
            <div className="flex flex-col items-center justify-center text-center px-4 py-6 flex-1">
              <h2 className="text-xl font-semibold mb-2">{beach.name}</h2>
              <h3 className="text-gray-600 flex items-center justify-center gap-1 mb-4">
                <MdLocationPin className="text-orange-500 text-xl" />
                {beach.location}
              </h3>
              <NavLink
                to={`/explore/beaches/${beach.id}`}
                className="bg-[#FB8500] text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                See Detail
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Beach;
