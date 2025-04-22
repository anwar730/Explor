import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { MdLocationPin } from "react-icons/md";
import { useLoading } from "../components/LoadingContext"; // Import the hook

function Cities() {
    const [citiesArray, setCitiesArray] = useState([]);
    const { setLoading } = useLoading(); // Access the setLoading function

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setLoading(true); // Set loading to true when the fetch starts
                const res = await fetch("https://explorr.onrender.com/cities");
                const data = await res.json();
                setCitiesArray(data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            } finally {
                setLoading(false); // Set loading to false when the fetch completes
            }
        };

        fetchCities();
    }, [setLoading]);

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-semibold mb-8 text-center">Cities</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {citiesArray.map((city) => (
                    <div key={city.id} className="city-card rounded-lg shadow-lg overflow-hidden">
                        <img 
                            src={city.image} 
                            alt={city.name} 
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold text-center mb-2">{city.name}</h2>
                            <h3 className="text-lg text-center text-gray-500 flex items-center justify-center">
                                <MdLocationPin className="mr-2" /> {city.location}
                            </h3>
                            <div className="text-center mt-4">
                                <NavLink to={`/explore/cities/${city.id}`}>
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

export default Cities;
