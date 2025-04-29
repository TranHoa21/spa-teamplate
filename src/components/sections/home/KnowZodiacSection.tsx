"use client";

import React from "react";
import { FaRegCalendarAlt, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";

const KnowZodiacSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#031d2e]">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Know Your Zodiac Sign</h1>
          <p className="text-base text-white mb-16 leading-relaxed">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br />
            et dolore magna aliqua. Suspendisse gravida.
          </p>

          <div className="bg-[#07273c] p-10 rounded-2xl text-white shadow-lg">
            <ul className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Date of Birth */}
              <li className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-white">Date Of Birth</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full border border-gray-600 rounded-xl py-4 pl-14 pr-4 text-base bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="absolute top-1/2 left-5 transform -translate-y-1/2 text-gray-400">
                    <FaRegCalendarAlt className="w-6 h-6" />
                  </span>
                </div>
              </li>

              {/* Time of Birth */}
              <li className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-white">Time Of Birth</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="08:00"
                    className="w-full border border-gray-600 rounded-xl py-4 pl-14 pr-4 text-base bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="absolute top-1/2 left-5 transform -translate-y-1/2 text-gray-400">
                    <FaRegClock className="w-6 h-6" />
                  </span>
                </div>
              </li>

              {/* Place of Birth */}
              <li className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-white">Place Of Birth</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter City Name..."
                    className="w-full border border-gray-600 rounded-xl py-4 pl-14 pr-4 text-base bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="absolute top-1/2 left-5 transform -translate-y-1/2 text-gray-400">
                    <FaMapMarkerAlt className="w-6 h-6" />
                  </span>
                </div>
              </li>

              {/* Button */}
              <li className="flex items-end">
                <button
                  type="button"
                  className="w-full bg-orange-500 hover:bg-blue-700 text-white py-4 rounded-xl text-base font-semibold transition"
                >
                  Find Zodiac
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowZodiacSection;
