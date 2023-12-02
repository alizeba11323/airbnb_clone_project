"use client";
import { BiSearch } from "react-icons/bi";
function Search() {
  return (
    <div className="w-full md:w-auto shadow-sm rounded-full py-2 border-[1px] hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="text-sm font-semibold px-6 border-x-[1px] hidden sm:block flex-1 text-center">
          Any Week
        </div>
        <div className="text-sm font-semibold pl-6 pr-2 flex flex-row text-gray-600 items-center gap-2">
          <div className="hidden sm:block">Add Guests</div>
          <div className="rounded-full p-2 text-white bg-rose-500">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
