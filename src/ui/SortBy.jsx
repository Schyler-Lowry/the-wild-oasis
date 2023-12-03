import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  // You could, and argubaly should, extract this into a custom hook called useUrl (or somethign like that)
  // that both sets the url search params, and reads them from the url
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type={"white"}
      onChange={handleChange}
      value={sortBy}
    >
      Sort
    </Select>
  );
}

export default SortBy;
