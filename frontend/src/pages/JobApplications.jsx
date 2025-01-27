import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { getJobsByAuthor, sendEmailUpdate } from "../services/operations/userAPI";
import toast from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function JobApplications() {
  const { user, token } = useSelector((state) => state.auth);
  const [applications, setApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailDialog, setEmailDialog] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const navigate = useNavigate();
  const {toggleSidebar} = useOutletContext();

  useEffect(() => {
    if (!user || !token) return;
    const fetchApplications = async () => {
      try {
        const data = await getJobsByAuthor(token);
        setApplications(data);
      } catch (error) {
        toast.error("Error fetching applications!");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [user, token]);

  const applicantTemplate = (rowData) => {
    return (
      <div>
        <span>{rowData.applicantName}</span>
      </div>
    );
  };

  const handleSendUpdates = async () => {
    if (!emailSubject || !emailMessage) {
      toast.error("Please fill in the subject and message.");
      return;
    }

    try {
      await sendEmailUpdate({
        applications: selectedApplications.map((app) => app.applicantEmail),
        subject: emailSubject,
        message: emailMessage,
      });
      toast.success("Updates sent successfully!");
      setEmailDialog(false);
      setSelectedApplications([]);
      setEmailSubject("");
      setEmailMessage("");
    } catch (error) {
      toast.error("Failed to send updates.");
    }
  };


  return (
    <div className="container p-4">
      <h2 className="md:text-4xl  text-xl flex items-center gap-4 mb-4 py-4 font-semibold">
        <FaBars className="md:hidden block" onClick={toggleSidebar}/>
        Applications Received
      </h2>

      <div className="mb-4 flex gap-4">
        <Button
          label="Send Updates"
          icon="pi pi-envelope"
          className="p-button-success"
          onClick={() => setEmailDialog(true)}
          disabled={selectedApplications.length === 0}
        />
      </div>

      <DataTable
        value={applications}
        loading={loading}
        paginator
        rows={10}
        selectionMode="checkbox"
        selection={selectedApplications}
        onSelectionChange={(e) => setSelectedApplications(e.value)}
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="jobTitle" header="Job Title" sortable />
        <Column field="applicantName" header="Applicant" body={applicantTemplate} sortable />
        <Column field="applicantEmail" header="Applicant's Email" />
        <Column
          header="Actions"
          body={(rowData) => (
            <Button
              label="View Job"
              onClick={() => navigate(`/dashboard/jobs/${rowData.jobId}/view`)}
            />
          )}
        />
      </DataTable>

      <Dialog
        header="Send Email Update"
        visible={emailDialog}
        onHide={() => setEmailDialog(false)}
        footer={
          <div className="flex justify-end gap-4 p-4">
            <Button
              label="Send"
              icon="pi pi-send"
              className="p-button-success text-base px-4 py-2"
              onClick={handleSendUpdates}
            />
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-secondary text-base px-4 py-2"
              onClick={() => setEmailDialog(false)}
            />
          </div>
        }
        style={{ width: "clamp(350px, 60%, 800px)" }}
        breakpoints={{ "960px": "75vw", "640px": "90vw" }}
      >
        <div className="p-4">
          <div className="mb-6">
            <label
              htmlFor="emailSubject"
              className="block font-bold text-lg mb-2 text-gray-800"
            >
              Subject
            </label>
            <InputText
              id="emailSubject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter the subject"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="emailMessage"
              className="block font-bold text-lg mb-2 text-gray-800"
            >
              Message
            </label>
            <InputTextarea
              id="emailMessage"
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter the message"
            />
          </div>
        </div>
      </Dialog>

    </div>
  );
}
