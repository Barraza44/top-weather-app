import React from "react";

// @ts-ignore
const SearchBox = ({visibility}) => {
  return(
    <form className={visibility}>
      <input type="text" name="citySearch" id="city-search"/>
    </form>
  )
}

export default SearchBox;
