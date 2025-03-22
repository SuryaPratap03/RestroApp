"use client";
import { useEffect, useState, useRef } from "react";
import CustomerHeaders from "./_components/CustomerHeaders";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const [availableLocations, setAvailableLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [city, setCity] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurants,setRestaurants] = useState([]);
  const suggestionsRef = useRef(null);

  const loadRestaurants = async () => {
    let response = await fetch(`/api/customer?location=${city}&restaurant=${restaurant}`);
    let data = await response.json();
    console.log("Restaurant Data", data);
    if (data?.success) {
      setAllRestaurants(data?.result);
      setRestaurants(data?.result);
    }
  };
  const router = useRouter();
  useEffect(()=>{
    
    if(restaurant.length>3){
      loadRestaurants();
    } 
    else if(city.length>3){
      loadRestaurants();
    }
    else if(restaurant.length==0 || city.length==0){
      loadRestaurants();
    }
  },[restaurant,city])
  const loadLocations = async () => {
    const response = await fetch("/api/customer/locations");
    const data = await response.json();

    if (data?.success) {
      setAvailableLocations(data?.result);
    }
  };

  useEffect(() => {
    loadLocations();
    loadRestaurants();

    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.trim()) {
      const filtered = availableLocations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleRestaurantChange = (e) => {
    setRestaurant(e.target.value);
  };

  const handleSuggestionClick = (location) => {
    setCity(location);
    setShowSuggestions(false);
  };

  return (
    <div>
      {/* Header */}
      <CustomerHeaders />

      {/* Search Section */}
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-green-500 to-green-600">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Find Your Favorite Dish
          </h1>

          {/* Search Inputs */}
          <div className="relative flex">
            {/* City Input with Suggestions */}
            <div className="relative w-1/3" ref={suggestionsRef}>
              <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={handleCityChange}
                onFocus={() => setShowSuggestions(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(location)}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer transition"
                      >
                        {location}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Dish Input */}
            <input
              type="text"
              placeholder="Enter Restaurant Name"
              value={restaurant}
              onChange={handleRestaurantChange}
              className="w-2/3 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition -ml-px rounded-r-full"
            />
          </div>
        </div>
      </div>

      {/* Restaurant Cards Section */}
      <div className="container mx-auto my-10 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Restaurants
        </h2>

        {allRestaurants?.length === 0 ? (
          <p className="text-gray-600 text-center">No restaurants found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allRestaurants.map((restaurant, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105"
              >
                <div className="p-6">
                  {/* Restaurant Name */}
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    {restaurant.restaurantName}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    <span>{restaurant.city}</span>
                  </div>

                  {/* Address */}
                  <div className="flex items-center text-gray-600 mt-1">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <span>{restaurant.address}</span>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center text-gray-600 mt-1">
                    <FaPhone className="text-green-500 mr-2" />
                    <span>{restaurant.phoneNumber}</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center text-gray-600 mt-1">
                    <FaEnvelope className="text-orange-500 mr-2" />
                    <span>{restaurant.email}</span>
                  </div>

                  {/* Hover Button */}
                  <div className="mt-4">
                    <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                    onClick={()=>{
                      router.push(`/explore/${restaurant.restaurantName +"?id=" + restaurant._id}`);
                    }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
