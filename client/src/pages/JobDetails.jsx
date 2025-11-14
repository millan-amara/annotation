import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/Dialog";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function JobDetails() {
  const { id } = useParams(); // job ID from route
  const [job, setJob] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching job details
    setTimeout(() => {
      setJob({
        id,
        title: "Data Annotation Specialist",
        company: "SpherePulse",
        rate: "$10/hr",
        type: "Remote",
        duration: "3 months",
        description:
          "We are seeking detail-oriented individuals to label and annotate visual datasets for AI model training. Familiarity with CVAT or similar tools is a plus.",
        requirements: [
          "Strong attention to detail",
          "Good English communication",
          "Stable internet connection",
          "Availability for at least 20 hours/week",
        ],
      });
    }, 500);
  }, [id]);

  const handleApply = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      alert("Application submitted successfully!");
    }, 1000);
  };

  if (!job)
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading job details...</p>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Job Details" />
        <div className="flex-1 overflow-y-auto p-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                {job.title}
              </CardTitle>
              <p className="text-gray-600">{job.company}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <span className="bg-gray-100 px-3 py-1 rounded-md">{job.rate}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-md">{job.type}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-md">{job.duration}</span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mt-6 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mt-6 mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => setOpen(true)}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Application</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to apply for this position?</p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={loading}>
              {loading ? "Applying..." : "Yes, Apply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
