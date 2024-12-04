import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);  
  const [states, setStates] = useState([]);        
  const [cities, setCities] = useState([]);        
  const [selectedCountry, setSelectedCountry] = useState("");  
  const [selectedState, setSelectedState] = useState("");      
  const [selectedCity, setSelectedCity] = useState("");    
  const [error, setError] = useState(""); // New error state

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://crio-location-selector.onrender.com/countries");
        if (!response.ok) {
          throw new Error("Failed to fetch countries.");
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err); 
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
            throw new Error("Failed to fetch states.");
          }
          const data = await response.json();
          setStates(data);
          setSelectedState("");  
          setSelectedCity("");   
        } catch (err) {
          setError(err);
        }
      };

      fetchStates();
    }
  }, [selectedCountry]);

  // Fetch cities based on selected state and country
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          if (!response.ok) {
            throw new Error("Failed to fetch cities.");
          }
          const data = await response.json();
          setCities(data);
          setSelectedCity("");  
        } catch (err) {
          setError(err);
        }
      };

      fetchCities();
    }
  }, [selectedCountry, selectedState]);

  // Handle country change
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setError(""); // Clear error on new selection
  };

  // Handle state change
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setError(""); // Clear error on new selection
  };

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setError(""); // Clear error on new selection
  };

  return (
    <div className="location-selector">
      <h2>Select Location</h2>
      
      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
        {/* Country Dropdown */}
        <div>
          <select id="country" value={selectedCountry} onChange={handleCountryChange}>
            <option value="">--Select Country--</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        {/* selectedCountry && */}
        { (
          <div>
            <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
              <option value="">--Select State--</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* City Dropdown */}
        {/* selectedState && */}
        { (
          <div>
            <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
              <option value="">--Select City--</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Display Selected Location */}
      {selectedCity && selectedState && selectedCountry && (
        <div>
          <h3>
            You Selected: {`${selectedCity}, ${selectedState}, ${selectedCountry}`}
          </h3>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
