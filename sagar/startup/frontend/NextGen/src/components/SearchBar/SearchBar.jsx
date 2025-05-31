import {Search} from "lucide-react";
function SearchBar() {
  return (
    <div className="absolute mt-8 ml-10 w-70 flex items-center gap-1 text-gray-600 px-4  border-none rounded-2xl bg-[#DEF1FF]">
      <Search/>
      <input
        type="text"
        placeholder="Search"
        className="w-[100%] px-1 py-2 text-black border-none rounded-2xl bg-[#DEF1FF] focus:outline-none  "
      />
    </div>
  );
}
export default SearchBar;
