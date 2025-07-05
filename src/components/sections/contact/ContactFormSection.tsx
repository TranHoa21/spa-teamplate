'use client';
import React from 'react';

const ContactFormSection = () => {
    return (
        <section className="w-full min-h-screen bg-gray-100 grid grid-cols-1 md:grid-cols-2">
            {/* Map */}
            <div className="w-full h-[400px] md:h-auto">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.3085537841166!2d-105.68550092398928!3d40.342793471453926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87695737a5c60b3f%3A0x407d3547a8de0487!2sRocky%20Mountain%20National%20Park!5e0!3m2!1svi!2s!4v1715063827234!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-lg">
                    <p className="text-sm uppercase text-green-700 font-semibold">Got a question?</p>
                    <h2 className="text-3xl font-bold mt-2 mb-4">Please complete the form below.</h2>
                    <p className="text-gray-600 mb-8">
                        We’ll follow up with you in 1–2 business days.
                    </p>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your name</label>
                            <input
                                type="text"
                                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your email</label>
                            <input
                                type="email"
                                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your message (optional)</label>
                            <textarea
                                rows={4}
                                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactFormSection;
