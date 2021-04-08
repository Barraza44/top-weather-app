import React from "react";

// @ts-ignore
const SearchBox = (props) => {
  return(
    <form className={props.visibility}>
      <input type="text" name="citySearch" id="city-search"/>
    </form>
  )
}

export default SearchBox;
