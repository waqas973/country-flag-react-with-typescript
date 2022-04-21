import { Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchKeyword } from "../../redux/actions";
import "./search.scss";

const Search = () => {
  const dispatch = useDispatch();
  // //handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  return (
    <div className="search-box">
      <div className="search-box__wrapper">
        <Input
          onChange={handleInputChange}
          placeholder="Search by name"
          disableUnderline={true}
        />
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
