import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState("");

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://crio-location-selector.onrender.com/countries");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
        setError("");
      } catch (err) {
        setError("Failed to load countries. Please try again later.");
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          if (!response.ok) {
            throw new Error("Failed to fetch states");
          }
          const data = await response.json();
          setStates(data);
          setError("");
        } catch (err) {
          setError("Failed to load states. Please try again later.");
          setStates([]);
        }
      };

      fetchStates();
    }
  }, [selectedCountry]);

  // Fetch cities based on selected state
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          if (!response.ok) {
            throw new Error("Failed to fetch cities");
          }
          const data = await response.json();
          setCities(data);
          setError("");
        } catch (err) {
          setError("Failed to load cities. Please try again later.");
          setCities([]);
        }
      };

      fetchCities();
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCities([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="location-selector">
      <h2>Select Location</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {/* Country Dropdown */}
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Location */}
      {selectedCountry && selectedState && selectedCity && (
        <div>
          <h3>You Selected {selectedCity}, {selectedState}, {selectedCountry}</h3>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LocationSelector;
