const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = db.user;

exports.get_user = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.user.email
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            user: user
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing email and/or password!"
            });
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!"
            });
        }

        // Decrypt the password and compare
        const is_match = await bcrypt.compare(password, user.password);

        if (is_match === false) {
            return res.status(401).json({
                success: false,
                message: "Invalid password!"
            });
        }

        // Create a JWT token
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET || "secret",
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token: token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}

exports.signup = async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing email and/or password"
            });
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);

        await User.create({
            username: username,
            email: email,
            password: password
        });

        // Create a JWT token
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET || "secret",
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Signup successful!",
            token: token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}