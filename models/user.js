import mongoose, { Mongoose } from "mongoose"
import validator from "validator"
import _ from "lodash"

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email address."
        }
    },
    password: {
        type: String,
        required: 1,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
})

// parse user object to json
UserSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    return _.pick(userObject, ["_id", "email"]);
}

let User = mongoose.Model("User", UserSchema)

export default User