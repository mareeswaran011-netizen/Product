import React, { useState, useMemo, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";

const ProductListPage = ({ products, onViewProduct }) => {
  const scrollContainerRef = useRef(null);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
const [filterLabel, setFilterLabel] = useState("Select Range");

const handleFilterChange = (value) => {
  setSortBy(value);
  const labels = {
    default: "Select Range",
    "rating-desc": "Sort by Rating",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
  };
  setFilterLabel(labels[value]);
  setOpen(false);
};


  const categories = useMemo(() => {
    const uniqueCategories = ["All"];
    products.forEach((p) => {
      if (p.category && !uniqueCategories.includes(p.category)) {
        uniqueCategories.push(p.category);
      }
    });
    return uniqueCategories;
  }, [products]);
  
  // No changes to the logic below...
  const offers = useMemo(() => {
    return products
      .filter((p) => p.oldPrice && p.oldPrice > p.price)
      .slice(0, 8);
  }, [products]);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, searchTerm]);
  const filteredAndSortedProducts = useMemo(() => {
    const sortable = [...filteredProducts];
    switch (sortBy) {
      case "default":
        return sortable;
      case "rating-desc":
        return sortable.sort(
          (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
        );
      case "price-asc":
        return sortable.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sortable.sort((a, b) => b.price - a.price);
      default:
        return sortable;
    }
  }, [filteredProducts, sortBy]);

  // The original useEffect for scrolling to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory, sortBy, searchTerm]);

  // ✅ 1. NEW useEffect TO HANDLE SCROLLING THE ACTIVE CATEGORY INTO VIEW
  useEffect(() => {
    // Find the index of the currently active category
    const activeIndex = categories.findIndex(c => c === activeCategory);
    
    if (scrollContainerRef.current && activeIndex !== -1) {
      // Find the specific button element in the container
      const activeButton = scrollContainerRef.current.children[activeIndex];
      
      if (activeButton) {
        // Scroll that button into view
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeCategory, categories]); // This effect runs whenever the activeCategory changes

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div 
        ref={scrollContainerRef} 
        className="flex items-center gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide scroll-smooth"
      >
        {/* ✅ 2. The onClick is now simpler */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)} // Just sets the state
            className={`px-5 py-2.5 rounded-full text-sm sm:text-base transition font-medium shadow-sm flex-shrink-0 ${
              activeCategory === cat
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
<div className="flex justify-left-end mb-8">
  <div className="relative w-64">
    {/* Button */}
    <button
      type="button"
      className="w-full bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 flex justify-between items-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      onClick={() => setOpen(!open)}
    >
      <span className="text-gray-700 flex items-center gap-2">
        {/* Hamburger icon only on mobile */}
        <svg
          className="h-5 w-5 sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
        </svg>
        {filterLabel}
      </span>

      {/* Dropdown arrow */}
      <svg
        className={`h-5 w-5 transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.585l3.71-4.355a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    {/* Dropdown menu */}
    {open && (
      <ul className="absolute z-10 mt-1 w-full sm:w-64 right-0 sm:right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
        {[
          { value: "default", label: "Default" },
          { value: "rating-desc", label: "Sort by Rating" },
          { value: "price-asc", label: "Price: Low to High" },
          { value: "price-desc", label: "Price: High to Low" },
        ].map((option) => (
          <li
            key={option.value}
            className="px-4 py-2 hover:bg-indigo-100 cursor-pointer flex justify-between items-center"
            onClick={() => handleFilterChange(option.value)}
          >
            <div className="flex items-center gap-2">
              {/* Tick icon on mobile */}
              <svg
                className={`h-4 w-4 text-indigo-500 sm:hidden ${sortBy === option.value ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              {option.label}
            </div>

            {/* Tick icon on desktop */}
            {sortBy === option.value && (
              <svg
                className="h-5 w-5 text-indigo-500 hidden sm:block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

     



      {activeCategory === "All" && !searchTerm && sortBy === "default" && offers.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-red-500">🔥</span> Deals of the Day
          </h2>
          <Carousel offers={offers} onViewProduct={onViewProduct} />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} onViewProduct={onViewProduct} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;