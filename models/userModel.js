const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Username cannot be empty"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Password cannot be empty"],
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;