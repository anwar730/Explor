import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Form from "./Form";
import { useLoading } from "../components/LoadingContext";

function Detail({ currentUser }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState({});
  const [showGoalBox, setShowGoalBox] = useState(false);
  const { setLoading } = useLoading();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [similarItems, setSimilarItems] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  const resourceType = location.pathname.split("/")[2]; // e.g. 'beaches'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://explorr.onrender.com/${resourceType}/${id}`);
        const data = await res.json();
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, resourceType, setLoading]);

  useEffect(() => {
    // Only fetch similar items after we have the main item
    if (filtered.id) {
      const fetchSimilarItems = async () => {
        try {
          setLoadingSimilar(true);
          const res = await fetch(`https://explorr.onrender.com/${resourceType}`);
          const data = await res.json();
          
          // Filter out the current item and get 3 random items
          const filteredItems = data
            .filter(item => item.id !== filtered.id)
            .sort(() => 0.5 - Math.random()) // Simple way to randomize
            .slice(0, 3);
          
          setSimilarItems(filteredItems);
        } catch (error) {
          console.error("Error fetching similar items:", error);
        } finally {
          setLoadingSimilar(false);
        }
      };

      fetchSimilarItems();
    }
  }, [filtered.id, resourceType]);

  const handleShowGoalBox = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setShowGoalBox((prev) => !prev);
    }
  };

  if (!filtered.name) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="text-center">
          <svg
            className="animate-spin h-16 w-16 text-orange-500 mx-auto mb-4"
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
          <p className="text-gray-600 font-medium">Loading amazing destination...</p>
        </div>
      </div>
    );
  }

  const formattedType = resourceType.charAt(0).toUpperCase() + resourceType.slice(1);
  const formattedTypeSingular = formattedType.endsWith('s') ? formattedType.slice(0, -1) : formattedType;

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <span className="hover:text-orange-500 cursor-pointer" onClick={() => navigate("/")}>Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-orange-500 cursor-pointer" onClick={() => navigate(`/explore/${resourceType}`)}>
            {formattedType}
          </span>
          <span className="mx-2">/</span>
          <span className="text-orange-500">{filtered.name}</span>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image section - with fixed height */}
            <div className="w-full md:w-1/2 relative h-80 md:h-96 max-h-[500px]">
              <div className="relative h-full overflow-hidden bg-gray-200">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-12 w-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  </div>
                )}
                <img
                  src={filtered.image}
                  alt={filtered.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                  {filtered.name}
                </h1>
              </div>
            </div>

            {/* Details section */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-full bg-orange-100 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 font-medium">LOCATION</h4>
                  <p className="text-lg font-medium">{filtered.location}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Detail</h4>
                <p className="text-gray-600 leading-relaxed">
                  {filtered.details}
                </p>
              </div>

              {filtered.amenities && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {filtered.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleShowGoalBox}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                
                {showGoalBox ? null : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>}
                {showGoalBox ? "Cancel" : "Save for a Trip"}
              </button>
            </div>
          </div>
          
          {/* Trip Form - Now beneath both image and description */}
          {showGoalBox && (
            <div className="p-6 md:p-8 border-t border-gray-200 bg-orange-50">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Plan Your Trip to {filtered.name}</h4>
              <Form currentUser={currentUser} />
            </div>
          )}
        </div>

        {/* Similar destinations section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingSimilar ? (
              // Loading placeholders
              [1, 2, 3].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : similarItems.length > 0 ? (
              // Real items
              similarItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    navigate(`/explore/${resourceType}/${item.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{item.location}</p>
                    <p className="text-gray-600 line-clamp-3">
                      {item.details?.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // No similar items found
              <div className="col-span-3 text-center p-8 bg-orange-50 rounded-lg">
                <p className="text-gray-600">No similar {resourceType} available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer1 />
      <Footer2 />
    </div>
  );
}

export default Detail;