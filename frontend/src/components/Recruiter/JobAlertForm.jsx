import { useState } from "react";
import toast from "react-hot-toast";
import { sendJobAlerts } from "../../services/operations/jobAPI";
import { useSelector } from "react-redux";

export default function JobAlertForm({ jobDetails }) {
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {user, token} = useSelector((state)=>state.auth)

  const handleSendAlerts = async (e) => {
    e.preventDefault();
    const emailList = emails.split(",").map((email) => email.trim());
    if (emailList.length === 0 || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await sendJobAlerts(emailList, message,token, jobDetails);
      toast.success(response.message || "Alerts sent successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to send alerts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Send Job Alerts</h3>
      <form onSubmit={handleSendAlerts}>
        <div className="mb-4">
          <label htmlFor="emails" className="block font-medium mb-1">
            Candidate Emails (comma-separated):
          </label>
          <textarea
            id="emails"
            rows="3"
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., user1@example.com, user2@example.com"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium mb-1">
            Job Alert Message:
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter the job alert message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Alerts"}
        </button>
      </form>
    </div>
  );
}
