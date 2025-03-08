import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TrackOrderPage() {
  // State to track form input and order status
  const [trackingId, setTrackingId] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  
  // Sample order data - in a real app, this would come from an API
  const sampleOrder = {
    orderId: "ORD78945612",
    orderDate: "March 5, 2025",
    estimatedDelivery: "March 10, 2025",
    status: "in-transit",
    statusText: "In Transit",
    customer: {
      name: "Rakesh Kumar",
      address: "123 Farming District, Punjab - 143001"
    },
    carrier: {
      name: "AgriExpress Logistics",
      trackingUrl: "#"
    },
    items: [
      {
        name: "Premium Organic Fertilizer",
        quantity: 2,
        price: 599,
        image: "https://placehold.co/100x100/green/white?text=Fertilizer"
      },
      {
        name: "Hybrid Tomato Seeds",
        quantity: 1,
        price: 799,
        image: "https://placehold.co/100x100/green/white?text=Seeds"
      }
    ],
    timeline: [
      { date: "March 5, 2025", time: "09:30 AM", status: "Order Placed", completed: true },
      { date: "March 6, 2025", time: "11:45 AM", status: "Order Processed", completed: true },
      { date: "March 7, 2025", time: "02:15 PM", status: "Shipped", completed: true },
      { date: "March 8, 2025", time: "10:00 AM", status: "In Transit", completed: true },
      { date: "March 10, 2025", time: "Expected", status: "Out for Delivery", completed: false },
      { date: "March 10, 2025", time: "Expected", status: "Delivered", completed: false }
    ]
  };
  
  // Handle form submission
  const handleTrackOrder = (e) => {
    e.preventDefault();
    setIsTracking(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setOrderDetails(sampleOrder);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Download App</span>
            <span>|</span>
            <span>Farmer Helpline: 1800-123-4567</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-green-300">Track Order</a>
            <a href="Login" className="hover:text-green-300">Login / Register</a>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="bg-green-600 py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white text-3xl font-bold">AgriStore</Link>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-1/3 my-2 md:my-0">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for products, crops, diseases..." 
                className="w-full py-2 px-4 rounded-full text-gray-700 bg-white focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full bg-yellow-500 text-white px-4 rounded-r-full">
                Search
              </button>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <Link to="/" className="text-white hover:text-green-200 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </Link>
            <a href="#" className="text-white hover:text-green-200 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Categories</span>
            </a>
            <a href="#" className="text-white hover:text-green-200 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Cart</span>
            </a>
            <a href="#" className="text-white hover:text-green-200 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span>Help</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Track Your Order</h1>
          <div className="flex items-center text-sm text-green-100">
            <Link to="/" className="hover:text-white">Home</Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Track Order</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Track Order Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Enter Order Details</h2>
              <form onSubmit={handleTrackOrder}>
                <div className="mb-4">
                  <label htmlFor="trackingId" className="block text-gray-700 font-medium mb-2">Order ID / Tracking Number</label>
                  <input 
                    type="text" 
                    id="trackingId"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. ORD78945612" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="orderEmail" className="block text-gray-700 font-medium mb-2">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    id="orderEmail"
                    value={orderEmail}
                    onChange={(e) => setOrderEmail(e.target.value)}
                    placeholder="Email used for order" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the email address used to place the order</p>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
                >
                  {isTracking && !orderDetails ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Tracking Order...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      Track Order
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
                <p className="text-gray-600 mb-4">If you're having trouble tracking your order, our customer service team is here to help.</p>
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">Call us: 1800-123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">Email: support@agristore.com</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Tracking Results */}
          <div className="lg:col-span-2">
            {!orderDetails && (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Track Your Order Status</h2>
                <p className="text-gray-600 mb-4">
                  Enter your order ID or tracking number to see the current status and estimated delivery date of your purchase.
                </p>
                <div className="text-left bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Order Information
                  </h3>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      You'll be able to see your order status and delivery timeline
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Check if your items have been packed, shipped, or delivered
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your order ID can be found in your order confirmation email
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {orderDetails && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                  <div className="flex flex-wrap items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">Order #{orderDetails.orderId}</h2>
                      <p className="text-green-100">Placed on {orderDetails.orderDate}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-green-700 font-semibold text-sm">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        {orderDetails.statusText}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Progress */}
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Progress</h3>
                  
                  {/* Progress Bar */}
                  <div className="relative pt-8">
                    <div className="flex mb-2">
                      <div className="flex-1">
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-green-600 bg-green-600 text-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-green-600 bg-green-600 text-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-green-600 bg-green-600 text-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-green-600 bg-green-600 text-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center">
                          <span className="text-xs">5</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="w-6 h-6 mx-auto rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center">
                          <span className="text-xs">6</span>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
                      <div className="w-2/3 bg-green-500"></div>
                    </div>
                    <div className="flex text-xs text-gray-600">
                      <div className="flex-1 text-center">
                        <div>Order Placed</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div>Processed</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div>Shipped</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div>In Transit</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div>Out for Delivery</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div>Delivered</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 mt-6">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-sm text-green-700">Expected Delivery Date</div>
                        <div className="font-semibold text-green-800">{orderDetails.estimatedDelivery}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Timeline */}
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipment Updates</h3>
                  <div className="space-y-6">
                    {orderDetails.timeline.map((event, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${event.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {event.completed ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          {index < orderDetails.timeline.length - 1 && (
                            <div className={`h-full w-0.5 ${event.completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          )}
                        </div>
                        <div className={`pb-6 ${event.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                          <div className="font-semibold">{event.status}</div>
                          <div className="text-sm">{event.date} {event.time}</div>
                          {event.status === "Shipped" && (
                            <div className="mt-2 text-sm bg-gray-50 border border-gray-200 rounded-md p-2">
                              Your package has left our warehouse and is now with {orderDetails.carrier.name}.
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Details */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Shipping Address</h4>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="font-medium">{orderDetails.customer.name}</div>
                        <div className="text-gray-600">{orderDetails.customer.address}</div>
                      </div>
                      
                      <h4 className="font-medium text-gray-700 mt-4 mb-2">Carrier Information</h4>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="font-medium">{orderDetails.carrier.name}</div>
                        <div className="text-sm text-gray-600">Tracking #: {orderDetails.orderId}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Order Summary</h4>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="space-y-3">
                          {orderDetails.items.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-3" />
                              <div className="flex-1">
                                <div className="text-sm font-medium">{item.name}</div>
                                <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                              </div>
                              <div className="text-sm font-medium">₹{item.price * item.quantity}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>₹{orderDetails.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span>Shipping:</span>
                            <span>₹40</span>
                          </div>
                          <div className="flex justify-between font-semibold mt-2">
                            <span>Total:</span>
                            <span>₹{orderDetails.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 40}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8 space-x-4">
                    <button className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition">
                      Contact Support
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">How do I track my order?</h3>
              <p className="text-gray-600">You can track your order by entering your Order ID or Tracking Number in the form above. The Order ID is included in your order confirmation email.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">Why can't I track my order?</h3>
              <p className="text-gray-600">If you've just placed your order, it may take up to 24 hours for tracking information to appear. If it's been longer, please contact our customer support.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">When will my order be delivered?</h3>
              <p className="text-gray-600">Delivery times vary based on your location. Once your order is shipped, the estimated delivery date will be displayed in your tracking information.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">Can I change my delivery address?</h3>
              <p className="text-gray-600">If your order hasn't been shipped yet, you can contact our customer support to request an address change. Once shipped, address changes aren't possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">AgriStore</h4>
              <p className="text-gray-400 mb-4">Your complete agricultural solutions partner, providing quality products and expert advice to farmers across India.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Advisory Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Seeds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Fertilizers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pesticides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Bio Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Equipment & Tools</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Irrigation Systems</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Agriculture Road, Farming District, 560001</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">1800-123-4567 (Toll Free)</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">support@agristore.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 AgriStore. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TrackOrderPage;