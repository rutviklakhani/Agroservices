import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function SeedsPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  
  // Main seed categories with their sub-categories
  const seedCategories = [
    {
      id: 'vegetable',
      name: 'VEGETABLE SEEDS',
      image: 'https://placehold.co/600x400/green/white?text=Vegetable+Seeds',
      subCategories: ['TOMATO', 'CUCUMBER', 'CHILLI', 'BRINJAL', 'OKRA', 'CAPSICUM', 'ZUCCHINI']
    },
    {
      id: 'oil',
      name: 'OIL SEEDS',
      image: 'https://placehold.co/600x400/brown/white?text=Oil+Seeds',
      subCategories: ['COTTON', 'MUSTARD', 'CASTOR', 'GROUND NUT', 'SESAME', 'SOYABEAN']
    },
    {
      id: 'field',
      name: 'FIELD CROP SEEDS',
      image: 'https://placehold.co/600x400/yellow/white?text=Field+Crop+Seeds',
      subCategories: ['WHEAT', 'MAIZE', 'PADDY', 'MILLET', 'GRAM', 'CUMIN', 'BLACK GRAM']
    },
    {
      id: 'fodder',
      name: 'FODDER SEEDS',
      image: 'https://placehold.co/600x400/green/white?text=Fodder+Seeds',
      subCategories: ['NAPIER GRASS', 'SSG MULTICUT', 'LUCERNE', 'BERSEEM']
    }
  ];
  
  // Sample seeds data
  const seedProducts = [
    {
      id: 1,
      name: 'F1 Zucchini Green Raunaq',
      category: 'vegetable',
      subCategory: 'ZUCCHINI',
      image: 'https://placehold.co/300x300/green/white?text=Zucchini+Seeds',
      priceRange: '₹272.00 - ₹12,408.00',
      weightOptions: ['10GM', '20GM', '100GM', '1KG'],
      seller: 'Grow Delight'
    },
    {
      id: 2,
      name: 'Premium Tomato Seeds',
      category: 'vegetable',
      subCategory: 'TOMATO',
      image: 'https://placehold.co/300x300/red/white?text=Tomato+Seeds',
      priceRange: '₹199.00 - ₹4,999.00',
      weightOptions: ['5GM', '10GM', '50GM', '500GM'],
      seller: 'Grow Delight'
    },
    {
      id: 3,
      name: 'High Yield Mustard Seeds',
      category: 'oil',
      subCategory: 'MUSTARD',
      image: 'https://placehold.co/300x300/yellow/black?text=Mustard+Seeds',
      priceRange: '₹320.00 - ₹5,800.00',
      weightOptions: ['100GM', '500GM', '1KG', '5KG'],
      seller: 'AgriSeed Pro'
    },
    {
      id: 4,
      name: 'Organic Cotton Seeds',
      category: 'oil',
      subCategory: 'COTTON',
      image: 'https://placehold.co/300x300/white/black?text=Cotton+Seeds',
      priceRange: '₹450.00 - ₹9,000.00',
      weightOptions: ['250GM', '500GM', '1KG'],
      seller: 'Organic Farms'
    },
    {
      id: 5,
      name: 'Premium Wheat Seeds',
      category: 'field',
      subCategory: 'WHEAT',
      image: 'https://placehold.co/300x300/yellow/white?text=Wheat+Seeds',
      priceRange: '₹180.00 - ₹4,200.00',
      weightOptions: ['1KG', '5KG', '10KG', '25KG'],
      seller: 'Harvest King'
    },
    {
      id: 6,
      name: 'Napier Grass Seeds',
      category: 'fodder',
      subCategory: 'NAPIER GRASS',
      image: 'https://placehold.co/300x300/green/white?text=Napier+Grass',
      priceRange: '₹350.00 - ₹6,500.00',
      weightOptions: ['100GM', '500GM', '1KG'],
      seller: 'Green Harvest'
    }
  ];
  
  // Filtered products based on selected category and sub-category
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Update filtered products when selection changes
  useEffect(() => {
    if (selectedSubCategory) {
      setFilteredProducts(seedProducts.filter(product => 
        product.subCategory === selectedSubCategory
      ));
    } else if (activeCategory) {
      setFilteredProducts(seedProducts.filter(product => 
        product.category === activeCategory
      ));
    } else {
      setFilteredProducts([]);
    }
  }, [activeCategory, selectedSubCategory]);

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setSelectedSubCategory(null);
  };
  
  // Handle sub-category selection
  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <Header/>
      
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
                placeholder="Search for seeds, crops, varieties..." 
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
            <Link to="/cart" className="text-white hover:text-green-200 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Agricultural Seeds</h1>
          <p className="mt-2 text-lg">High-quality seeds for better yields and healthier crops</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-green-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-gray-700">Seeds</span>
                </div>
              </li>
              {activeCategory && (
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 text-gray-700">
                      {seedCategories.find(cat => cat.id === activeCategory)?.name}
                    </span>
                  </div>
                </li>
              )}
              {selectedSubCategory && (
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 text-gray-700">{selectedSubCategory} SEEDS</span>
                  </div>
                </li>
              )}
            </ol>
          </nav>
        </div>

        {/* Seed Categories (shown when no category is selected) */}
        {!activeCategory && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Seed Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seedCategories.map(category => (
                <div key={category.id} className="relative group">
                  <div 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {category.subCategories.length} varieties available
                      </p>
                    </div>
                  </div>
                  
                  {/* Dropdown for sub-categories (appears on hover) */}
                  <div className="absolute left-0 right-0 top-full z-20 hidden group-hover:block">
                    <div className="bg-black text-white mt-1 rounded-md shadow-lg overflow-hidden">
                      <ul className="py-1">
                        {category.subCategories.map((subCat, idx) => (
                          <li key={idx}>
                            <button 
                              className="block w-full text-left px-4 py-2 hover:bg-gray-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryClick(category.id);
                                handleSubCategoryClick(subCat);
                              }}
                            >
                              {subCat} SEEDS
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Category View */}
        {activeCategory && (
          <div>
            {/* Category Header and Navigation */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedSubCategory ? `${selectedSubCategory} SEEDS` : 
                 seedCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>
              <button 
                onClick={() => {
                  if (selectedSubCategory) {
                    setSelectedSubCategory(null);
                  } else {
                    setActiveCategory(null);
                  }
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ← Back to {selectedSubCategory ? seedCategories.find(cat => cat.id === activeCategory)?.name : 'All Categories'}
              </button>
            </div>

            {/* Sub-category navigation (when parent category is selected) */}
            {activeCategory && !selectedSubCategory && (
              <div className="bg-black text-white p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-3">Select Seed Type</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {seedCategories
                    .find(cat => cat.id === activeCategory)
                    ?.subCategories.map((subCat, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => handleSubCategoryClick(subCat)}
                          className="hover:text-green-300 py-1"
                        >
                          {subCat} SEEDS
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative pt-[100%] bg-white">
                      <div className="absolute inset-0 p-4 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <div className="mt-2 text-green-600 font-bold">{product.priceRange}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.weightOptions.map((weight, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {weight}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-sm text-gray-500">Sold By: {product.seller}</div>
                      <div className="mt-4">
                        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                          SELECT OPTIONS
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600">No products found in this category. Please check back later.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 AgriStore. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SeedsPage;