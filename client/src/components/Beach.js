// import React, { useEffect, useState } from "react";
// import { MdLocationPin } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useLoading } from "../components/LoadingContext";

// function Beach({ currentUser }) {
//   const [beachesArray, setBeachesArray] = useState([]);
//   const { setLoading } = useLoading();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBeaches = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("https://explorr.onrender.com/beaches");
//         const data = await res.json();
//         setBeachesArray(data);
//       } catch (error) {
//         console.error("Error fetching beaches:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBeaches();
//   }, [setLoading]);

//   function handleSeeDetail(beachId) {
//     if (!currentUser) {
//       navigate("/login");
//     } else {
//       navigate(`/explore/beaches/${beachId}`);
//     }
//   }

//   return (
//     <section className="px-4 md:px-8 lg:px-16 py-10">
//       <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Beaches</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {beachesArray.map((beach) => (
//           <div
//             key={beach.id}
//             className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] flex flex-col"
//           >
//             <img
//               src={beach.image}
//               alt={`${beach.name} Beach`}
//               className="w-full h-56 object-cover"
//             />
//             <div className="flex flex-col items-center justify-center text-center px-4 py-6 flex-1">
//               <h2 className="text-xl font-semibold mb-2">{beach.name}</h2>
//               <h3 className="text-gray-600 flex items-center justify-center gap-1 mb-4">
//                 <MdLocationPin className="text-orange-500 text-xl" />
//                 {beach.location}
//               </h3>
//               <button
//                 onClick={() => handleSeeDetail(beach.id)}
//                 className="bg-[#FB8500] text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
//               >
//                 See Detail
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Beach;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Beach({ currentUser }) {
//   const [beachesArray, setBeachesArray] = useState([]);
//   const [hoveredBeach, setHoveredBeach] = useState(null);
//   const [loading, setLoading] = useState(false);
//  const navigate = useNavigate();

//     useEffect(() => {
//     const fetchBeaches = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("https://explorr.onrender.com/beaches");
//         const data = await res.json();
//         setBeachesArray(data);
//       } catch (error) {
//         console.error("Error fetching beaches:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBeaches();
//   }, [setLoading]);

//     function handleSeeDetail(beachId) {
//     if (!currentUser) {
//       navigate("/login");
//     } else {
//       navigate(`/explore/beaches/${beachId}`);
//     }
//   }

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen pb-16">
//       {/* Hero Section */}
//       <div className="relative bg-blue-500 h-64 md:h-80 mb-8">
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="absolute inset-0 flex items-center justify-center flex-col text-white px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-wide text-center">Discover Paradise</h1>
//           <p className="text-lg md:text-xl max-w-2xl text-center">Explore the world's most beautiful beaches with Explorr</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
//           <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Popular Beaches</h2>
//           <div className="bg-white px-3 py-1 rounded-full shadow-sm text-sm text-gray-600">
//             {beachesArray.length} destinations
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="flex flex-col items-center">
//               <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//               <p className="text-gray-500">Loading beaches...</p>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {beachesArray.map((beach) => (
//               <div
//                 key={beach.id}
//                 className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
//                 onMouseEnter={() => setHoveredBeach(beach.id)}
//                 onMouseLeave={() => setHoveredBeach(null)}
//               >
//                 <div className="relative h-56 md:h-64 overflow-hidden">
//                   <img
//                     src={beach.image}
//                     alt={`${beach.name} Beach`}
//                     className={`w-full h-full object-cover transition-transform duration-700 ${hoveredBeach === beach.id ? 'scale-110' : 'scale-100'}`}
//                   />
//                   <div className="absolute top-0 left-0 m-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow">
//                     {beach.location}
//                   </div>
//                 </div>

//                 <div className="p-5">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">{beach.name}</h3>
//                   <div className="flex items-center mb-4">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <svg
//                           key={star}
//                           className={`w-5 h-5 ${star <= Math.floor(beach.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2 text-gray-600">{beach.rating}</span>
//                     <span className="mx-2 text-gray-300">•</span>
//                     <span className="text-gray-600 text-sm">Perfect for {Math.floor(Math.random() * 3) + 1}-day trips</span>
//                   </div>

//                   <button
//                     onClick={() => handleSeeDetail(beach.id)}
//                     className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center group"
//                   >
//                     <span>Explore Details</span>
//                     <svg
//                       className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                     </svg>
//                   </button>

//                   {!currentUser && (
//                     <p className="text-xs text-gray-500 mt-2 text-center">
//                       Login required to view details
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Call to Action */}
//         <div className="mt-16 bg-orange-500 rounded-xl p-6 md:p-8 text-white shadow-lg">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="mb-6 md:mb-0">
//               <h3 className="text-2xl font-bold mb-2">Can't find your perfect beach?</h3>
//               <p className="text-white text-opacity-90">Join our community and discover hidden gems around the world.</p>
//             </div>
//             <button
//               onClick={() => !currentUser && alert("Please login to explore more")}
//               className="bg-white text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
//             >
//               {currentUser ? "Explore More" : "Sign In to Explore"}
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Beach;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../components/LoadingContext";

const randomRating = Math.floor(Math.random() * 3) + 3; // 3 to 5 stars
function Beach({ currentUser }) {
  const [beachesArray, setBeachesArray] = useState([]);
  const [hoveredBeach, setHoveredBeach] = useState(null);
  const { setLoading } = useLoading();

  const navigate = useNavigate();

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

  function handleSeeDetail(beachId) {
    if (!currentUser) {
      navigate("/login");
    } else {
      navigate(`/explore/beaches/${beachId}`);
    }
  }

  return (
    <div className="bg-gradient-to-b from-orange-50 to-orange-100 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 mb-8">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center flex-col text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-wide text-center">
            Discover Paradise
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-center">
            Explore the world's most beautiful beaches with Explorr
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Popular Beaches
          </h2>
          <div className="bg-white px-3 py-1 rounded-full shadow-sm text-sm text-gray-600">
            {beachesArray.length} destinations
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {beachesArray.map((beach) => (
            <div
              key={beach.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredBeach(beach.id)}
              onMouseLeave={() => setHoveredBeach(null)}
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={beach.image}
                  alt={`${beach.name} Beach`}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredBeach === beach.id ? "scale-110" : "scale-100"
                  }`}
                />
               
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {beach.name}
                </h3>
                <div className="text-l font-bold text-gray-800 mb-2 flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>{beach.location}
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
                  onClick={() => handleSeeDetail(beach.id)}
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
                Can't find your perfect beach?
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

export default Beach;
