import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchParams({ search: e.target.value });
    setSearchValue(e.target.value);
  };

  return (
    <input
      type="search"
      value={searchValue}
      onChange={(e) => handleSearch(e)}
    />
  );
};

export default Search;
