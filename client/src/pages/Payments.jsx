import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";

export default function Payments() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [payments] = useState([
    { id: 1, date: "Nov 3, 2025", amount: 120, status: "Completed" },
    { id: 2, date: "Oct 27, 2025", amount: 95, status: "Completed" },
    { id: 3, date: "Oct 12, 2025", amount: 150, status: "Pending" },
  ]);

  const balance = 220; // mock user balance

  const handleWithdraw = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      alert("Withdrawal request submitted!");
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Payments" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Balance Card */}
            <Card>
              <CardHeader>
                <CardTitle>Available Balance</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">${balance}</p>
                  <p className="text-sm text-gray-500">Ready for withdrawal</p>
                </div>
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-b">
                        <td className="px-4 py-3">{p.date}</td>
                        <td className="px-4 py-3 font-medium">${p.amount}</td>
                        <td
                          className={`px-4 py-3 ${
                            p.status === "Completed"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {p.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Withdraw Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            You’re about to withdraw <span className="font-semibold">${balance}</span> to your
            connected account.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleWithdraw} loading={loading}>
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
