import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white shadow-md py-2"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-xl font-bold text-primary-600">Kannada AI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-neutral-700 hover:text-primary-600 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/generator"
                            className="text-neutral-700 hover:text-primary-600 transition-colors"
                        >
                            Generator
                        </Link>
                        <Link
                            to="#features"
                            className="text-neutral-700 hover:text-primary-600 transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            to="#how-it-works"
                            className="text-neutral-700 hover:text-primary-600 transition-colors"
                        >
                            How It Works
                        </Link>
                        <Link to="/admin">
                            <Button variant="outline" size="sm">
                                Admin
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-neutral-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="4" x2="20" y1="12" y2="12"></line>
                                <line x1="4" x2="20" y1="6" y2="6"></line>
                                <line x1="4" x2="20" y1="18" y2="18"></line>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4">
                        <Link
                            to="/"
                            className="block text-neutral-700 hover:text-primary-600 transition-colors py-2"
                        >
                            Home
                        </Link>
                        <Link
                            to="/generator"
                            className="block text-neutral-700 hover:text-primary-600 transition-colors py-2"
                        >
                            Generator
                        </Link>
                        <Link
                            to="#features"
                            className="block text-neutral-700 hover:text-primary-600 transition-colors py-2"
                        >
                            Features
                        </Link>
                        <Link
                            to="#how-it-works"
                            className="block text-neutral-700 hover:text-primary-600 transition-colors py-2"
                        >
                            How It Works
                        </Link>
                        <Link to="/admin" className="block py-2">
                            <Button variant="outline" size="sm">
                                Admin
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}