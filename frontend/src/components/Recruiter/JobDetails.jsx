export default function JobDetails() {
    return (
        <div className="flex flex-1 h-full flex-col p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Senior Product Designer</h1>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Share & Promote</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Published</button>
            </div>
          </div>
    
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Job Details</h2>
              <p className="mb-2"><strong>Job Title:</strong> Senior Product Designer</p>
              <p className="mb-2">
                <strong>Job Description:</strong> We are looking for a UI/UX designer with a special place in his
                heart for designing beautiful, responsive applications.
              </p>
              <p className="mb-2">
                <strong>Responsibilities:</strong> Collaborate with managers, execute design stages, and produce high-
                fidelity designs.
              </p>
            </div>
    
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Job Info</h2>
              <p className="mb-2"><strong>Created On:</strong> March 1, 2021</p>
              <p className="mb-2"><strong>Salary:</strong> $10,000</p>
              <p className="mb-2"><strong>Location:</strong> California, USA</p>
              <label className="flex items-center space-x-2 mt-4">
                <input type="checkbox" className="form-checkbox" />
                <span>Allow employees to apply</span>
              </label>
            </div>
          </div>
        </div>
      );
}
