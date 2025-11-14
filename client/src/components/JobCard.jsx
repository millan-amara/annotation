import { Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{job.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={15} /> {job.duration}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={15} /> {job.pay}
          </span>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            job.category === "Image Labeling"
              ? "bg-blue-100 text-blue-700"
              : job.category === "Text Annotation"
              ? "bg-green-100 text-green-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {job.category}
        </span>
      </div>

      <Link to="/workerjobs/show" className="mt-5 w-full bg-black text-white text-sm font-medium py-2 rounded-xl hover:opacity-90 transition text-center">
        {job.applied ? "View Job" : "Apply"}
      </Link>
    </div>
  );
};

export default JobCard;
