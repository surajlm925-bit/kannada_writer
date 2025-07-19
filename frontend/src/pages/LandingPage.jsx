import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import FeatureCard from "../components/landing/FeatureCard";
import ScrollAnimation from "../components/landing/ScrollAnimation";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-100 blur-3xl opacity-60"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent-100 blur-3xl opacity-50"></div>
                    </div>

                    {/* Content */}
                    <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 animate-fade-in">
                                Kannada AI Content Generator
                            </h1>
                            <p className="text-xl md:text-2xl text-neutral-700 mb-8 animate-fade-in animation-delay-200">
                                Generate professional Kannada news content with AI-powered tools designed for modern newsrooms
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
                                <Link to="/generator">
                                    <Button size="lg" variant="primary">
                                        Start Creating
                                    </Button>
                                </Link>
                                <Link to="#features">
                                    <Button size="lg" variant="outline">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Visual Element */}
                        <div className="mt-16 max-w-4xl mx-auto relative animate-fade-in animation-delay-600">
                            <div className="bg-white rounded-xl shadow-xl p-6 border border-neutral-200 hover-shadow hover-lift">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="flex-1 text-center text-sm text-neutral-500">Kannada Content Preview</div>
                                </div>
                                <div className="h-64 bg-neutral-50 rounded-md border border-neutral-200 flex items-center justify-center">
                                    <div className="text-center p-6 animate-pulse-slow">
                                        <p className="text-lg font-medium kannada mb-2">ಕನ್ನಡ ಸುದ್ದಿ ವಿಷಯ</p>
                                        <p className="text-neutral-600 kannada">ನಿಮ್ಮ ಸುದ್ದಿ ವಿಷಯವನ್ನು ಸುಲಭವಾಗಿ ರಚಿಸಿ</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-100 rounded-full blur-xl opacity-70 animate-float"></div>
                            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary-100 rounded-full blur-xl opacity-70 animate-float animation-delay-400"></div>
                        </div>
                    </div>
                </section>

                {/* Feature Highlights Section */}
                <section id="features" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Content Generation Tools</h2>
                            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                Our AI-powered tools help you create professional Kannada news content quickly and efficiently
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Top Band Feature */}
                            <FeatureCard
                                title="Top Band"
                                description="Generate 6-line Kannada news headline blocks"
                                content="Create attention-grabbing headline blocks for your news broadcasts with our Top Band generator."
                                iconBgColor="bg-primary-100"
                                iconColor="text-primary-500"
                                exampleText={<>ಮುಖ್ಯ ಸುದ್ದಿ ಶೀರ್ಷಿಕೆ<br />ಉಪ ಶೀರ್ಷಿಕೆ ಮತ್ತು ವಿವರಣೆ</>}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                                        <path d="M18 14h-8"></path>
                                        <path d="M15 18h-5"></path>
                                        <path d="M10 6h8v4h-8V6Z"></path>
                                    </svg>
                                }
                            />

                            {/* Package Writer Feature */}
                            <FeatureCard
                                title="Package Writer"
                                description="Create short Kannada AV packages"
                                content="Generate complete audio-visual packages with structured content for your news segments."
                                iconBgColor="bg-secondary-100"
                                iconColor="text-secondary-500"
                                exampleText={<>ಪ್ಯಾಕೇಜ್ ಶೀರ್ಷಿಕೆ<br />ವಿಷಯ ವಿವರಣೆ ಮತ್ತು ಸಂದರ್ಶನ ಪಾಠ</>}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                                        <path d="M5 3v4"></path>
                                        <path d="M19 17v4"></path>
                                        <path d="M3 5h4"></path>
                                        <path d="M17 19h4"></path>
                                    </svg>
                                }
                            />

                            {/* Speed 50 Feature */}
                            <FeatureCard
                                title="Speed 50"
                                description="Generate up to 50 news lines quickly"
                                content="Rapidly create multiple news lines for bulletins and quick updates with our Speed 50 tool."
                                iconBgColor="bg-accent-100"
                                iconColor="text-accent-500"
                                exampleText={<>ತ್ವರಿತ ಸುದ್ದಿ ಸಾಲು 1<br />ತ್ವರಿತ ಸುದ್ದಿ ಸಾಲು 2</>}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m8 14 6-6"></path>
                                        <path d="M13 8h1v1"></path>
                                        <circle cx="12" cy="12" r="10"></circle>
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 bg-neutral-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                Generate professional Kannada content in just a few simple steps
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            {/* Step 1 */}
                            <ScrollAnimation animation="slide-in-left" className="flex flex-col md:flex-row items-center mb-16">
                                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                                    <div className="relative">
                                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full blur-xl opacity-70"></div>
                                        <div className="bg-white rounded-xl shadow-md p-6 relative hover-lift">
                                            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                                                <span className="text-primary-500 text-xl font-bold">1</span>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">Select Your Generator</h3>
                                            <p className="text-neutral-600">
                                                Choose from Top Band, Package Writer, or Speed 50 based on your content needs.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 md:pl-8">
                                    <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 mb-4">
                                            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-md font-medium">Top Band</div>
                                            <div className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded-md">Package Writer</div>
                                            <div className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded-md">Speed 50</div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            {/* Step 2 */}
                            <ScrollAnimation animation="slide-in-right" delay={200} className="flex flex-col md:flex-row-reverse items-center mb-16">
                                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
                                    <div className="relative">
                                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-100 rounded-full blur-xl opacity-70"></div>
                                        <div className="bg-white rounded-xl shadow-md p-6 relative hover-lift">
                                            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                                                <span className="text-secondary-500 text-xl font-bold">2</span>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">Enter Your Input</h3>
                                            <p className="text-neutral-600">
                                                Provide the necessary information in Kannada or English for content generation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 md:pr-8">
                                    <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="border border-neutral-200 rounded-md p-3 mb-4">
                                            <p className="text-sm text-neutral-500 mb-2">Enter your content:</p>
                                            <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200 kannada">
                                                ಇಲ್ಲಿ ನಿಮ್ಮ ವಿಷಯವನ್ನು ನಮೂದಿಸಿ...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            {/* Step 3 */}
                            <ScrollAnimation animation="slide-in-left" delay={400} className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                                    <div className="relative">
                                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-100 rounded-full blur-xl opacity-70"></div>
                                        <div className="bg-white rounded-xl shadow-md p-6 relative hover-lift">
                                            <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                                                <span className="text-accent-500 text-xl font-bold">3</span>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">Get Your Content</h3>
                                            <p className="text-neutral-600">
                                                Receive professionally generated Kannada content ready for use in your news broadcasts.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 md:pl-8">
                                    <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="border border-neutral-200 rounded-md p-3">
                                            <p className="text-sm text-neutral-500 mb-2">Generated content:</p>
                                            <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200 kannada">
                                                <p className="mb-1">ಮುಖ್ಯ ಸುದ್ದಿ ಶೀರ್ಷಿಕೆ</p>
                                                <p className="mb-1">ಉಪ ಶೀರ್ಷಿಕೆ ಮತ್ತು ವಿವರಣೆ</p>
                                                <p>ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಮತ್ತು ವಿವರಗಳು</p>
                                            </div>
                                            <div className="flex justify-end mt-3">
                                                <button className="bg-primary-100 text-primary-700 px-3 py-1 rounded text-sm hover:bg-primary-200 transition-colors">Copy</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}