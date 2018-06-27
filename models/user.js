import mongoose, { Mongoose } from "mongoose"
import validator from "validator"
import _ from "lodash"
import jwt from "jsonwebtoken"

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

// generate auth token for user
UserSchema.methods.generateAuthToken = function() {
    let user = this
    let access = "auth"
    let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString()

    user.tokens.push({
        access,
        token
    })

    return user.save().then(() => {
        return token
    }).catch((err) => console.log(err))
}

// find user by token
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return Promise.reject()
    }

    return User.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    })
}


let User = mongoose.Model("User", UserSchema)

export default User