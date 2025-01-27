exports.jobAlertTemplate = (jobDetails, message) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Alert</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #ff4b5c;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content h2 {
            color: #ff4b5c;
            margin-bottom: 10px;
        }
        .content p {
            margin: 10px 0;
            line-height: 1.6;
        }
        .content ul {
            padding-left: 20px;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666666;
        }
        .btn {
            display: inline-block;
            background-color: #ff4b5c;
            color: #ffffff;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Job Opportunity Alert</h1>
        </div>
        <div class="content">
            <h2>${jobDetails.title}</h2>
            <p><strong>Company Name:</strong> ${jobDetails.company}</p>
            <p><strong>Posted Date:</strong> ${jobDetails.postedDate}</p>
            <p><strong>Location:</strong> ${jobDetails.location}</p>
            <p><strong>Salary:</strong> ₹${jobDetails.salary.from} - ₹${jobDetails.salary.to}</p>
            <p><strong>Job Type:</strong> ${jobDetails.jobType}</p>
            <p><strong>Duration:</strong> ${jobDetails.duration} months</p>
            <hr />
            <h3>About the Job</h3>
            <p>${jobDetails.aboutJob.description}</p>
            <h3>Responsibilities</h3>
            <ul>
                ${jobDetails.aboutJob.responsibility
                  .map((responsibility) => `<li>${responsibility}</li>`)
                  .join("")}
            </ul>
            <h3>Required Skills</h3>
            <ul>
                ${jobDetails.skills
                  .map((skill) => `<li>${skill}</li>`)
                  .join("")}
            </ul>
            <h3>Additional Information</h3>
            <p>${jobDetails.additionalInformation}</p>
            <hr />
            <p>${message}</p>
            <a href="#" class="btn">Apply Now</a>
        </div>
        <div class="footer">
            <p>You are receiving this email because you opted in for job alerts.</p>
            <p>If you no longer wish to receive these emails, please unsubscribe.</p>
        </div>
    </div>
</body>
</html>
`;
