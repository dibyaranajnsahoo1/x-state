import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);  
  const [states, setStates] = useState([]);        
  const [cities, setCities] = useState([]);        
  const [selectedCountry, setSelectedCountry] = useState("");  
  const [selectedState, setSelectedState] = useState("");      
  const [selectedCity, setSelectedCity] = useState("");    
  
  


  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://crio-location-selector.onrender.com/countries");
      const data = await response.json();
      setCountries(data);
      console.log(data)
    };

    fetchCountries();
  }, []);

  // Fetch states based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        const data = await response.json();
        setStates(data);
        setSelectedState("");  
        setSelectedCity("");   
      };

      fetchStates();
    }
  }, [selectedCountry]);

  // Fetch cities based on selected state and country
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const fetchCities = async () => {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        const data = await response.json();
        setCities(data);
        setSelectedCity("");  // Reset city when state changes
      };

      fetchCities();
    }
  }, [selectedCountry, selectedState]);

  // Handle country change
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  // Handle state change
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="location-selector">
        <h2>Select Location</h2>
     <div style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
      

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
            You Selected: {selectedCity}, {selectedState}, {selectedCountry}
          </h3>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
