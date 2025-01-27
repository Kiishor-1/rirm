const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    skills: [
        {
            type: String,
        }
    ],
    salary: {
        from: {
            type: Number,
            required: true,
        },
        to: {
            type: Number,
            required: true,
        }
    },
    experience: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Expert'],
        required: true,
    },
    site: {
        type: String,
        enum: ['Remote', 'Onsite'],
        required: true,
    },
    jobType: {
        type: String,
        enum: ['Full-Time', 'Part-Time'],
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    vacancies: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now(),
    },
    duration: {
        type: Number,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    aboutJob: {
        description: {
            type: String,
            required: true
        },
        responsibility: [
            {
                type: String,
            },
        ]
    },
    additionalInformation: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    applicants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ]
},
    { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
