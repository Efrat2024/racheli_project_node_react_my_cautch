const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('All fields are required');
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(401).json('Unauthorized');
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).json('Unauthorized');
    }

    const userInfo = {
        _id: foundUser._id,
        fullname: foundUser.fullname,
        email: foundUser.email,
        phone: foundUser.phone,
        street: foundUser.street,
        zipCode: foundUser.zipCode
    };

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
};

const register = async (req, res) => {
    const { fullname, password, email, phone, street, zipCode } = req.body;
    if (!fullname || !password || !email || !phone || !street || !zipCode) {
        return res.status(400).json('All fields are required');
    }

    try {
        const duplicateUser = await User.findOne({ email }).lean();
        if (duplicateUser) {
            return res.status(409).json('Duplicate email');
        }

        const hashPwd = await bcrypt.hash(password, 10);
        const userObject = { fullname, password: hashPwd, email, phone, street, zipCode };

        const user = await User.create(userObject);

        if (user) {
            return res.status(201).json('New user created: ' + user);
        } else {
            return res.status(400).json('Invalid user received');
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json(err.message);
        } else {
            return res.status(500).json('Server error');
        }
    }
};

module.exports = { login, register };