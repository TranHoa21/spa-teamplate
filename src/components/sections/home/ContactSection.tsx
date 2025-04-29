'use client';

import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ContactSection: React.FC = () => {
    return (
        <section className="py-20 bg-[#031d2e] text-white">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-4">Contact Information</h1>
                            <p className="text-gray-300">
                                Consectetur adipiscing elit sed do eiusmod incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Call Us */}
                            <div className="flex gap-4 items-start">
                                <div className=" text-3xl">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h5 className="text-lg font-semibold mb-1">Call Us</h5>
                                    <p className="text-gray-300 text-sm">+ (91) 1800-124-105</p>
                                    <p className="text-gray-300 text-sm">+ (91) 1800-326-324</p>
                                </div>
                            </div>

                            {/* Mail Us */}
                            <div className="flex gap-4 items-start">
                                <div className=" text-3xl">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h5 className="text-lg font-semibold mb-1">Mail Us</h5>
                                    <p className="text-gray-300 text-sm">astrology@example.com</p>
                                    <p className="text-gray-300 text-sm">astro@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#07273c] p-8 rounded-xl shadow-lg">
                        <h4 className="text-2xl font-bold mb-6 text-center">Have A Question?</h4>
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Full Name</label>
                                <Input type="text" placeholder="Enter your full name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Email Address</label>
                                <Input type="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Message</label>
                                <Textarea placeholder="Write your message..." className="h-32" />
                            </div>
                            <div className="text-center pt-4">
                                <Button type="submit" className="px-10 py-3 bg-orange-500 hover:bg-blue-700 transition">
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
