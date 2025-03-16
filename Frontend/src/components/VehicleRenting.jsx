import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from './Header';

import johnDeereTractor from "../assets/images/vehicles/John Deere 5E Series Tractor.avif";
import newHollandHarvester from "../assets/images/vehicles/New Holland TC5.30 Harvester.webp";
import mahindraTractor from "../assets/images/vehicles/mahindra-265-di-tractor.png";
import claasHarvester from "../assets/images/vehicles/CLAAS CROP TIGER 30 TERRA TRAC.jpg";
import sonalikaTractor from "../assets/images/vehicles/sonalika-rx-750-iii.webp";
import kubotaReaper from "../assets/images/vehicles/kubota-dc68g-hk-combine-harvester.jpg";

function VehicleRenting() {
  const [filters, setFilters] = useState({
    vehicleType: "all",
    location: "all",
    rentalPeriod: "all",
    priceRange: "all",
  });
  
  // New state for rental modal
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    endDate: "",
    mobileNumber: "",
    otp: "",
    paymentMethod: "upi",
  });
  const [formStep, setFormStep] = useState(1); // 1: dates, 2: contact, 3: payment
  const [otpSent, setOtpSent] = useState(false);

  // Sample vehicle data
  const vehicles = [
    {
      id: 1,
      name: "John Deere 5E Series Tractor",
      type: "tractor",
      image: johnDeereTractor,
      location: "Punjab",
      price: 1200,
      unit: "day",
      power: "75 HP",
      features: ["4WD", "Power steering", "Adjustable seat"],
      availability: "Available",
      description:
        "Versatile utility tractor perfect for medium to large farms. Fuel efficient and powerful.",
    },
    {
      id: 2,
      name: "New Holland TC5.30 Harvester",
      type: "harvester",
      image: newHollandHarvester,
      location: "Haryana",
      price: 2500,
      unit: "day",
      power: "175 HP",
      features: ["GPS Navigation", "Climate controlled cabin", "High capacity"],
      availability: "Available from next week",
      description:
        "Modern combine harvester with advanced grain management system. Ideal for wheat, rice, and other grains.",
    },
    {
      id: 3,
      name: "Mahindra 265 DI Tractor",
      type: "tractor",
      image: mahindraTractor,
      location: "Gujarat",
      price: 800,
      unit: "day",
      power: "42 HP",
      features: ["Economical", "Low maintenance", "Reliable performance"],
      availability: "Available",
      description:
        "Compact and powerful tractor suitable for small to medium farms. Excellent fuel efficiency.",
    },
    {
      id: 4,
      name: "CLAAS CROP TIGER 30 TERRA TRAC",
      type: "harvester",
      image: claasHarvester,
      location: "Maharashtra",
      price: 3000,
      unit: "day",
      power: "200 HP",
      features: ["Track system", "Advanced controls", "Large grain tank"],
      availability: "Limited availability",
      description:
        "Premium harvester with cutting-edge technology for maximum efficiency and minimal grain loss.",
    },
    {
      id: 5,
      name: "Sonalika DI 750 III Tractor",
      type: "tractor",
      image: sonalikaTractor,
      location: "Uttar Pradesh",
      price: 900,
      unit: "day",
      power: "50 HP",
      features: ["Multi-speed PTO", "Heavy duty hydraulics", "Strong chassis"],
      availability: "Available",
      description:
        "Reliable and powerful tractor suitable for various farming operations and heavy implements.",
    },
    {
      id: 6,
      name: "Kubota DC-70G Paddy Reaper",
      type: "reaper",
      image: kubotaReaper,
      location: "Tamil Nadu",
      price: 1200,
      unit: "day",
      power: "8 HP",
      features: ["Compact size", "Easy to operate", "Precise cutting"],
      availability: "Available",
      description:
        "Specialized equipment for paddy harvesting with minimal crop damage and high efficiency.",
    },
  ];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filter vehicles based on selected filters
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filters.vehicleType !== "all" && vehicle.type !== filters.vehicleType)
      return false;
    if (filters.location !== "all" && vehicle.location !== filters.location)
      return false;
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (vehicle.price < min || (max && vehicle.price > max)) return false;
    }
    return true;
  });
  
  // Function to handle opening the rental modal
  const handleRentNow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowRentalModal(true);
    setFormStep(1);
    setOtpSent(false);
    
    // Set default dates (today and tomorrow)
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    setBookingDetails({
      startDate: today.toISOString().split('T')[0],
      endDate: tomorrow.toISOString().split('T')[0],
      mobileNumber: "",
      otp: "",
      paymentMethod: "upi"
    });
  };

  // Function to calculate total price based on selected dates
  const calculateTotalPrice = () => {
    if (!selectedVehicle || !bookingDetails.startDate || !bookingDetails.endDate) return 0;
    
    const start = new Date(bookingDetails.startDate);
    const end = new Date(bookingDetails.endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    
    return selectedVehicle.price * days;
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  // Function to proceed to next step
  const handleNextStep = () => {
    setFormStep(formStep + 1);
  };

  // Function to send OTP (mock function for frontend)
  const sendOTP = () => {
    // In a real app, this would call an API to send OTP
    setOtpSent(true);
    alert("OTP sent to your mobile number!");
  };

  // Function to verify OTP (mock function for frontend)
  const verifyOTP = () => {
    // In a real app, this would verify the OTP with backend
    if (bookingDetails.otp.length === 6) {
      handleNextStep();
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  // Function to complete booking
  const completeBooking = () => {
    // In a real app, this would process payment and complete booking
    alert("Booking confirmed successfully!");
    setShowRentalModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar - Reuse from HomePage */}
      <Header/>

      {/* Main Navigation - Reuse from HomePage */}
      <nav className="bg-green-600 py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white text-3xl font-bold">
              AgriStore
            </Link>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-1/3 my-2 md:my-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for vehicles..."
                className="w-full py-2 px-4 rounded-full text-gray-700 bg-white focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full bg-yellow-500 text-white px-4 rounded-r-full">
                Search
              </button>
            </div>
          </div>

          {/* Navigation Links - Simplified */}
          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <Link
              to="/"
              className="text-white hover:text-green-200 flex flex-col items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </Link>
            <a
              href="#"
              className="text-white hover:text-green-200 flex flex-col items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Cart</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Farm Vehicle Rental
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Rent high-quality agricultural machinery at affordable rates. Our
            vehicles are well-maintained and ready to help you maximize your
            farm's productivity.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <select
                name="vehicleType"
                value={filters.vehicleType}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              >
                <option value="all">All Types</option>
                <option value="tractor">Tractors</option>
                <option value="harvester">Harvesters</option>
                <option value="reaper">Reapers</option>
                <option value="planter">Planters</option>
                <option value="sprayer">Sprayers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              >
                <option value="all">All Locations</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rental Period
              </label>
              <select
                name="rentalPeriod"
                value={filters.rentalPeriod}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              >
                <option value="all">Any Duration</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="seasonal">Seasonal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range (₹/day)
              </label>
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              >
                <option value="all">Any Price</option>
                <option value="0-1000">Under ₹1,000</option>
                <option value="1000-2000">₹1,000 - ₹2,000</option>
                <option value="2000-3000">₹2,000 - ₹3,000</option>
                <option value="3000-99999">Above ₹3,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Available Vehicles ({filteredVehicles.length})
          </h2>

          {filteredVehicles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No vehicles match your selected filters. Please try different
                criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Improved image container */}
                  <div className="relative pt-[60%] bg-white">
                    <div className="absolute inset-0 p-4 flex items-center justify-center bg-white">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>
                    {/* Vehicle type badge */}
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded z-10">
                      {vehicle.type.charAt(0).toUpperCase() +
                        vehicle.type.slice(1)}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {vehicle.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">
                        {vehicle.location}
                      </span>
                      <span className="text-sm text-gray-600">
                        {vehicle.power}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-600 text-sm mb-2">
                        {vehicle.description}
                      </p>
                      <div className="flex flex-wrap mt-2">
                        {vehicle.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-xl font-bold text-gray-800">
                          ₹{vehicle.price}
                        </span>
                        <span className="text-gray-600 text-sm">
                          /{vehicle.unit}
                        </span>
                      </div>
                      <div className="text-sm text-green-600">
                        {vehicle.availability}
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button 
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex-grow"
                        onClick={() => handleRentNow(vehicle)}
                      >
                        Rent Now
                      </button>
                      <button className="border border-green-600 text-green-600 py-2 px-4 rounded hover:bg-green-50">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            How Vehicle Renting Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Browse & Select</h3>
              <p className="text-gray-600">
                Explore our wide range of agricultural vehicles and choose what
                suits your needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">
                Reserve your equipment by making a secure payment through our
                platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Receive & Use</h3>
              <p className="text-gray-600">
                Get the equipment delivered to your farm or pick it up from our
                designated centers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Return</h3>
              <p className="text-gray-600">
                Return the equipment in good condition after your rental period
                is complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rent With Us */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Rent With Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Cost Effective</h3>
              <p className="text-gray-600">
                Avoid high purchase costs and maintenance expenses. Rent only
                when you need.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Well-Maintained Equipment
              </h3>
              <p className="text-gray-600">
                All our vehicles undergo regular maintenance and safety checks.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Flexible Rental Options
              </h3>
              <p className="text-gray-600">
                Choose from daily, weekly, monthly, or seasonal rental options
                as per your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <button className="w-full text-left p-4 font-semibold">
                What documents do I need to rent a vehicle?
              </button>
              <div className="p-4 pt-0 text-gray-600">
                You'll need a valid ID proof, address proof, and a valid
                driver's license (for self-operated vehicles). For farm
                equipment, you may also need to show proof of your farming
                operations.
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <button className="w-full text-left p-4 font-semibold">
                Is there a security deposit required?
              </button>
              <div className="p-4 pt-0 text-gray-600">
                Yes, we require a refundable security deposit that varies based
                on the type and value of the equipment being rented. This
                deposit is fully refunded upon return of the equipment in good
                condition.
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <button className="w-full text-left p-4 font-semibold">
                Do you provide operators for the machinery?
              </button>
              <div className="p-4 pt-0 text-gray-600">
                Yes, we offer skilled operators for complex machinery at an
                additional cost. This ensures safe and efficient operation of
                the equipment.
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <button className="w-full text-left p-4 font-semibold">
                What happens if the equipment breaks down during use?
              </button>
              <div className="p-4 pt-0 text-gray-600">
                Contact our support team immediately. If the breakdown is due to
                normal use, we'll repair or replace the equipment as quickly as
                possible. If it's due to misuse, additional charges may apply.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Reuse from HomePage */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 AgriStore. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>

      {/* Rental Booking Modal */}
      {showRentalModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Rent {selectedVehicle.name}</h2>
              <button 
                onClick={() => setShowRentalModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Step 1: Rental Duration */}
            {formStep === 1 && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={bookingDetails.startDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={bookingDetails.endDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    min={bookingDetails.startDate}
                  />
                </div>
                
                <div className="bg-green-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Daily Rate:</span>
                    <span>₹{selectedVehicle.price}/{selectedVehicle.unit}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotalPrice()}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleNextStep}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Continue
                </button>
              </>
            )}
            
            {/* Step 2: Contact Details */}
            {formStep === 2 && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={bookingDetails.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your 10-digit mobile number"
                      className="w-full border border-gray-300 rounded-l-md py-2 px-3"
                      maxLength="10"
                    />
                    <button
                      onClick={sendOTP}
                      disabled={bookingDetails.mobileNumber.length !== 10}
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md disabled:bg-gray-300"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
                
                {otpSent && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      value={bookingDetails.otp}
                      onChange={handleInputChange}
                      placeholder="Enter 6-digit OTP"
                      className="w-full border border-gray-300 rounded-md py-2 px-3"
                      maxLength="6"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      OTP sent to {bookingDetails.mobileNumber}
                    </p>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => setFormStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={verifyOTP}
                    disabled={!otpSent || bookingDetails.otp.length !== 6}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-300"
                  >
                    Verify & Continue
                  </button>
                </div>
              </>
            )}
            
            {/* Step 3: Payment */}
            {formStep === 3 && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Select Payment Method</h3>
                  
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={bookingDetails.paymentMethod === "upi"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>UPI Payment</span>
                    </label>
                    
                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={bookingDetails.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Credit/Debit Card</span>
                    </label>
                    
                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={bookingDetails.paymentMethod === "netbanking"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Net Banking</span>
                    </label>
                    
                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={bookingDetails.paymentMethod === "cash"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center">
                    <span>Vehicle:</span>
                    <span>{selectedVehicle.name}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Duration:</span>
                    <span>{bookingDetails.startDate} to {bookingDetails.endDate}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Location:</span>
                    <span>{selectedVehicle.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1 font-medium">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotalPrice()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => setFormStep(2)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={completeBooking}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    Make Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleRenting;