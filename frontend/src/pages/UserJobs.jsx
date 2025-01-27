import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteJob, getUserCreatedJobs } from "../slices/jobSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { CgEye } from "react-icons/cg";
import Modal from "../components/Modal";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primeicons/primeicons.css";
import { Link, useOutletContext } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const UserJobs = () => {
  const dispatch = useDispatch();
  const { userJobs, isLoading, error } = useSelector((state) => state.jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const {toggleSidebar} = useOutletContext();

  useEffect(() => {
    dispatch(getUserCreatedJobs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredJobs(userJobs);
  }, [userJobs]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredJobs(userJobs);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = userJobs.filter(
      (job) =>
        job._id.toLowerCase().includes(lowercasedQuery) ||
        job.title.toLowerCase().includes(lowercasedQuery) ||
        new Date(job.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(lowercasedQuery)
    );

    setFilteredJobs(filtered);
  };

  const formatDate = (value) => new Date(value).toLocaleDateString();

  const actionBodyTemplate = (data) => {
    const handleDeleteClick = (id) => {
      setJobToDelete(id);
      setIsModalOpen(true); 
    };

    return (
      <div className="flex gap-2">
        <Link
          to={`/dashboard/jobs/${data?._id}/view`}
          className="p-button p-button-text p-button-warning"
        >
          <CgEye />
        </Link>
        <Link
          to={`/dashboard/jobs/${data?._id}/edit`}
          className="p-button p-button-text p-button-warning"
        >
          <AiFillEdit />
        </Link>
        <button
          className="p-button p-button-text p-button-danger"
          onClick={() => handleDeleteClick(data._id)}
        >
          <MdDelete />
        </button>
      </div>
    );
  };

  // Handle job deletion
  const handleConfirmDelete = () => {
    if (jobToDelete) {
      dispatch(deleteJob(jobToDelete));
      setIsModalOpen(false); // Close the modal after deletion
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  // Spinner for loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  // Error display
  if (error) {
    return <Toast severity="error" detail={error} />;
  }

  return (
    <div className="p-4 container">
      <h2 className="md:text-4xl text-2xl font-semibold mb-4 py-4 flex items-center gap-4">
        <FaBars className="md:hidden block" onClick={toggleSidebar}/>
        Your Posted Jobs
      </h2>
      <input
        type="text"
        className="p-inputtext md:w-[fit-content] min-w-[13rem] w-full p-2 mb-4 border rounded"
        placeholder="Search by ID, title, or date"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {filteredJobs.length === 0 ? (
        <p className="text-lg">{`No jobs found.`}</p>
      ) : (
        <div className="card">
          <DataTable
            value={filteredJobs}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            className="p-datatable-sm"
          >
            <Column field="_id" header="Job Id" body={(data) => `#${data?._id}`}></Column>
            <Column field="title" header="Job Title" sortable></Column>
            <Column field="company" header="Company Name"></Column>
            <Column
              field="description"
              header="Description"
              body={(data) =>
                data.description.length > 50
                  ? `${data.description.substring(0, 50)}...`
                  : data.description
              }
            ></Column>
            <Column
              field="createdAt"
              header="Posted On"
              body={(data) => formatDate(data.createdAt)}
              sortable
              style={{ width: "15%" }}
            ></Column>
            <Column body={(data) => actionBodyTemplate(data)} header="Actions"></Column>
          </DataTable>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <Modal isOpen={isModalOpen}>
        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
        <p>Are you sure you want to delete this job?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleCancelDelete}
            className="p-button p-button-text p-button-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="p-button p-button-text p-button-danger"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserJobs;
