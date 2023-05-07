const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not logged in! Please log in."
            });
        }

        // Verify the token. This returns the payload if the signature is valid
        const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
        if (!payload) {
            return res.status(401).json({
                success: false,
                message: "Unable to identify user! Please log in again."
            });
        }

        req.user_email = payload;
        next();
    } catch (err) {
        // If the token is expired, we opt to return a 401 status code instead of a 500
        // and not log the error
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Your session has expired! Please log in again."
            });
        }

        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}

module.exports = auth;