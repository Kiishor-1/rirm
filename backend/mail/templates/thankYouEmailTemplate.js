exports.thankYouEmailTemplate = (user, job) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #1A73E8;
            color: white;
            padding: 15px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content h2 {
            color: #1A73E8;
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
            background-color: #1A73E8;
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
            <h1>Thank You for Your Application!</h1>
        </div>
        <div class="content">
            <h2>Dear ${user.name},</h2>
            <p>Thank you for applying to the <strong>${job.title}</strong> position at Rirm! We are excited to have you express interest in joining our team. We have successfully received your application, and our recruitment team will review it shortly.</p>
            <p>At Rirm, we are looking for passionate individuals like yourself who can contribute to our vision. Rest assured that your application will be carefully evaluated, and if we find that your profile matches our current needs, we’ll be in touch for the next steps.</p>
            <p><strong>What’s Next?</strong></p>
            <ul>
                <li>We will review all applications and shortlist candidates who align with the job requirements.</li>
                <li>If you’re shortlisted, you’ll be invited for an interview to discuss your experience, skills, and potential fit.</li>
            </ul>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:careers@rirm.com">careers@rirm.com</a>. Our team is happy to assist you.</p>
            <p>Once again, thank you for considering a career with us. We wish you the best of luck, and we’ll be in touch soon!</p>
            <p>Warm regards,</p>
            <p><strong>The Rirm Team</strong><br>
               Rirm | Empowering Talent | <a href="http://www.rirm.com">www.rirm.com</a></p>
            <hr />
            <p>You received this email because you applied for a position with Rirm. If you no longer wish to receive emails, please unsubscribe <a href="#">here</a>.</p>
        </div>
    </div>
</body>
</html>
`;
