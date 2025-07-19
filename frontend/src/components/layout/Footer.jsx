import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center mb-4">
                            <span className="text-xl font-bold text-white">Kannada AI</span>
                        </Link>
                        <p className="text-neutral-400 mb-4 max-w-md">
                            AI-powered Kannada content generation tools for modern newsrooms.
                            Create professional news content quickly and efficiently.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-neutral-400 hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-neutral-400 hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-neutral-400 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/generator"
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    Generator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#features"
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#how-it-works"
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    How It Works
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Generator Tools */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Generator Tools</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/generator?type=top_band"
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    Top Band
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/generator?type=package_writer"
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    Package Writer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/generator?type=speed_50"
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    Speed 50
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin"
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    Admin Panel
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-neutral-400 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} Kannada AI Content Generator. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link
                            to="/privacy"
                            className="text-neutral-400 hover:text-white transition-colors text-sm"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms"
                            className="text-neutral-400 hover:text-white transition-colors text-sm"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}