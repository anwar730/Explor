import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-[#023047] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* CTA */}
          <div className="lg:col-span-1 flex flex-col items-center md:items-start">
            <p className="text-lg font-semibold mb-4 text-center md:text-left">
              Ready To Get Started?
            </p>
            <Link
              to="/"
              className="px-5 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li className="hover:text-orange-300 cursor-pointer">
              <NavLink
                to="/explore/cities"
              
              >
                Cities
              </NavLink>
              </li>
              <li className="hover:text-orange-300 cursor-pointer">
              <NavLink
                to="/explore/beaches"
                
              >
                Beaches
              </NavLink>
              </li>
              <li className="hover:text-orange-300 cursor-pointer"><NavLink
                to="/explore/snowmountains"
                className=""
              >
                Snow Mountains
              </NavLink></li>
              <li className="hover:text-orange-300 cursor-pointer"><NavLink
                to="/explore/forests"
                
              >
                Forests
              </NavLink></li>
              
              
              
              
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li className="hover:text-orange-300 cursor-pointer">
                Our Story
              </li>
              <li className="hover:text-orange-300 cursor-pointer">Benefits</li>
              <li className="hover:text-orange-300 cursor-pointer">Team</li>
              <li className="hover:text-orange-300 cursor-pointer">Careers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              <li className="hover:text-orange-300 cursor-pointer">FAQs</li>
              <li className="hover:text-orange-300 cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <FaFacebookF className="text-xl hover:text-orange-300 cursor-pointer" />
              <FaTwitter className="text-xl hover:text-orange-300 cursor-pointer" />
              <FaInstagram className="text-xl hover:text-orange-300 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0 space-x-6">
            <span className="hover:text-orange-300 cursor-pointer">
              Terms & Conditions
            </span>
            <span className="hover:text-orange-300 cursor-pointer">
              Privacy Policy
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-2 md:mt-0">
            © {new Date().getFullYear()} Explorr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
