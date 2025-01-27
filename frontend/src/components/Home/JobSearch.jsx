import { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function JobFilter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([
    "Frontend",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nonListedSkill, setNonListedSkill] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setIsDropdownOpen(false);
  };

  const addNonListedSkill = () => {
    if (nonListedSkill.trim() && !availableSkills.includes(nonListedSkill)) {
      setAvailableSkills([...availableSkills, nonListedSkill]);
      addSkill(nonListedSkill);
    }
    setNonListedSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const applyFilter = () => {
    onFilterChange({ searchTerm, skills });
  };

  const clearFilter = () => {
    setSearchTerm("");
    setSkills([]);
    onFilterChange({ searchTerm: "", skills: [] });
  };

  useEffect(() => {
    applyFilter();
  }, [searchTerm, skills]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search job titles"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none"
        />
      </div>

      <div className="relative">
        <button
          className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 w-full"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Filter by Skills
          {isDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            {availableSkills.map((skill, index) => (
              <button
                key={index}
                onClick={() => addSkill(skill)}
                className="block text-left w-full px-4 py-2 hover:bg-gray-100"
              >
                {skill}
              </button>
            ))}
            <input
              type="text"
              placeholder="Add your skill"
              value={nonListedSkill}
              onChange={(e) => setNonListedSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addNonListedSkill();
              }}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-full flex items-center gap-2"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={applyFilter}
        >
          Apply Filters
        </button>
        <button
          className="border border-red-500 text-red-500 px-4 py-2 rounded-lg"
          onClick={clearFilter}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
