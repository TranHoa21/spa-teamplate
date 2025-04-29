"use client";

import React from "react";

const AppointmentSection: React.FC = () => {
    return (
        <section className="py-20 bg-[#07273c] text-white">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Make Your Appointment To Discuss Any Problem.</h2>
                    <p className="text-gray-300 mb-4">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                        in some form, by injected humour, or randomised words which do not look even slightly believable.
                    </p>
                    <p className="text-gray-300">
                        It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to
                        generate Lorem Ipsum which looks reasonable.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-[#17384e] p-8 rounded-xl shadow-lg">
                    <form className="space-y-8">
                        <h3 className="text-2xl font-bold text-center mb-8">Appointment Form</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Mobile Number</label>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Gender</label>
                                <select
                                    className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:border-blue-400"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            {/* Time of Day */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Time of Day</label>
                                <select
                                    className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:border-blue-400"
                                >
                                    <option value="">Select Time</option>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="evening">Evening</option>
                                </select>
                            </div>

                            {/* Way to Reach */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Way to Reach</label>
                                <select
                                    className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white focus:outline-none focus:border-blue-400"
                                >
                                    <option value="">Select Way</option>
                                    <option value="phone">Phone</option>
                                    <option value="email">Email</option>
                                </select>
                            </div>

                            {/* Preferred Date */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-semibold">Preferred Date</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Date"
                                        className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Month"
                                        className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Year"
                                        className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                    />
                                </div>
                            </div>

                            {/* Preferred Time */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-semibold">Preferred Time</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Hrs"
                                        className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Mins"
                                        className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Sec"
                                        className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Address</label>
                                <textarea
                                    placeholder="Address"
                                    className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 h-28 resize-none focus:outline-none focus:border-blue-400"
                                ></textarea>
                            </div>

                            {/* Reason for Appointment */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold">Reason for Appointment</label>
                                <textarea
                                    placeholder="Message"
                                    className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 h-28 resize-none focus:outline-none focus:border-blue-400"
                                ></textarea>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-blue-700 transition px-10 py-4 rounded-lg font-semibold text-white text-lg"
                            >
                                Make an Appointment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AppointmentSection;
