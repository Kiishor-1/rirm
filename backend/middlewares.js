const jwt = require('jsonwebtoken');
const User = require('./models/User')
const Job = require('./models/Job');
const { jobValidator } = require('./validators');

module.exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports.isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req?.user;
        // console.log(user);
        const job = await Job.findById(id).populate('author');
        if (!job?.author?._id.equals(user._id)) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: You are not the author of job',
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

module.exports.jobValidation = (req, res) => {
    const { error } = jobValidator.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new Error(500, errMsg);
    } else {
        next();
    }

}