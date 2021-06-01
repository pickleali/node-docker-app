const User = require('../models/userModel')
const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12)
    try {
        const newUser = await User.create({
            username,
            password: encryptedPassword
        });
        req.session.user = newUser;
        res.status(201).json({

            status: 'succes',
            data: {
                user: newUser
            }
        })

    } catch (e) {
        res.status(400).json({
            status: "fail"
        })

    }
};

exports.signIn = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    try {

        const user = await User.findOne({
            username
        })
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Username is not correct!'
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)

        if (isCorrect) {

            // Store user's username and password in the session infos
            // You can store any infos
            req.session.user = user;

            res.status(200).json({
                status: 'succes'
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'incorrect name or password.'
            })
        }
    } catch (e) {
        res.status(400).json({
            status: 'fail'
        })

    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'succes',
            results: users.length,
            data: {
                users,
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
        })

    }
};

exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'succes',
            data: {
                user,
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
        });
    }
};

exports.updateUser = async (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12)
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            // password: encryptedPassword /*FIX THIS*/
        });

        res.status(200).json({
            status: 'succes',
            data: {
                user,
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
        });
    }
};


exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'succes',
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
        });
    }
};