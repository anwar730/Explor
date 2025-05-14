import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
// Note: We're using a placeholder for the image in Tailwind
import image12 from "../images/image12.jpg";
import { Link } from "react-router-dom"; 

function Footer1() {
  return (
    <footer>
      <div className="relative flex flex-col items-center justify-center py-20 px-4 text-center text-white bg-cover bg-center"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${image12})`,
           }}>
        <h4 className="font-bold text-xl md:text-2xl lg:text-3xl mb-6">
          Reach New Horizons: Experience Unparalleled
          <br className="hidden md:block" />
          Adventures On Your Goal Vacations!
        </h4>
        <Link to="/goals" className="px-6 py-3 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors duration-300">
          Save For A Trip
        </Link>
        <p className="mt-6 max-w-md mx-auto text-sm md:text-base">
          Embark on a journey of a lifetime and create cherished memories with
          us.
        </p>
      </div>
    </footer>
  );
}

export default Footer1;