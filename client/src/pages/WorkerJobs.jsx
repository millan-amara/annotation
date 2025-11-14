import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import JobFilterBar from "../components/JobFilterBar";
import JobCard from "../components/JobCard";

const WorkerJobs = () => {
  const jobs = [
    {
      title: "Image Labeling – Batch 3",
      description: "Annotate 200 product images using bounding boxes.",
      category: "Image Labeling",
      pay: "$30",
      duration: "2 days",
      applied: false,
    },
    {
      title: "Text Categorization for Reviews",
      description: "Tag customer reviews as positive, neutral, or negative.",
      category: "Text Annotation",
      pay: "$25",
      duration: "1 day",
      applied: true,
    },
    {
      title: "Audio Transcription – Short Clips",
      description: "Transcribe 15 short voice recordings accurately.",
      category: "Audio Transcription",
      pay: "$40",
      duration: "3 days",
      applied: false,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-50">
        <Topbar />

        <main className="p-6 space-y-6">
          <JobFilterBar />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, i) => (
              <JobCard key={i} job={job} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkerJobs;
