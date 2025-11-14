import { Search } from "lucide-react";

const JobFilterBar = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="relative w-full md:w-1/3">
        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select className="border border-gray-200 rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-black outline-none">
          <option>All Categories</option>
          <option>Image Labeling</option>
          <option>Text Annotation</option>
          <option>Audio Transcription</option>
        </select>

        <select className="border border-gray-200 rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-black outline-none">
          <option>All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilterBar;
