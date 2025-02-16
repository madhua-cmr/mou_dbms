import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const FilterModal = ({ onApplyFilters,onResetFilters,onClose }) => {
  const [filters, setFilters] = useState({
    organizationName: "",
    location: "",
    areaOfCooperation: "",
    department: "",
    category: "",
    startDate: "",
    endDate: "",
  });


  const handleChange=(e)=>{
    setFilters({...filters,[e.target.name]:e.target.value})
  }

const handleApplyFilters=()=>{
  onApplyFilters(filters);
  onClose();
}

 


  return (
    <div className="w-full h-full flex items-center justify-center fixed inset-0 bg-black bg-opacity-50">
      <div className="flex w-2/4 p-4 max-sm:w-3/4 bg-white rounded flex-col gap-4">
        <div className="flex justify-between">
          <h2>Filter MoUs</h2>
          <MdOutlineCancel className="text-[18px] cursor-pointer" onClick={onClose} />
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-2">
          <label>Organization Name</label>
          <input onChange={handleChange} value={filters.organizationName} type="text" name="organizationName" className="p-2 border rounded" />
        </div>

        <div className="flex flex-col gap-2">
          <label>Location</label>
          <input onChange={handleChange} value={filters.location} type="text" name="location" className="p-2 border rounded" />
        </div>

        <div className="flex flex-col gap-2">
          <label>Area of Cooperation</label>
          <select name="areaOfCooperation" onChange={handleChange} value={filters.areaOfCooperation} className="p-2 border rounded">
            <option value="">Select AOC</option>
            <option value="job">Job</option>
            <option value="internship">Internship</option>
            <option value="workshop">Workshop</option>
            <option value="iv">Industrial Visit</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Department</label>
          <select name="department" value={filters.department} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select Dept</option>
            <option value="it">IT</option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
            <option value="eee">EEE</option>
            <option value="mech">Mech</option>
            <option value="civil">Civil</option>
            <option value="biotech">Biotech</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Category</label>
          <select name="category" onChange={handleChange} value={filters.category} className="p-2 border rounded">
         
              <option value="">Select Category</option><option value="it">IT</option>
              <option value="industry">Industry</option>
              <option value="NGO">NGO</option>
              <option value="college">College</option>
              <option value="mnc">MNC</option>
             
            </select>
        </div>

        <div className="flex gap-2 flex-col">
          <label>Start Date</label>
          <input onChange={handleChange} value={filters.startDate} type="date" name="startDate" className="p-2 border rounded" />
        </div>

        <div className="flex gap-2 flex-col">
          <label>End Date</label>
          <input onChange={handleChange} value={filters.endDate} type="date" name="endDate" className="p-2 border rounded" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-center">
          <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-800 w-[150px]" onClick={handleApplyFilters}>
            Apply
          </button>
          <button type="button" className="p-2 bg-gray-700 text-white rounded hover:bg-black w-[150px]" onClick={onResetFilters}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
