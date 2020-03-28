import React, { useContext } from "react";
import "../Styles/SearchName.css";
import DataArea from "../utils/Data";

const SearchName = () => {
  const context = useContext(DataArea);

  return (
    <div className="searchbox">
      <div className="input-group">
       <div className="input-group-prepend">
      <span className="input-group-text" id="">
              Search for Employee By Name
       </span>
          </div>
          <input
          className="formsrch"
          type="search"
          placeholder="Name"
          aria-label="Search"
          onChange={e => context.handleSearchChange(e)}
        />
        </div>
    </div>
  );
}
export default SearchName;