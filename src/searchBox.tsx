import React from "react";

// @ts-ignore
const SearchBox = ({visibility, handleSearch, city, handleSubmit}) => {
  return(
    <form className={visibility} onSubmit={handleSubmit}>
      <label htmlFor="city-search">Search a city (city-comma-country)</label><br/>
      <input type="text" name="citySearch" id="city-search" onChange={handleSearch} value={city}/>
    </form>
  )
}

export default SearchBox;
