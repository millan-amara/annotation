const JobTable = () => {
  const jobs = [
    { title: "Image Labeling – Batch 1", status: "In Progress", pay: "$25" },
    { title: "Text Categorization", status: "Pending Review", pay: "$18" },
    { title: "Audio Transcription", status: "Completed", pay: "$40" },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Pending Review":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Recent Jobs</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-3">Job Title</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Pay</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-3">{job.title}</td>
              <td className="py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </td>
              <td className="py-3">{job.pay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
