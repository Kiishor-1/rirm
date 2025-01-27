const { thankYouEmailTemplate } = require("../mail/templates/thankYouEmailTemplate");
const Job = require("../models/Job");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");


exports.applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found.", success: false });
    }

    const user = await User.findById(userId);
    if (user.applications.some(application => application.job.toString() === jobId)) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    job.applicants.push(userId);
    await job.save();

    user.applications.push({ job: jobId });
    await user.save();

    const emailHtml = thankYouEmailTemplate(user, job);

    await mailSender(user.email, `Thank You for Applying to ${job.title}`, emailHtml);

    res.status(200).json({ message: "Successfully applied for the job and email sent.", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later.", success: false });
  }
};

exports.cancelApplication = async (req, res) => {
  try {
      const { jobId } = req.params;
      const userId = req.user.id;

      const job = await Job.findById(jobId);
      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      console.log('job.applicants:', job.applicants);
      console.log('user.applications:', user.applications);

      const applicationIndex = user.applications.findIndex(application => 
        application.job.equals(jobId)
      );

      if (applicationIndex === -1) {
          return res.status(400).json({ message: 'You have not applied for this job' });
      }
      user.applications.splice(applicationIndex, 1);
      await user.save();
      const applicantIndex = job.applicants.findIndex(applicantId => 
        applicantId.equals(userId)
      );
      if (applicantIndex !== -1) {
          job.applicants.splice(applicantIndex, 1);
          job.applicants = [...new Set(job.applicants.map(applicant => applicant.toString()))].map(applicantId => mongoose.Types.ObjectId(applicantId));
          await job.save();
      }

      return res.status(200).json({ message: 'Application canceled successfully' });
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
  }
};


exports.getApplications = async (req, res) => {
  try {
    const userId = req.user.id; 

    const jobs = await Job.find({ author: userId });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this recruiter." });
    }

    let applications = [];
    for (let job of jobs) {
      const applicants = job.applicants || [];
      const applicantDetails = await User.find({ _id: { $in: applicants } }).select('name email');
      applications = [...applications, ...applicantDetails.map(applicant => ({
        jobTitle: job.title,
        jobId:job?._id,
        applicantId: applicant._id,
        applicantName: applicant.name,
        applicantEmail: applicant.email,
      }))];
    }

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

exports.sendEmailUpdate = async (req, res) => {
  try {
    const { applications, subject, message } = req.body;

    if (!applications || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const emailPromises = applications.map((applicantEmail) =>
      mailSender(applicantEmail, subject, message)
    );

    await Promise.all(emailPromises);

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email updates:", error);
    res.status(500).json({ error: "Failed to send email updates." });
  }
};

exports.deleteApplications = async (req, res) => {
  try {
    const { applicantIds, jobId } = req.body;

    if (!applicantIds || applicantIds.length === 0 || !jobId) {
      return res
        .status(400)
        .json({ error: "Job ID and applicant IDs are required." });
    }

    await Job.findByIdAndUpdate(jobId, {
      $pull: { applicants: { $in: applicantIds } },
    });

    res.status(200).json({ message: "Applications deleted successfully!" });
  } catch (error) {
    console.error("Error deleting applications:", error);
    res.status(500).json({ error: "Failed to delete applications." });
  }
};
