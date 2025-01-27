const Job = require('../models/Job');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { jobAlertTemplate } = require('../mail/templates/sendJobAlert')

exports.getAllJobs = async (req, res) => {
    try {
        const allJobs = await Job.find({});
        res.status(200).json({
            success: true,
            message: "All Jobs",
            allJobs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}


exports.showJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "No job found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Job fetched successfully",
            job,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}
exports.createJob = async (req, res) => {
    const job = req.body;

    try {
        if (!['Beginner', 'Intermediate', 'Expert'].includes(job.experience)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid experience level. Allowed values are Beginner, Intermediate, Expert.',
            });
        }

        const newJob = new Job(job);
        const currUser = req.user;
        newJob.author = currUser._id;

        const savedJob = await newJob.save();
        await User.findByIdAndUpdate(
            currUser._id,
            { $push: { jobs: savedJob._id } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: 'New Job Created',
            data: savedJob,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong',
        });
    }
};

exports.updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    try {
        const existingJob = await Job.findById(id);
        if (!existingJob) {
            return res.status(404).json({
                success: false,
                message: 'No job found',
            });
        }
        if (updatedFields.experience && !['Beginner', 'Intermediate', 'Expert'].includes(updatedFields.experience)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid experience level. Allowed values are Beginner, Intermediate, Expert.',
            });
        }
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
            data: updatedJob,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};



exports.deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const existingJob = await Job.findById(id);
        if (!existingJob) {
            return res.status(404).json({
                success: false,
                message: "No job found",
            })
        }
        const deletedJob = await Job.findByIdAndDelete(id);
        console.log("Deleted Job: ", deletedJob);
        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}


exports.userJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const userJobs = await Job.find({ author: userId });

        res.status(200).json({
            success: true,
            message: "User created jobs fetched successfully",
            userJobs
        });
    } catch (error) {
        console.error("Error fetching user jobs:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user-created jobs"
        });
    }
};

exports.sendAlert = async (req, res) => {
    const { emails, message, jobDetails } = req.body;
    if (!emails || !Array.isArray(emails) || emails.length === 0 || !message || !jobDetails) {
        return res
            .status(400)
            .json({ message: "Emails, message, and job details are required." });
    }

    try {
        for (const email of emails) {
            const emailTemplate = jobAlertTemplate(jobDetails, message);
            await mailSender(email, "Job Alert", emailTemplate);
            console.log(`Job alert sent to ${email}`);
        }

        res.status(200).json({ message: "Job alerts sent to all candidates successfully!" });
    } catch (error) {
        console.error("Error sending job alerts:", error);
        res.status(500).json({ message: "Failed to send job alerts." });
    }
};
