const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        minlength: [2, "First name too short"],
        maxlength: [100, "First name too long"],
        validate: {
            validator: value => /^[A-Z].*$/.test(value),
            message: "First name must start with a capital letter"
        }
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [2, "Last name too short"],
        maxlength: [100, "Last name too long"],
        validate: {
            validator: value => /^[A-Z].*$/.test(value),
            message: "Last name must start with a capital letter"
        }
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        validate: {
            validator: value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value),
            message: "Email is illegal"
        }
    },
    idNumber: {
        type: String,
        required: [true, "Missing ID number"],
        minlength: [9, "ID can't be less 9 numbers"],
        maxlength: [9, "ID can't be over 9 characters"],
        validate:{
            validator: value => /^(0|[1-9][0-9]*)$/.test(value),
            message: "Please enter an israeli ID number"
        }
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        validate: {
            validator: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value),
            message: "Password must have minimum six characters, at least one uppercase letter, one lowercase letter and one number"
        }
    },
    city: {
        type: String,
        required: [true, "Missing city"]
    },
    address: {
        type: String,
        required: [true, "Missing city"]
    },
    role: {
        type: String
        }
}, { versionKey: false });

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;