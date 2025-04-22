import React from "react";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";
import image6 from "../images/image6.jpg";
import image7 from "../images/image7.jpg";
import image8 from "../images/image8.jpg";
import image9 from "../images/image9.jpg";
import image10 from "../images/image10.jpg";
import image11 from "../images/image11.jpg";
import image12 from "../images/image12.jpg";
import image13 from "../images/image13.jpg";
import { PiTargetBold } from "react-icons/pi";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react'; 
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="mx-4 md:mx-12 lg:mx-16 my-8 md:my-12">
  <div className="flex flex-col lg:flex-row gap-24">

    {/* Left side - 1/2 screen */}
    <div className="relative w-full lg:w-1/2 flex flex-col lg:flex-row">
      {/* Column with top and bottom images and headline in between for small screens */}
      <div className="flex flex-col gap-6 w-full lg:w-1/2">
        <img
          src={image2}
          alt="Top Beach"
          className="rounded-lg w-full h-72 object-cover"
        />

        {/* h1 visible only on small/medium screens */}
        <h1 className="block lg:hidden text-3xl md:text-4xl font-montserrat leading-tight tracking-wide text-center">
          Transform Your Dream <span className="text-[#FB8500]">Goals</span><br />
          Into Unforgettable Vacations!
        </h1>

        <img
          src={image3}
          alt="Bottom Beach"
          className="rounded-lg w-full h-72 object-cover"
        />
      </div>

      {/* Centered image (only on large screens) */}
      <img
        src={image1}
        alt="Middle Beach"
        className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-6 w-1/2 h-3/4 rounded-lg shadow-lg object-cover"
      />
    </div>

    {/* Right side - 1/2 screen */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center mt-10 lg:mt-0">
      {/* h1 visible only on large screens */}
      <h1 className="hidden lg:block text-5xl font-montserrat leading-tight tracking-wide text-left">
        Transform Your Dream <span className="text-[#FB8500]">Goals</span><br />
        Into Unforgettable Vacations!
      </h1>

      <div className="md:mt-10">
        <h2 className="text-xl md:text-2xl mb-4">
          Welcome to <span className="text-[#FB8500]">Explorr</span> - Where Adventures Await!
        </h2>
        <p className="text-base leading-relaxed text-gray-700">
          From scaling majestic mountains to diving into the depths of the ocean,
          from trekking through lush rainforests to embarking on cultural escapades,
          our curated selection of expeditions will ignite the adventurer in you.
          Whether you're a seasoned explorer or just getting started,<br />
          <span className="text-[#FB8500] font-semibold">Explorr</span> has something extraordinary to offer everyone.
        </p>
      </div>
    </div>
  </div>
</section>







<section className="my-16 md:my-24 lg:my-28 mx-4 md:mx-12 lg:mx-16">
  <h1 className="text-2xl md:text-3xl font-bold mb-10 text-center">Things To Do</h1>
  <div className="flex flex-wrap justify-center md:justify-around gap-8 md:gap-10">
    {/* Beach */}
    <div className="flex flex-col items-center">
      <img
        src={image4}
        alt="Beach"
        className="w-full h-96 object-contain rounded-lg" // Ensure the entire image fits within the height
      />
      <h1 className="text-xl md:text-2xl font-bold mt-4">Beaches</h1>
      <Link
        to="/explore/beaches"
        className="inline-flex items-center text-lg font-medium text-[#FB8500] hover:text-[#d97706] hover:underline mt-2 transition-colors"
      >
        View More <ChevronRight className="ml-2" />
      </Link>
    </div>

    {/* Forest */}
    <div className="flex flex-col items-center">
      <img
        src={image6}
        alt="Forest"
        className="w-full h-96 object-contain rounded-lg" // Ensure the entire image fits within the height
      />
      <h1 className="text-xl md:text-2xl font-bold mt-4">Forests</h1>
      <Link
        to="/explore/forests"
        className="inline-flex items-center text-lg font-medium text-[#FB8500] hover:text-[#d97706] hover:underline mt-2 transition-colors"
      >
        View More <ChevronRight className="ml-2" />
      </Link>
    </div>

    {/* Snow Mountains */}
    <div className="flex flex-col items-center">
      <img
        src={image7}
        alt="Snow Mountain"
        className="w-full h-96 object-contain rounded-lg" // Ensure the entire image fits within the height
      />
      <h1 className="text-xl md:text-2xl font-bold mt-4">Snow Mountains</h1>
      <Link
        to="/explore/snowmountains"
        className="inline-flex items-center text-lg font-medium text-[#FB8500] hover:text-[#d97706] hover:underline mt-2 transition-colors"
      >
        View More <ChevronRight className="ml-2" />
      </Link>
    </div>

    {/* City */}
    <div className="flex flex-col items-center">
      <img
        src={image8}
        alt="City"
        className="w-full h-96 object-contain rounded-lg" // Ensure the entire image fits within the height
      />
      <h1 className="text-xl md:text-2xl font-bold mt-4">Cities</h1>
      <Link
        to="/explore/cities"
        className="inline-flex items-center text-lg font-medium text-[#FB8500] hover:text-[#d97706] hover:underline mt-2 transition-colors"
      >
        View More <ChevronRight className="ml-2" />
      </Link>
    </div>
  </div>
</section>



      <section className="my-16 md:my-24 lg:my-28 mx-4 md:mx-12 lg:mx-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-10 text-center">Popular Destinations</h1>
        <div className="flex flex-wrap justify-center md:justify-around gap-8 md:gap-6">
          <div className="flex flex-col items-center">
            <img src={image9} alt="Temple Of China" className="h-64 md:h-80 lg:h-96 w-64 md:w-72 lg:w-80 object-cover rounded-lg" />
            <h2 className="mt-4 text-lg md:text-xl font-medium">Temple Of China</h2>
          </div>
          
          <div className="flex flex-col items-center">
            <img src={image10} alt="Canals Of Venice" className="h-64 md:h-80 lg:h-96 w-64 md:w-72 lg:w-80 object-cover rounded-lg" />
            <h2 className="mt-4 text-lg md:text-xl font-medium">Canals Of Venice</h2>
          </div>
          
          <div className="flex flex-col items-center">
            <img src={image11} alt="Swiss Town" className="h-64 md:h-80 lg:h-96 w-64 md:w-72 lg:w-80 object-cover rounded-lg" />
            <h2 className="mt-4 text-lg md:text-xl font-medium">Swiss Town</h2>
          </div>
          
          <div className="flex flex-col items-center">
            <img src={image13} alt="Tsavo Park" className="h-64 md:h-80 lg:h-96 w-64 md:w-72 lg:w-80 object-cover rounded-lg" />
            <h2 className="mt-4 text-lg md:text-xl font-medium">Tsavo Park</h2>
          </div>
        </div>
      </section>

      <section className="my-16 md:my-24 lg:my-28 mx-4 md:mx-12 lg:mx-16">
  <h1 className="text-2xl md:text-3xl font-bold mb-10 text-center">
    From Dreaming To Doing Saving <br className="hidden md:block" />
    Strategies For The Vacation Of A Lifetime
  </h1>

  <div className="relative mt-16 md:mt-24 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start">
    {/* Main image on the left */}
    <div className="w-full lg:w-1/2 flex justify-center">
      <img
        src={image12}
        alt="Vacation"
        className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
      />
    </div>

    {/* Cards on the right */}
    <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:gap-16 items-center lg:items-start mt-8 lg:mt-0 lg:ml-8">
      {/* First row with Card 1 and Card 2 */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center lg:items-start gap-4 w-full">
          <div className="flex items-center gap-4">
            <PiTargetBold className="text-[#FB8500] text-2xl md:text-3xl" />
            <p className="font-medium">Set a goal</p>
          </div>
          <p className="text-sm md:text-base">
            Embrace your ambitions and set a clear, inspiring goal that fuels your passion and ignites your drive to succeed.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center lg:items-start gap-4 w-full">
          <div className="flex items-center gap-4">
            <LiaPiggyBankSolid className="text-[#FB8500] text-2xl md:text-3xl" />
            <p className="font-medium">Save for that goal</p>
          </div>
          <p className="text-sm md:text-base">
            Take charge of your financial future and start saving diligently, ensuring each penny brings you closer to your dream goal.
          </p>
        </div>
      </div>

      {/* Second row with Card 1 and Card 3 */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Card 1 (same as the first one) */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center lg:items-start gap-4 w-full">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-[#FB8500] text-2xl md:text-3xl" />
            <p className="font-medium">Plan Your Trip</p>
          </div>
          <p className="text-sm md:text-base">
            Research destinations, plan your itinerary, and ensure that every aspect of your trip is prepared to create lasting memories.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center lg:items-start gap-4 w-full">
          <div className="flex items-center gap-4">
            <GiCommercialAirplane className="text-[#FB8500] text-2xl md:text-3xl" />
            <p className="font-medium">Travel</p>
          </div>
          <p className="text-sm md:text-base">
            In just 10 days, let the world be your playground as you discover hidden gems, forge unforgettable memories, and broaden your perspectives.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      
      <Footer1 />
      <Footer2 />
    </>
  );
}

export default Home;